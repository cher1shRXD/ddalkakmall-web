import React from 'react';
import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

export const Basic = () => <Avatar name="John Doe" />;
export const Image = () => <Avatar src="https://i.pravatar.cc/150?u=1" name="John Doe" />;
