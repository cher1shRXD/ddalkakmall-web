import React from 'react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from '../forms/Button';

export default {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
};

const items = [
  { key: "Action1", label: 'Action 1', onClick: () => {} },
  { key: "Action2", label: 'Action 2', onClick: () => {} },
];

export const Basic = () => (
  <DropdownMenu items={items} trigger={<Button>Open Menu</Button>} />
);
