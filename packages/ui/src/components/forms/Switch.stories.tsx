import React, { useState } from 'react';
import { Switch } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
};

export const Basic = () => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onChange={setChecked} label="스위치 레이블" />;
};
