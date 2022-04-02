import { FC, useState } from 'react';

import cn from 'classnames';

import Dropdown from './index';
import { sorts } from 'pages/Home/components/Categories/Categories.mock';

import { ArrowDownBlueImg } from 'assets/img/icons';

import s from 'pages/Home/components/SortSelect/SortSelect.module.scss';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
};

export const Default: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState(sorts[0]);

  return (
    <Dropdown
      isVisible={isVisible}
      setVisible={setIsVisible}
      options={sorts}
      classname={s.sort}
      controlClassname={s.sort_control}
      optionsClassname={s.sort_options}
      handleClickOnOption={(index) => {
        setIsVisible(false);
        setCurrentOption(sorts[index]);
      }}
    >
      <img className={s.sort_control_icon} src={currentOption.icon} alt="sort option icon" />
      <div className={s.sort_control_name}>{currentOption.label}</div>
      <ArrowDownBlueImg className={cn(s.sort_arrow, isVisible && s.sort_arrow_up)} />
    </Dropdown>
  );
};
