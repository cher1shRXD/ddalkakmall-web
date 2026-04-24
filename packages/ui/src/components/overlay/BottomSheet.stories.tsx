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
      <Button onClick={() => setOpen(true)}>바텀시트 열기</Button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="바텀시트">
        <div>내용</div>
      </BottomSheet>
    </>
  );
};
