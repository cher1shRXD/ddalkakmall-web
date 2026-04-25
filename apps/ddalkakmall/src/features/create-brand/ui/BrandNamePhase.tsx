"use client";

import { Button, Input } from "@ddalkakmall/ui";
import { ArrowRight } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  onNext: () => void;
}

const BrandNamePhase = ({ value, onChange, phone, onPhoneChange, onNext }: Props) => {
  const canProceed = value.trim() && phone.trim();

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
          placeholder="예: 마이 브랜드"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
        <Input
          size="lg"
          placeholder="대표 전화번호 (예: 01012345678)"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canProceed) onNext();
          }}
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
