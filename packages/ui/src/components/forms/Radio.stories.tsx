import React, { useState } from 'react';
import { RadioGroup, Radio } from './Radio';

export default {
  title: 'Components/Radio',
  component: RadioGroup,
};

export const Basic = () => {
  const [value, setValue] = useState('1');
  return (
    <RadioGroup value={value} onChange={setValue}>
      <Radio value="1" label="Option 1" />
      <Radio value="2" label="Option 2" />
    </RadioGroup>
  );
};
