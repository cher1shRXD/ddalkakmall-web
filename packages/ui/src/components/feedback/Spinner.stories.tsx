import React from 'react';
import { Spinner } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
};

export const Basic = () => <Spinner />;
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </div>
);
