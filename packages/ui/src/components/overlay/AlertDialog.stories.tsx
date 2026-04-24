import React from 'react';
import { AlertDialogItem } from './AlertDialog';

export default {
  title: 'Components/AlertDialog',
  component: AlertDialogItem,
};

export const Basic = () => (
  <AlertDialogItem 
    title="Alert Dialog" 
    message="This is an alert dialog message." 
  />
);
