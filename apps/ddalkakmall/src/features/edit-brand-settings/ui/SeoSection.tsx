"use client";

import { FilePicker, Input, Textarea } from "@ddalkakmall/ui";
import { BrandDetail } from "@/entities/brand/types";
import { Row } from "./Row";
import { SectionHeader } from "./SectionHeader";
import { SettingsSection } from "./SettingsSection";

export const SeoSection = ({ brand }: { brand: BrandDetail }) => (
  <SettingsSection id="seo">
    <SectionHeader title="SEO" desc="검색엔진 최적화 설정이에요. 검색 결과 노출에 영향을 미쳐요." />
    <Row label="페이지 타이틀" desc="브라우저 탭과 검색 결과에 표시돼요.">
      <Input defaultValue={brand.name} />
    </Row>
    <Row label="메타 설명" desc="검색 결과 미리보기 텍스트예요. 160자 이내 권장.">
      <Textarea placeholder="쇼핑몰을 한 줄로 소개해주세요." rows={3} />
    </Row>
    <Row label="OG 이미지" desc="SNS 공유 시 표시되는 이미지예요. 1200×630px 권장.">
      <FilePicker accept="image/*" />
    </Row>

  </SettingsSection>
);
