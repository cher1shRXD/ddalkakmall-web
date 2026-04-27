"use client";

import { useState } from "react";
import { createBrand } from "../actions/create-brand";
import { initiatePayment } from "../actions/initiate-payment";
import { Phase } from "../types/phase";
import { Plan } from "../types/plan";

export const useCreateBrand = () => {
  const [phase, setPhase] = useState<Phase>("brand");
  const [brandName, setBrandName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    setError(null);
    try {
      const brand = await createBrand(brandName);

      if (selectedPlan === "free") {
        window.location.href = `/brands/${brand.id}`;
        return;
      }

      const payUrl = await initiatePayment(selectedPlan, brand.id, brandName);
      window.location.href = payUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "브랜드 생성에 실패했어요.");
      setLoading(false);
    }
  };

  return {
    phase,
    brandName,
    selectedPlan,
    loading,
    error,
    setBrandName,
    setSelectedPlan,
    goNext: () => setPhase("plan"),
    goPrev: () => setPhase("brand"),
    handleSubmit,
  };
};
