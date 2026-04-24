import React, { useState } from 'react';
import { Pagination } from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
};

export const Basic = () => {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={100} pageSize={10} onChange={setPage} />;
};
