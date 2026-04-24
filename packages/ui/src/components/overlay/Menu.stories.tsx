import React from 'react';
import { Menu } from './Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
};

const items = [
  { label: 'Menu Item 1', onClick: () => {} },
  { label: 'Menu Item 2', onClick: () => {} },
];

export const Basic = () => <Menu items={items} />;
