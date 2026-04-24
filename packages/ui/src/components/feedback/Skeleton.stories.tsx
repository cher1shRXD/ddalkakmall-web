import React from 'react';
import { Skeleton } from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
};

export const Basic = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <Skeleton width={100} height={100} circle />
    <Skeleton width="100%" height={20} />
    <Skeleton width="80%" height={20} />
  </div>
);
