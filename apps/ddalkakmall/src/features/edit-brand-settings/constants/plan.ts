export const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  basic: "Basic",
  plus: "Plus",
};

export const STATUS_LABEL: Record<string, string> = {
  pending: "결제 대기",
  active: "구독 중",
  failed: "결제 실패",
  cancelled: "해지됨",
};

export const STATUS_COLOR: Record<string, string> = {
  pending: "text-warning",
  active: "text-success",
  failed: "text-danger",
  cancelled: "text-foreground-dim",
};
