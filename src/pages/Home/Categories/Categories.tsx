import { FC, useState } from 'react';

import { Button } from 'components';

import SortSelect from '../SortSelect';
import { categoriesList, sorts } from './Categories.mock';

import s from './Categories.module.scss';

export const Categories: FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleSetCategory = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <div className={s.categories}>
      <SortSelect sorts={sorts} />
      <div className={s.categories_scroll}>
        <div className={s.categories_scroll_content}>
          {categoriesList.map((category, index) => (
            <Button
              onClick={() => handleSetCategory(index)}
              className={index === activeCategory ? s.active : s.category}
              key={category.name}
            >
              {index === activeCategory ? (
                <div className={s.active_content}>
                  <img src={category.logo} alt={category.name} />
                  <div className={s.category_name}>{category.name}</div>
                </div>
              ) : (
                <>
                  <img src={category.logo} alt={category.name} />
                  <div className={s.category_name}>{category.name}</div>
                </>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
