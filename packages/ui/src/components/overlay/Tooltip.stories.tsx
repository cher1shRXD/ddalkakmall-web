import React from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../forms/Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export const Basic = () => (
  <Tooltip content="Tooltip Content">
    <Button>Hover me</Button>
  </Tooltip>
);
