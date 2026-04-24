import React from 'react';
import { ConfirmDialogItem } from './ConfirmDialog';

export default {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialogItem,
};

export const Basic = () => (
  <ConfirmDialogItem 
    title="Confirm Dialog" 
    message="Are you sure you want to proceed?" 
  />
);
