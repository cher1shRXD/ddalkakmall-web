import React, { useState } from 'react';
import { FilePicker } from './FilePicker';

export default {
  title: 'Components/FilePicker',
  component: FilePicker,
};

export const Basic = () => {
  const [files, setFiles] = useState([]);
  return <FilePicker value={files} onChange={setFiles} />;
};
