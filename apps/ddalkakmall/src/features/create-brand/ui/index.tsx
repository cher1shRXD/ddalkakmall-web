"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandNamePhase from "./BrandNamePhase";
import PlanSelectPhase from "./PlanSelectPhase";
import { initiatePayment } from "../actions/initiate-payment";
import { Phase } from "../types/phase";
import { Plan } from "../types/plan";

const fadeSlide = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

const CreateBrandFlow = () => {
  const [phase, setPhase] = useState<Phase>("brand");
  const [brandName, setBrandName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedPlan) return;

    if (selectedPlan === "free") {
      // TODO: DB 연동 후 브랜드 생성 처리
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payUrl = await initiatePayment(selectedPlan, brandName);
      window.location.href = payUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "결제 요청에 실패했어요.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-10">
      <AnimatePresence mode="wait">
        {phase === "brand" ? (
          <motion.div key="brand" {...fadeSlide}>
            <BrandNamePhase
              value={brandName}
              onChange={setBrandName}
              onNext={() => setPhase("plan")}
            />
          </motion.div>
        ) : (
          <motion.div key="plan" {...fadeSlide}>
            <PlanSelectPhase
              brandName={brandName}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
              onPrev={() => setPhase("brand")}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateBrandFlow;
