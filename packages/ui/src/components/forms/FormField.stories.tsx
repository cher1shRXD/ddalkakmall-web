import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';

export default {
  title: 'Components/FormField',
  component: FormField,
};

export const Basic = () => (
  <FormField label="사용자 이름" hint="고유한 사용자 이름을 입력해 주세요" required>
    <Input placeholder="사용자 이름" />
  </FormField>
);
