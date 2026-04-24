import React, { useState } from 'react';
import { ModalItem } from './Modal';
import { Button } from './Button';

export default {
  title: 'Components/Modal',
  component: ModalItem,
};

export const Basic = () => (
  <ModalItem id="test" title="Modal Title" onClose={() => {}}>
    Modal Content
  </ModalItem>
);
