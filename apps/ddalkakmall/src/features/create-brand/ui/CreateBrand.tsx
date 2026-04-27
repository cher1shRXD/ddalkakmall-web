"use client";

import { motion, AnimatePresence } from "framer-motion";
import BrandNamePhase from "./BrandNamePhase";
import PlanSelectPhase from "./PlanSelectPhase";
import { useCreateBrand } from "../hooks/useCreateBrand";

const fadeSlide = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

const CreateBrand = () => {
  const {
    phase,
    brandName,
    selectedPlan,
    loading,
    error,
    setBrandName,
    setSelectedPlan,
    goNext,
    goPrev,
    handleSubmit,
  } = useCreateBrand();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-10">
      <AnimatePresence mode="wait">
        {phase === "brand" ? (
          <motion.div key="brand" {...fadeSlide}>
            <BrandNamePhase
              value={brandName}
              onChange={setBrandName}
              onNext={goNext}
            />
          </motion.div>
        ) : (
          <motion.div key="plan" {...fadeSlide}>
            <PlanSelectPhase
              brandName={brandName}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
              onPrev={goPrev}
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

export default CreateBrand;
