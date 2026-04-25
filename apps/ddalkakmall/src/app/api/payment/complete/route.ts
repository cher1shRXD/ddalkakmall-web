import { NextRequest, NextResponse } from "next/server";

const completeRedirect = (params: URLSearchParams) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  return NextResponse.redirect(`${baseUrl}/create/complete?${params.toString()}`, 303);
};

export async function POST(req: NextRequest) {
  const text = await req.text();
  const params = new URLSearchParams(text);
  return completeRedirect(params);
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  return completeRedirect(params);
}
