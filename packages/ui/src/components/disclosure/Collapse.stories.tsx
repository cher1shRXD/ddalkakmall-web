import React, { useState } from 'react';
import { Collapse } from './Collapse';
import { Button } from '../forms/Button';

export default {
  title: 'Components/Collapse',
  component: Collapse,
};

export const Basic = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle</Button>
      <Collapse open={open}>
        <div style={{ padding: 10, background: '#f0f0f0' }}>Collapsed Content</div>
      </Collapse>
    </>
  );
};
