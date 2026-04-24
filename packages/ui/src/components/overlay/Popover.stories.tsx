import React from 'react';
import { Popover } from './Popover';
import { Button } from '../forms/Button';

export default {
  title: 'Components/Popover',
  component: Popover,
};

export const Basic = () => (
  <Popover content={<div style={{ padding: 10 }}>Popover Content</div>}>
    <Button>Click me</Button>
  </Popover>
);
