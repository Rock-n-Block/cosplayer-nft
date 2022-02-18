import { FC, useState } from 'react';

import { Button } from 'components';

import { ICategory } from 'types';

import SortSelect from '../SortSelect';
import { categoriesList, sorts } from './Categories.mock';

import s from './Categories.module.scss';

export const Categories: FC = () => {
  const [categories, setCategories] = useState<ICategory[]>(categoriesList);

  const handleSetCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((category, idx) => {
        return idx === index
          ? {
              ...category,
              isActive: !category.isActive,
            }
          : {
              ...category,
            };
      }),
    );
  };

  return (
    <div className={s.categories}>
      <SortSelect sorts={sorts} />
      <div className={s.categories_scroll}>
        <div className={s.categories_scroll_content}>
          {categories.map((category, index) => (
            <Button
              onClick={() => handleSetCategory(index)}
              className={category.isActive ? s.active : s.category}
              key={category.name}
            >
              {category.isActive ? (
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
