import { FC, memo, useState } from 'react';

import cn from 'classnames';

import { Button } from 'components';

import { useClickOutside } from 'hooks';
import { ISort } from 'types';

import ArrowDown from 'assets/img/icons/arrow-down-blue.svg';

import s from './SortSelect.module.scss';

interface SortModalProps {
  sorts: ISort[];
}

const SortSelect: FC<SortModalProps> = ({ sorts }) => {
  const [activeSort, setActiveSort] = useState<ISort>(sorts[0]);
  const { ref, isVisible, setVisible } = useClickOutside(false);

  const handleOpenSort = () => {
    setVisible(true);
  };

  const handleChangeSort = (index: number) => {
    setActiveSort(sorts[index]);
    setVisible(false);
  };

  return (
    <div className={s.sort} role="button" ref={ref}>
      <Button color="white" className={s.sort_control} onClick={handleOpenSort}>
        <div className={s.sort_control_item}>
          <img className={s.sort_control_icon} src={activeSort.icon} alt={activeSort.value} />
          <div className={s.category_name}>{activeSort.label}</div>
        </div>
        <img
          className={cn(s.sort_arrow, isVisible && s.sort_arrow_up)}
          src={ArrowDown}
          alt="arrow down icon"
        />
      </Button>
      {isVisible && (
        <div className={cn(s.sort_menu, isVisible && s.sort_menu_open)}>
          {sorts.map((sort, index) => (
            <Button className={s.option} onClick={() => handleChangeSort(index)} key={sort.value}>
              <img className={s.option_icon} src={sort.icon} alt={sort.value} />
              <div className={s.option_value}>{sort.label}</div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(SortSelect);
