import { FC } from 'react';

import { Button } from 'components';

import { ICategory, IDropdownItem } from 'types';

import { SortSelect } from '../SortSelect';
import { categoriesList, sorts } from './Categories.mock';

import s from './Categories.module.scss';

type CategoriesProps = {
  activeCategory: ICategory;
  setActiveCategory: (item: ICategory) => void;
  activeSort: IDropdownItem;
  setActiveSort: (item: IDropdownItem) => void;
};

export const Categories: FC<CategoriesProps> = ({
  activeCategory,
  setActiveCategory,
  activeSort,
  setActiveSort,
}) => {
  return (
    <div className={s.categories}>
      <SortSelect sorts={sorts} activeSort={activeSort} setActiveSort={setActiveSort} />
      <div className={s.categories_scroll}>
        <div className={s.categories_scroll_content}>
          {categoriesList.map((category) => (
            <Button
              onClick={() => setActiveCategory(category)}
              className={category.name === activeCategory.name ? s.active : s.category}
              key={category.name}
            >
              {category.name === activeCategory.name ? (
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
