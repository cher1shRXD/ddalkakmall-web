import React, { useState } from 'react';
import { ModalItem } from './Modal';
import { Button } from './Button';

export default {
  title: 'Components/Modal',
  component: ModalItem,
};

export const Basic = () => (
  <ModalItem id="test" title="모달 제목" onClose={() => {}}>
    모달 내용
  </ModalItem>
);
