import React, { useState } from 'react';
import { Select } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
};

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

export const Basic = () => {
  const [value, setValue] = useState('');
  return <Select options={options} value={value} onChange={setValue} placeholder="Select an option" />;
};
