"use client";

import { modal } from "@ddalkakmall/ui";
import { BrandDetail } from "@/entities/brand/types";
import { ChangePlanModal } from "@/features/change-plan/ui/ChangePlanModal";
import { getCurrentPlan } from "@/features/change-plan/utils/get-current-plan";
import { PLAN_LABEL, STATUS_COLOR, STATUS_LABEL } from "../constants/plan";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const PlanSection = ({ brand }: { brand: BrandDetail }) => {
  const sub = brand.subscription;
  const currentPlan = getCurrentPlan(brand);

  const openModal = () => modal.open(<ChangePlanModal brand={brand} />, { title: "플랜 변경", size: "lg" });

  return (
    <SettingsSection id="plan">
      <SectionHeader title="구독 플랜" desc="현재 사용 중인 플랜과 결제 현황이에요." />
      <Row label="현재 플랜">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{PLAN_LABEL[currentPlan]}</p>
            {sub && (
              <p className={`text-xs mt-0.5 ${STATUS_COLOR[sub.status]}`}>
                {STATUS_LABEL[sub.status]}
              </p>
            )}
          </div>
          <button
            onClick={openModal}
            className="text-xs font-medium text-primary hover:underline underline-offset-2 cursor-pointer"
          >
            변경
          </button>
        </div>
      </Row>
      {sub?.nextBillAt && (
        <Row label="다음 결제일">
          <p className="text-sm text-foreground">
            {new Date(sub.nextBillAt).toLocaleDateString("ko-KR")}
          </p>
        </Row>
      )}
      {sub?.billingDay && (
        <Row label="결제 주기" desc="매월 해당 일에 자동 결제돼요.">
          <p className="text-sm text-foreground">매월 {sub.billingDay}일</p>
        </Row>
      )}
    </SettingsSection>
  );
};
