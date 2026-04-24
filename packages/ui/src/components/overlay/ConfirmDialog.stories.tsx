import React from 'react';
import { ConfirmDialogItem } from './ConfirmDialog';

export default {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialogItem,
};

export const Basic = () => (
  <ConfirmDialogItem 
    title="확인"
    message="계속 진행하시겠습니까?"
  />
);
