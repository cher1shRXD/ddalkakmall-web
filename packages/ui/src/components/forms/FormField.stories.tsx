import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';

export default {
  title: 'Components/FormField',
  component: FormField,
};

export const Basic = () => (
  <FormField label="Username" hint="Enter your unique username" required>
    <Input placeholder="Username" />
  </FormField>
);
