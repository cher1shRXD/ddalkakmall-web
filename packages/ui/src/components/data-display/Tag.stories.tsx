import React from 'react';
import { Tag } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
};

export const Basic = () => <Tag>태그 레이블</Tag>;
export const Variants = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Tag variant="primary">기본</Tag>
    <Tag variant="success">성공</Tag>
    <Tag variant="warning">경고</Tag>
    <Tag variant="danger">위험</Tag>
  </div>
);
