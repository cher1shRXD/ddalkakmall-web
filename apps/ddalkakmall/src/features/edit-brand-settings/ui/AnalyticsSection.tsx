"use client";

import { Input } from "@ddalkakmall/ui";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const AnalyticsSection = () => (
  <SettingsSection id="analytics">
    <SectionHeader title="분석" desc="방문자 및 전환 데이터를 수집하는 분석 도구를 연동해요." />
    <Row label="Google Analytics 4" desc="GA4 측정 ID를 입력하세요.">
      <Input placeholder="G-XXXXXXXXXX" />
    </Row>
    <Row label="Facebook Pixel" desc="Meta 광고 성과를 추적해요.">
      <Input placeholder="000000000000000" />
    </Row>
    <Row label="Naver 검색광고 전환추적">
      <Input placeholder="s_xxxxxxxxxxxxxxxxxx" />
    </Row>
    <Row label="카카오 픽셀">
      <Input placeholder="0000000000000" />
    </Row>
  </SettingsSection>
);
