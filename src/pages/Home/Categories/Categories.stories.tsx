import React from 'react';

import { Categories } from './Categories';

export default {
  title: 'components/Categories',
  component: Categories,
};

export const Default: React.FC = () => {
  return (
    <div>
      <Categories />
    </div>
  );
};
