import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const text = await req.text();
  const params = new URLSearchParams(text);

  const linkval = params.get("linkval");
  const payState = params.get("pay_state");
  const mulNo = params.get("mul_no");
  const orderNo = params.get("var1");
  const brandName = params.get("var2");
  const goodname = params.get("goodname");
  const rebillNo = params.get("rebill_no");

  if (linkval !== process.env.PAYAPP_LINK_VAL) {
    console.error("[payment/feedback] linkval 불일치 - 위조 요청 의심", { mulNo, orderNo });
    return new NextResponse("FAIL", { status: 400 });
  }

  if (payState !== "4") {
    console.warn("[payment/feedback] 미완료 상태", { payState, mulNo, orderNo });
    return new NextResponse("SUCCESS");
  }

  // TODO: DB에 결제 완료 저장 후 브랜드 생성 처리
  console.log("[payment/feedback] 결제 확인됨", { mulNo, orderNo, brandName, goodname, rebillNo });

  return new NextResponse("SUCCESS");
}
