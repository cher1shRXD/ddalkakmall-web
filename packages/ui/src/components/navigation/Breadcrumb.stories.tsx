import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

const items = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Product' },
];

export const Basic = () => <Breadcrumb items={items} />;
