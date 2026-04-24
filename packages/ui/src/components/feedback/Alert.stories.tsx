import React from 'react';
import { Alert } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
};

export const Basic = () => <Alert title="Alert Title">This is an alert message.</Alert>;
export const Info = () => <Alert variant="info">Info message</Alert>;
export const Success = () => <Alert variant="success">Success message</Alert>;
export const Warning = () => <Alert variant="warning">Warning message</Alert>;
export const Danger = () => <Alert variant="danger">Danger message</Alert>;
