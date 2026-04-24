import React from 'react';
import { Divider } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
};

export const Horizontal = () => (
  <div>
    Text above
    <Divider label="OR" />
    Text below
  </div>
);
export const Vertical = () => (
  <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
    Left
    <Divider orientation="vertical" />
    Right
  </div>
);
