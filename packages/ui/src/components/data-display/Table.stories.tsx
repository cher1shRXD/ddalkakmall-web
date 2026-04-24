import React from 'react';
import { Table } from './Table';

export default {
  title: 'Components/Table',
  component: Table,
};

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
];

const data = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Doe', age: 25 },
];

export const Basic = () => <Table columns={columns} data={data} />;
