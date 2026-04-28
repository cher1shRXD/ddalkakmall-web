"use client";

import { FilePicker, Input, Select, Textarea } from "@ddalkakmall/ui";
import { BrandDetail } from "@/entities/brand/types";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const BasicSection = ({ brand }: { brand: BrandDetail }) => (
  <SettingsSection id="basic">
    <SectionHeader title="기본 정보" desc="쇼핑몰 이름, 설명, 언어 등 기본 설정을 관리해요." />
    <Row label="쇼핑몰명" desc="고객에게 노출되는 쇼핑몰 이름이에요.">
      <Input defaultValue={brand.name} />
    </Row>
    <Row label="쇼핑몰 소개" desc="쇼핑몰을 한 줄로 설명해주세요.">
      <Textarea placeholder="예: 감각적인 라이프스타일 브랜드" rows={2} />
    </Row>
    <Row label="로고" desc="권장 크기: 200×60px, PNG/SVG">
      <FilePicker accept="image/*" />
    </Row>
    <Row label="파비콘" desc="브라우저 탭에 표시되는 아이콘이에요. 32×32px">
      <FilePicker accept="image/*" />
    </Row>
    <Row label="언어">
      <Select
        value="ko-KR"
        options={[
          { value: "ko-KR", label: "한국어 (ko-KR)" },
          { value: "en-US", label: "English (en-US)" },
          { value: "ja-JP", label: "日本語 (ja-JP)" },
        ]}
      />
    </Row>
    <Row label="통화">
      <Select
        value="KRW"
        options={[
          { value: "KRW", label: "₩ 원 (KRW)" },
          { value: "USD", label: "$ 달러 (USD)" },
          { value: "JPY", label: "¥ 엔 (JPY)" },
        ]}
      />
    </Row>
    <Row label="시간대">
      <Select
        value="Asia/Seoul"
        options={[
          { value: "Asia/Seoul", label: "서울 (UTC+9)" },
          { value: "America/New_York", label: "뉴욕 (UTC-5)" },
          { value: "Europe/London", label: "런던 (UTC+0)" },
        ]}
      />
    </Row>
  </SettingsSection>
);
