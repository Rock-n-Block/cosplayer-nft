import { FC } from 'react';

import CategorySelector from './index';

export default {
  title: 'containers/CategorySelector',
  component: CategorySelector,
};

export const Default: FC = () => {
  const value = '';
  return (
    <CategorySelector
      handleChooseCategory={() => {}}
      name="name"
      value={value}
      error=""
      onChange={() => {}}
      onBlur={() => {}}
      disabled={false}
    />
  );
};
