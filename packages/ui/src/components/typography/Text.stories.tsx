import React from 'react';
import { Text } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
};

export const Basic = () => <Text>This is a text component.</Text>;
export const Sizes = () => (
  <div>
    <Text size="xs">Extra Small</Text>
    <Text size="sm">Small</Text>
    <Text size="md">Medium</Text>
    <Text size="lg">Large</Text>
    <Text size="xl">Extra Large</Text>
  </div>
);
