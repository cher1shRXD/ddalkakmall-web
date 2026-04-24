import React from 'react';
import { AlertDialogItem } from './AlertDialog';

export default {
  title: 'Components/AlertDialog',
  component: AlertDialogItem,
};

export const Basic = () => (
  <AlertDialogItem 
    title="알림"
    message="알림 메시지입니다."
  />
);
