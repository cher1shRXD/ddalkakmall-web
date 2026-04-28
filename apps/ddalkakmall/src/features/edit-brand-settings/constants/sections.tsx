import {
  BarChart2,
  Bell,
  CreditCard,
  Globe,
  Info,
  Package,
  Shield,
  Truck,
} from "lucide-react";

export const SECTIONS = [
  { id: "basic", label: "기본 정보", icon: <Info size={13} /> },
  { id: "legal", label: "법적 정보", icon: <Shield size={13} /> },
  { id: "payment", label: "결제", icon: <CreditCard size={13} /> },
  { id: "shipping", label: "배송", icon: <Truck size={13} /> },
  { id: "domain", label: "도메인", icon: <Globe size={13} /> },
  { id: "plan", label: "구독 플랜", icon: <CreditCard size={13} /> },
  { id: "seo", label: "SEO", icon: <Package size={13} /> },
  { id: "analytics", label: "분석", icon: <BarChart2 size={13} /> },
  { id: "notification", label: "알림", icon: <Bell size={13} /> },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
