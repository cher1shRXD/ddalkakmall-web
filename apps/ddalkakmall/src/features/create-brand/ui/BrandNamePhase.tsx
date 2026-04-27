"use client";

import { Button, Input } from "@ddalkakmall/ui";
import { ArrowRight } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const BrandNamePhase = ({ value, onChange, onNext }: Props) => {
  const canProceed = value.trim();

  return (
    <div className="w-full max-w-md lg:min-w-sm flex flex-col items-start gap-6">
      <p className="text-sm text-foreground-dim font-medium">1 / 2</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          브랜드 이름을 정해주세요
        </h1>
        <p className="text-lg text-foreground-sub">나중에 언제든지 변경할 수 있어요.</p>
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        <Input
          size="lg"
          placeholder="예: 딸깍몰"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </div>
      <Button
        size="md"
        fullWidth
        disabled={!canProceed}
        rightIcon={<ArrowRight size={16} />}
        onClick={onNext}
      >
        다음
      </Button>
    </div>
  );
};

export default BrandNamePhase;
