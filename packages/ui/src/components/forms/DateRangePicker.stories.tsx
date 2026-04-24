import React, { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
};

export const Basic = () => {
  const [range, setRange] = useState({ start: null, end: null });
  return <DateRangePicker value={range} onChange={setRange} />;
};
