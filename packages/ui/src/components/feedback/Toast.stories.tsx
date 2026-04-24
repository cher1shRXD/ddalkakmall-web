import React from 'react';
import { ToastItem } from './Toast';

export default {
  title: 'Components/Toast',
  component: ToastItem,
};

export const Basic = () => (
  <ToastItem 
    id="1" 
    message="This is a toast message" 
    type='success'
    duration={3000}
  />
);