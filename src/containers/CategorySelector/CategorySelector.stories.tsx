import React from 'react';

import CategorySelector from './index';

export default {
  title: 'containers/CategorySelector',
  component: CategorySelector,
};

export const Default: React.FC = () => <CategorySelector handleChooseCategory={() => {}} />;
