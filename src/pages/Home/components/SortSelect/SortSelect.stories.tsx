import { FC, useState } from 'react';

import { sorts } from '../Categories/Categories.mock';
import { SortSelect } from './SortSelect';

export default {
  title: 'home/SortSelect',
  component: SortSelect,
};

export const Default: FC = () => {
  const [activeSort, setActiveSort] = useState(sorts[0]);

  return <SortSelect sorts={sorts} activeSort={activeSort} setActiveSort={setActiveSort} />;
};
