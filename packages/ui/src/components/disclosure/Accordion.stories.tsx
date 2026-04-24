import React from 'react';
import { Accordion } from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

const items = [
  { value: '1', header: 'Item 1', content: 'Content 1' },
  { value: '2', header: 'Item 2', content: 'Content 2' },
];

export const Basic = () => <Accordion items={items} />;
