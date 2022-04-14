import { FC, useState } from 'react';

import cn from 'classnames';

import { Dropdown } from 'components';

import { IDropdownItem } from 'types';

import ArrowDown from 'assets/img/icons/arrow-down-blue.svg';

import s from './SortSelect.module.scss';

type SortModalProps = {
  sorts: IDropdownItem[];
  activeSort: IDropdownItem;
  setActiveSort: (item: IDropdownItem) => void;
};

export const SortSelect: FC<SortModalProps> = ({ sorts, activeSort, setActiveSort }) => {
  const [isOpenSelect, setOpenSelect] = useState(false);

  const handleChangeSort = (index: number) => {
    setActiveSort(sorts[index]);
    setOpenSelect(false);
  };

  return (
    <Dropdown
      isVisible={isOpenSelect}
      setVisible={setOpenSelect}
      options={sorts}
      classname={s.sort}
      controlClassname={s.sort_control}
      optionsClassname={s.sort_options}
      handleClickOnOption={handleChangeSort}
    >
      <div className={s.sort_control_item}>
        <img className={s.sort_control_icon} src={activeSort.icon} alt={activeSort.value} />
        <div className={s.sort_control_name}>{activeSort.label}</div>
      </div>
      <img
        className={cn(s.sort_arrow, isOpenSelect ? s.sort_arrow_up : s.sort_arrow_down)}
        src={ArrowDown}
        alt="arrow down icon"
      />
    </Dropdown>
  );
};
