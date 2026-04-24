import React from 'react';
import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
};

export const Basic = () => <Badge count={5}>Message</Badge>;
export const Dot = () => <Badge dot>Message</Badge>;
