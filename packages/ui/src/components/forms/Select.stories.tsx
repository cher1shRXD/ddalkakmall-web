import React, { useState } from 'react';
import { Select } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
};

const options = [
  { label: '옵션 1', value: '1' },
  { label: '옵션 2', value: '2' },
];

export const Basic = () => {
  const [value, setValue] = useState('');
  return <Select options={options} value={value} onChange={setValue} placeholder="옵션 선택" />;
};
