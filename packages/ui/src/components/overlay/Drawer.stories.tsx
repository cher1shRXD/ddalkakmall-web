import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from "../forms/Button";

export default {
  title: 'Components/Drawer',
  component: Drawer,
};

export const Basic = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title">
        Content
      </Drawer>
    </>
  );
};
