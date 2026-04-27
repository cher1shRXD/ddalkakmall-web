const isServer = typeof window === "undefined";

const REFRESH_URL = "/auth/refresh";

// ─── Cookie Helpers ───────────────────────────────────────────────────────────

async function getForwardedCookies(): Promise<string> {
  const { cookies } = await import("next/headers");
  const store = await cookies();
  return store.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
}

function parseSetCookies(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  for (const raw of headers.getSetCookie?.() ?? []) {
    const [nameValue] = raw.split(";");
    const eqIdx = nameValue.indexOf("=");
    result[nameValue.slice(0, eqIdx).trim()] = nameValue.slice(eqIdx + 1).trim();
  }
  return result;
}

async function persistSetCookies(headers: Headers): Promise<void> {
  try {
    const { cookies } = await import("next/headers");
    const store = await cookies();

    for (const raw of headers.getSetCookie?.() ?? []) {
      const [nameValue, ...attrs] = raw.split(";").map((s) => s.trim());
      const eqIdx = nameValue.indexOf("=");
      const options: {
        name: string; value: string;
        httpOnly?: boolean; secure?: boolean; path?: string;
        maxAge?: number; expires?: Date; sameSite?: "strict" | "lax" | "none";
      } = {
        name: nameValue.slice(0, eqIdx),
        value: nameValue.slice(eqIdx + 1),
      };

      for (const attr of attrs) {
        const lower = attr.toLowerCase();
        if (lower === "httponly") options.httpOnly = true;
        else if (lower === "secure") options.secure = true;
        else if (lower.startsWith("path=")) options.path = attr.slice(5);
        else if (lower.startsWith("max-age=")) options.maxAge = Number(attr.slice(8));
        else if (lower.startsWith("expires=")) options.expires = new Date(attr.slice(8));
        else if (lower.startsWith("samesite=")) {
          const v = attr.slice(9).toLowerCase();
          if (v === "strict" || v === "lax" || v === "none") options.sameSite = v;
        }
      }

      store.set(options);
    }
  } catch {}
}

async function buildCookieHeader(override?: Record<string, string>): Promise<string> {
  const existing = await getForwardedCookies();
  if (!override || Object.keys(override).length === 0) return existing;

  const map = new Map(
    existing.split("; ").filter(Boolean).map((c) => {
      const idx = c.indexOf("=");
      return [c.slice(0, idx), c.slice(idx + 1)] as [string, string];
    })
  );
  for (const [k, v] of Object.entries(override)) map.set(k, v);
  return Array.from(map.entries()).map(([k, v]) => `${k}=${v}`).join("; ");
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

async function refresh(): Promise<Record<string, string> | null> {
  try {
    const url = resolveUrl(REFRESH_URL);
    const headers = new Headers();

    if (isServer) {
      const cookie = await buildCookieHeader();
      if (cookie) headers.set("Cookie", cookie);
    }

    const res = await fetch(url, { method: "POST", headers });
    if (!res.ok) return null;

    if (isServer) await persistSetCookies(res.headers);
    return parseSetCookies(res.headers);
  } catch {
    return null;
  }
}

// ─── URL ──────────────────────────────────────────────────────────────────────

function resolveUrl(url: string): string {
  if (isServer && url.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  }
  return url;
}

// ─── Error ────────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`${status} ${statusText}`);
    this.name = "ApiError";
  }
}

// ─── Response Parser ──────────────────────────────────────────────────────────

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, await res.text());
  }
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return res.json() as Promise<T>;
  return res.text() as unknown as Promise<T>;
}

// ─── Request Builder ──────────────────────────────────────────────────────────

type NextFetchInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class RequestBuilder<T = unknown> implements PromiseLike<T> {
  private _fetchInit: NextFetchInit = {};
  private _useCookie = false;

  constructor(
    private readonly _method: HttpMethod,
    private readonly _url: string,
    private readonly _body?: unknown,
  ) {}

  /** httpOnly 쿠키 포워딩 + 만료 시 자동 재발급 */
  withCookie(): this {
    this._useCookie = true;
    return this;
  }

  /** Next.js ISR — N초마다 재검증 */
  withISR(revalidate: number): this {
    this._fetchInit.next = { ...this._fetchInit.next, revalidate };
    return this;
  }

  /** Next.js SSG — 빌드 시 캐시, 영구 유지 */
  withSSG(): this {
    this._fetchInit.cache = "force-cache";
    return this;
  }

  /** Next.js On-demand revalidation 태그 */
  withTags(tags: string[]): this {
    this._fetchInit.next = { ...this._fetchInit.next, tags };
    return this;
  }

  private async buildInit(overrideCookies?: Record<string, string>): Promise<NextFetchInit> {
    const headers = new Headers(this._fetchInit.headers);

    if (this._body !== undefined) {
      headers.set("Content-Type", "application/json");
    }

    if (this._useCookie) {
      if (isServer) {
        const cookie = await buildCookieHeader(overrideCookies);
        if (cookie) headers.set("Cookie", cookie);
      } else {
        // 브라우저: 쿠키 자동 전송
      }
    }

    return {
      ...this._fetchInit,
      method: this._method,
      headers,
      ...(this._body !== undefined && { body: JSON.stringify(this._body) }),
      ...(this._useCookie && !isServer && { credentials: "include" }),
    };
  }

  async execute(): Promise<T> {
    const url = resolveUrl(this._url);
    const init = await this.buildInit();
    const response = await fetch(url, init);

    if (response.status === 401 && this._useCookie) {
      const newCookies = await refresh();
      if (newCookies) {
        const retryInit = await this.buildInit(newCookies);
        return parseResponse<T>(await fetch(url, retryInit));
      }
    }

    return parseResponse<T>(response);
  }

  then<R1 = T, R2 = never>(
    onfulfilled?: ((value: T) => R1 | PromiseLike<R1>) | null,
    onrejected?: ((reason: unknown) => R2 | PromiseLike<R2>) | null,
  ): Promise<R1 | R2> {
    return this.execute().then(onfulfilled, onrejected);
  }

  catch<R = never>(
    onrejected?: ((reason: unknown) => R | PromiseLike<R>) | null,
  ): Promise<T | R> {
    return this.execute().catch(onrejected);
  }

  finally(onfinally?: (() => void) | null): Promise<T> {
    return this.execute().finally(onfinally);
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const apiClient = {
  get:    <T = unknown>(url: string)                  => new RequestBuilder<T>("GET",    url),
  post:   <T = unknown>(url: string, body?: unknown)  => new RequestBuilder<T>("POST",   url, body),
  put:    <T = unknown>(url: string, body?: unknown)  => new RequestBuilder<T>("PUT",    url, body),
  patch:  <T = unknown>(url: string, body?: unknown)  => new RequestBuilder<T>("PATCH",  url, body),
  delete: <T = unknown>(url: string)                  => new RequestBuilder<T>("DELETE", url),
};
