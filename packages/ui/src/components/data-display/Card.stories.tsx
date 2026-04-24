import React from 'react';
import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

export const Basic = () => <Card header="Card Header" footer="Card Footer">Card Content</Card>;
export const Hoverable = () => <Card hoverable>Hover me</Card>;
