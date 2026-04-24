import React from 'react';
import { Text } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
};

export const Basic = () => <Text>텍스트 컴포넌트입니다.</Text>;
export const Sizes = () => (
  <div>
    <Text size="xs">아주 작음</Text>
    <Text size="sm">작음</Text>
    <Text size="md">중간</Text>
    <Text size="lg">큼</Text>
    <Text size="xl">아주 큼</Text>
  </div>
);
