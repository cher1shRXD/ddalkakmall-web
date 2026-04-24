import React from 'react';
import { Heading } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading,
};

export const Basic = () => (
  <div>
    <Heading level={1}>Heading 1</Heading>
    <Heading level={2}>Heading 2</Heading>
    <Heading level={3}>Heading 3</Heading>
  </div>
);
