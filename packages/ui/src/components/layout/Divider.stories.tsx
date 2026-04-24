import React from 'react';
import { Divider } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
};

export const Horizontal = () => (
  <div>
    위 텍스트
    <Divider label="또는" />
    아래 텍스트
  </div>
);
export const Vertical = () => (
  <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
    왼쪽
    <Divider orientation="vertical" />
    오른쪽
  </div>
);
