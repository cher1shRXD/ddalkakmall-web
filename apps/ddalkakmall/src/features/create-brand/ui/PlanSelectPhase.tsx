"use client";

import { Button } from "@ddalkakmall/ui";
import { ArrowRight } from "lucide-react";
import { plans } from "../constants/plans";
import PlanCard from "./PlanCard";
import { Plan } from "../types/plan";

interface Props {
  brandName: string;
  selected: Plan | null;
  onSelect: (plan: Plan) => void;
  onPrev: () => void;
  onSubmit: () => void;
  loading?: boolean;
  error?: string | null;
}

const PlanSelectPhase = ({ brandName, selected, onSelect, onPrev, onSubmit, loading, error }: Props) => {
  return (
    <div className="w-full max-w-3xl flex flex-col items-start gap-6">
      <p className="text-sm text-foreground-dim font-medium">2 / 2</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          플랜을 선택해주세요
        </h1>
        <p className="text-lg text-foreground-sub">
          <span className="text-foreground font-semibold">{brandName}</span>에 맞는 플랜을 골라봐요.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full mt-2">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
      <div className="flex gap-2.5 w-full">
        <Button size="lg" variant="secondary" onClick={onPrev} disabled={loading}>
          이전
        </Button>
        <Button
          size="lg"
          fullWidth
          disabled={!selected}
          loading={loading}
          rightIcon={!loading ? <ArrowRight size={16} /> : undefined}
          onClick={onSubmit}
        >
          {selected === "free" ? "쇼핑몰 만들기" : "결제하고 시작하기"}
        </Button>
      </div>
    </div>
  );
};

export default PlanSelectPhase;
