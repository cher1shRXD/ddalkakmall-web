import { BrandDetail } from "@/entities/brand/types";
import { Plan } from "@/features/create-brand/types/plan";

export const getCurrentPlan = (brand: BrandDetail): Plan =>
  brand.subscription?.plan ?? "free";
