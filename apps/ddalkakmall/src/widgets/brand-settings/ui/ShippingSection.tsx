"use client";

import { Input, Select, Switch } from "@ddalkakmall/ui";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const ShippingSection = () => (
  <SettingsSection id="shipping">
    <SectionHeader title="배송" desc="배송비 정책과 택배사 연동을 설정해요." />
    <Row label="기본 배송비" desc="원 (KRW)">
      <Input type="number" defaultValue="3000" />
    </Row>
    <Row label="무료배송 기준금액" desc="이 금액 이상 구매 시 무료배송. 0이면 항상 유료.">
      <Input type="number" defaultValue="50000" />
    </Row>
    <Row label="도서산간 추가 배송비" desc="제주·도서산간 지역에 부과되는 추가 비용이에요.">
      <Input type="number" defaultValue="5000" />
    </Row>
    <Row label="배송 가능 지역">
      <Select
        value="domestic"
        options={[
          { value: "domestic", label: "국내 전용" },
          { value: "international", label: "국내 + 해외" },
        ]}
      />
    </Row>
    <Row label="기본 택배사">
      <Select
        placeholder="택배사 선택"
        options={[
          { value: "cj", label: "CJ대한통운" },
          { value: "lotte", label: "롯데택배" },
          { value: "hanjin", label: "한진택배" },
          { value: "post", label: "우체국택배" },
        ]}
      />
    </Row>
    <Row label="송장 자동 등록" desc="구매자에게 배송 시작 알림을 자동으로 보내요." inline>
      <Switch size="sm" />
    </Row>
  </SettingsSection>
);
