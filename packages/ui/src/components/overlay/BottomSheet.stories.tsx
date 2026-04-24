import { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from '../forms/Button';

export default {
  title: 'Components/BottomSheet',
  component: BottomSheet,
};

export const Basic = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open BottomSheet</Button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Bottom Sheet">
        <div style={{ padding: 20 }}>Content</div>
      </BottomSheet>
    </>
  );
};
