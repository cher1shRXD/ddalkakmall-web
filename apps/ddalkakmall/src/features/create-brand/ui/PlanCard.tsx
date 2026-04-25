"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PlanConfig, Plan } from "../model/types";

interface Props {
  plan: PlanConfig;
  selected: boolean;
  onSelect: (id: Plan) => void;
}

const PlanCard = ({ plan, selected, onSelect }: Props) => {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(plan.id)}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className={[
        "relative flex flex-col items-start gap-1.5 p-5 rounded-2xl border cursor-pointer text-left w-full transition-colors",
        plan.highlighted && !selected
          ? "bg-primary/5 border-primary"
          : selected
            ? "bg-primary/5 border-primary"
            : "bg-surface-2 border-border",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {plan.highlighted && (
        <span className="absolute top-3 right-3 text-xs font-semibold text-primary border border-primary rounded-full px-2 py-0.5">
          추천
        </span>
      )}

      <span className="text-xl font-bold text-foreground">{plan.name}</span>
      <span className="text-sm font-semibold text-primary">{plan.price}</span>
      <span className="text-sm text-foreground-sub leading-relaxed mb-1">
        {plan.description}
      </span>

      <ul className="flex flex-col gap-1.5 w-full mt-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-1.5 text-sm text-foreground-sub">
            <Check size={13} className="text-primary shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {selected && (
        <motion.span
          className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-primary text-foreground-inverse flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Check size={11} />
        </motion.span>
      )}
    </motion.button>
  );
};

export default PlanCard;
