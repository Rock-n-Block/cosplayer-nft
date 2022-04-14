import { FC, useState } from 'react';

import { Categories } from './Categories';
import { categoriesList, sorts } from './Categories.mock';

export default {
  title: 'home/Categories',
  component: Categories,
};

export const Default: FC = () => {
  const [activeCategory, setActiveCategory] = useState(categoriesList[0]);
  const [activeSort, setActiveSort] = useState(sorts[0]);

  return (
    <Categories
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      activeSort={activeSort}
      setActiveSort={setActiveSort}
    />
  );
};
