"use server";

import { UserApi } from "@/entities/user/api";
import { Plan } from "@/features/create-brand/types/plan";

const PLAN_PRICES: Record<Exclude<Plan, "free">, number> = {
  basic: 29000,
  plus: 79000,
};

const PLAN_NAMES: Record<Exclude<Plan, "free">, string> = {
  basic: "딸깍몰 Basic 플랜",
  plus: "딸깍몰 Plus 플랜",
};

export async function initiatePlanChange(
  plan: Exclude<Plan, "free">,
  brandId: string,
  brandName: string,
) {
  const user = await UserApi.getMe();
  if (!user.phone) throw new Error("전화번호를 등록해주세요.");

  const orderNo = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const billingDay = new Date().getDate();
  const expireYear = new Date().getFullYear() + 10;

  const params = new URLSearchParams({
    cmd: "rebillRegist",
    userid: process.env.PAYAPP_MERCHANT_ID!,
    linkkey: process.env.PAYAPP_LINK_KEY!,
    goodname: PLAN_NAMES[plan],
    goodprice: String(PLAN_PRICES[plan]),
    recvphone: user.phone,
    rebillCycleType: "Month",
    rebillCycleMonth: String(billingDay),
    rebillExpire: `${expireYear}-12-31`,
    var1: orderNo,
    var2: brandName,
    var3: brandId,
    feedbackurl: `${baseUrl}/api/payment/feedback`,
    returnurl: `${baseUrl}/api/payment/plan-change`,
    cancelurl: `${baseUrl}/brands/${brandId}`,
  });

  const res = await fetch("https://api.payapp.kr/oapi/apiLoad.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const text = await res.text();
  const result = Object.fromEntries(new URLSearchParams(text));

  if (result.state !== "1") {
    throw new Error(result.errorMessage ?? "결제 요청에 실패했어요.");
  }

  return result.payurl as string;
}

export async function cancelSubscription(brandId: string) {
  const { apiClient } = await import("@/shared/libs/api-client");
  await apiClient.delete(`/brands/${brandId}/subscription`).withCookie();
}
