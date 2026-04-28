"use client";

import { Input, Switch, Textarea } from "@ddalkakmall/ui";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const LegalSection = () => (
  <SettingsSection id="legal">
    <SectionHeader title="법적 정보" desc="전자상거래법·정보통신망법에 따라 푸터에 반드시 표시해야 하는 항목이에요." />
    <Row label="사업자등록번호" desc="예: 123-45-67890">
      <Input placeholder="000-00-00000" />
    </Row>
    <Row label="통신판매업신고번호" desc="예: 2024-서울강남-0000">
      <Input placeholder="0000-시도구청-0000" />
    </Row>
    <Row label="대표자명">
      <Input placeholder="홍길동" />
    </Row>
    <Row label="사업장 소재지">
      <Textarea placeholder="서울특별시 강남구 테헤란로 00길 00" rows={2} />
    </Row>
    <Row label="고객센터 전화번호">
      <Input placeholder="02-000-0000" type="tel" />
    </Row>
    <Row label="고객센터 이메일">
      <Input placeholder="cs@mybrand.com" type="email" />
    </Row>
    <Row label="고객센터 운영시간" desc="예: 평일 10:00~18:00 (점심 12~13시 제외)">
      <Input placeholder="평일 10:00 ~ 18:00" />
    </Row>
    <Row label="이용약관">
      <Textarea placeholder="이용약관 전문을 입력하거나 URL을 붙여넣으세요." rows={4} />
    </Row>
    <Row label="개인정보처리방침">
      <Textarea placeholder="개인정보처리방침 전문을 입력하거나 URL을 붙여넣으세요." rows={4} />
    </Row>
    <Row label="반품·교환 정책">
      <Textarea placeholder="반품·교환 조건 및 절차를 입력해주세요." rows={3} />
    </Row>
    <Row label="구매안전서비스 (에스크로)" desc="전자금융거래법에 따라 에스크로 또는 소비자피해보상보험 가입이 필요해요." inline>
      <Switch size="sm" />
    </Row>
  </SettingsSection>
);
