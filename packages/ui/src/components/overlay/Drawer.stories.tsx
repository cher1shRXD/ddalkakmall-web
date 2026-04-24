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
      <Button onClick={() => setOpen(true)}>드로어 열기</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="드로어 제목">
        내용
      </Drawer>
    </>
  );
};
