"use client";

import { Button, modal } from "@ddalkakmall/ui";
import PlanCard from "@/features/create-brand/ui/PlanCard";
import { plans } from "@/features/create-brand/constants/plans";
import { BrandDetail } from "@/entities/brand/types";
import { useChangePlan } from "../hooks/useChangePlan";

interface Props {
  brand: BrandDetail;
}

export const ChangePlanModal = ({ brand }: Props) => {
  const { currentPlan, selected, setSelected, loading, error, isSame, handleConfirm } = useChangePlan(brand);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
            {plan.id === currentPlan && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 text-[10px] font-semibold text-foreground-inverse bg-foreground rounded-full px-2 py-0.5 whitespace-nowrap">
                현재 플랜
              </span>
            )}
            <PlanCard
              plan={plan}
              selected={selected === plan.id}
              onSelect={setSelected}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={() => modal.closeAll()} disabled={loading}>
          취소
        </Button>
        <Button disabled={isSame} loading={loading} onClick={handleConfirm}>
          {selected === "free" ? "무료 플랜으로 변경" : "결제하고 변경하기"}
        </Button>
      </div>
    </div>
  );
};
