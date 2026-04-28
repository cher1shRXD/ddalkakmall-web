import { NextRequest, NextResponse } from "next/server";

const redirect = (brandId: string, success: boolean) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const url = new URL(`/brands/${brandId}`, baseUrl);
  if (success) url.searchParams.set("plan_changed", "1");
  return NextResponse.redirect(url.toString(), 303);
};

export async function POST(req: NextRequest) {
  const params = new URLSearchParams(await req.text());
  const brandId = params.get("var3") ?? "";
  return redirect(brandId, params.get("pay_state") === "4");
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const brandId = params.get("var3") ?? "";
  return redirect(brandId, params.get("pay_state") === "4");
}
