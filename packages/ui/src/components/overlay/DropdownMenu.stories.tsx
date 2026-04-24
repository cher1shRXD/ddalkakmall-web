import React from 'react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from '../forms/Button';

export default {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
};

const items = [
  { key: "Action1", label: '동작 1', onClick: () => {} },
  { key: "Action2", label: '동작 2', onClick: () => {} },
];

export const Basic = () => (
  <DropdownMenu items={items} trigger={<Button>메뉴 열기</Button>} />
);
