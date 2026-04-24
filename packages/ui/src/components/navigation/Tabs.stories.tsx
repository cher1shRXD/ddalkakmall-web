import React from 'react';
import { Tabs } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

const items = [
  { label: 'Tab 1', value: '1', content: 'Content 1' },
  { label: 'Tab 2', value: '2', content: 'Content 2' },
];

export const Basic = () => <Tabs items={items} />;
