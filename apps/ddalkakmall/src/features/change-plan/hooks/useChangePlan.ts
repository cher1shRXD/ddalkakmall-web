"use client";

import { useState } from "react";
import { modal } from "@ddalkakmall/ui";
import { BrandDetail } from "@/entities/brand/types";
import { Plan } from "@/features/create-brand/types/plan";
import { initiatePlanChange, cancelSubscription } from "../actions/initiate-plan-change";
import { getCurrentPlan } from "../utils/get-current-plan";

export const useChangePlan = (brand: BrandDetail) => {
  const currentPlan = getCurrentPlan(brand);
  const [selected, setSelected] = useState<Plan>(currentPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSame = selected === currentPlan;

  const handleConfirm = async () => {
    if (isSame) return;
    setLoading(true);
    setError(null);
    try {
      if (selected === "free") {
        await cancelSubscription(brand.id);
        modal.closeAll();
        window.location.reload();
      } else {
        const payUrl = await initiatePlanChange(selected, brand.id, brand.name);
        window.location.href = payUrl;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했어요.");
      setLoading(false);
    }
  };

  return { currentPlan, selected, setSelected, loading, error, isSame, handleConfirm };
};
