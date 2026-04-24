import React from 'react';
import { Tag } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
};

export const Basic = () => <Tag>Tag Label</Tag>;
export const Variants = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="danger">Danger</Tag>
  </div>
);
