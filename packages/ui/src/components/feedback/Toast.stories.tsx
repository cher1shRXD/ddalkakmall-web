import React from 'react';
import { ToastItem } from './Toast';

export default {
  title: 'Components/Toast',
  component: ToastItem,
};

export const Basic = () => (
  <ToastItem 
    id="1" 
    message="토스트 메시지입니다"
    type='success'
    duration={3000}
  />
);