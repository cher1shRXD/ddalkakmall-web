"use client";

import { Input } from "@ddalkakmall/ui";
import { BrandDetail } from "@/entities/brand/types";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const DomainSection = ({ brand }: { brand: BrandDetail }) => (
  <SettingsSection id="domain">
    <SectionHeader title="도메인" desc="쇼핑몰 주소를 설정해요. HTTPS는 자동으로 발급돼요." />
    <Row label="서브도메인" desc="ddalkakmall.com 앞에 붙는 주소예요.">
      <Input
        defaultValue={brand.name.toLowerCase().replace(/\s+/g, "-")}
        suffix={<span className="text-xs text-foreground-dim whitespace-nowrap">.ddalkakmall.com</span>}
      />
    </Row>
    <Row label="커스텀 도메인" desc="보유한 도메인의 DNS CNAME을 shops.ddalkakmall.com으로 설정하세요.">
      <Input placeholder="shop.mybrand.com" />
    </Row>
    <Row label="SSL 인증서" desc="Let's Encrypt로 자동 발급·갱신돼요.">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-success shrink-0" />
        <span className="text-sm text-foreground">활성 (자동 갱신)</span>
      </div>
    </Row>
  </SettingsSection>
);
