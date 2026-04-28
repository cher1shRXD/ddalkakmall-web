"use client";

import { Input, Switch } from "@ddalkakmall/ui";
import { NOTIFICATION_ROWS } from "../constants/notification";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const NotificationSection = () => (
  <SettingsSection id="notification">
    <SectionHeader title="알림" desc="이메일·SMS 알림 발송 설정이에요." />
    <Row label="발송 이메일 주소" desc="알림 메일의 발신자 주소로 표시돼요.">
      <Input placeholder="noreply@mybrand.com" type="email" />
    </Row>
    <Row label="SMTP 서버" desc="직접 SMTP를 설정하거나 기본 발송 서비스를 사용해요.">
      <Input placeholder="smtp.gmail.com" />
    </Row>
    {NOTIFICATION_ROWS.map(({ label, desc }) => (
      <Row key={label} label={label} desc={desc} inline>
        <Switch size="sm" checked />
      </Row>
    ))}
  </SettingsSection>
);
