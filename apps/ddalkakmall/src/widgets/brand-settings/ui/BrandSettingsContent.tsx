"use client";

import { Divider } from "@ddalkakmall/ui";
import { BrandDetail } from "@/entities/brand/types";
import { useSettingsScroll } from "../hooks/useSettingsScroll";
import { AnalyticsSection } from "./AnalyticsSection";
import { BasicSection } from "./BasicSection";
import { BrandSettingsNav } from "./BrandSettingsNav";
import { DomainSection } from "./DomainSection";
import { LegalSection } from "./LegalSection";
import { NotificationSection } from "./NotificationSection";
import { PaymentSection } from "./PaymentSection";
import { PlanSection } from "./PlanSection";
import { SeoSection } from "./SeoSection";
import { ShippingSection } from "./ShippingSection";

export const BrandSettingsContent = ({ brand }: { brand: BrandDetail }) => {
  const { scrollRef, activeId, scrollTo } = useSettingsScroll();

  return (
    <aside className="w-200 border-l border-border shrink-0 h-screen flex">
      <div ref={scrollRef} className="flex-1 overflow-y-auto h-full">
        <div className="px-7 py-7 flex flex-col gap-14">
          <BasicSection brand={brand} />
          <Divider />
          <LegalSection />
          <Divider />
          <PaymentSection />
          <Divider />
          <ShippingSection />
          <Divider />
          <DomainSection brand={brand} />
          <Divider />
          <PlanSection brand={brand} />
          <Divider />
          <SeoSection brand={brand} />
          <Divider />
          <AnalyticsSection />
          <Divider />
          <NotificationSection />
        </div>
      </div>
      <BrandSettingsNav activeId={activeId} onSelect={scrollTo} />
    </aside>
  );
};
