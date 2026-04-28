"use client";

import { Input } from "@ddalkakmall/ui";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const PaymentSection = () => (
  <SettingsSection id="payment">
    <SectionHeader title="결제" desc="토스페이먼츠 SDK 연동 키를 설정해요. 시크릿 키는 서버에 안전하게 보관돼요." />
    <Row label="클라이언트 키" desc="프론트엔드 SDK 초기화에 사용돼요.">
      <Input placeholder="test_ck_xxxxxxxxxx" />
    </Row>
    <Row label="시크릿 키" desc="서버에만 저장되며 외부에 노출되지 않아요.">
      <Input type="password" placeholder="test_sk_xxxxxxxxxx" />
    </Row>
  </SettingsSection>
);
