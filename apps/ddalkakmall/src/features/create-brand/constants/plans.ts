import { PlanConfig } from "../types/plan-config";

export const plans: PlanConfig[] = [
  {
    id: "free",
    name: "Free",
    price: "무료",
    description: "작은 브랜드를 시작하기에 딱 좋아요.",
    features: ["쇼핑몰 1개", "상품 최대 20개", "기본 AI 생성", "딸깍몰 도메인"],
    highlighted: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: "₩29,000/월",
    description: "성장하는 브랜드에 필요한 모든 것.",
    features: ["쇼핑몰 3개", "상품 무제한", "고급 AI 생성", "커스텀 도메인", "분석 대시보드"],
    highlighted: true,
  },
  {
    id: "plus",
    name: "Basic",
    price: "₩79,000/월",
    description: "엔터프라이즈급 기능을 모두 사용할 수 있어요.",
    features: ["쇼핑몰 무제한", "상품 무제한", "최우선 AI 생성", "커스텀 도메인", "고급 분석", "전담 지원"],
    highlighted: false,
  },
];
