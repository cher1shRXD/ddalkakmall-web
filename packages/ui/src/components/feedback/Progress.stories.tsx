import React from 'react';
import { Progress } from './Progress';

export default {
  title: 'Components/Progress',
  component: Progress,
};

export const Basic = () => <Progress value={60} showLabel />;
