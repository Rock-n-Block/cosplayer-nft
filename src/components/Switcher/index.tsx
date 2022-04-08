import React, { FC } from 'react';

import cn from 'classnames';

import { Button } from 'components';

import s from './Switcher.module.scss';

type SwitcherProps = {
  firstTab: string;
  secondTab: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Switcher: FC<SwitcherProps> = ({ firstTab, secondTab, activeTab, setActiveTab }) => {
  const handleSetTab = (tab: string) => {
    return () => {
      setActiveTab(tab);
    };
  };

  return (
    <div className={s.tabs}>
      <Button
        color={activeTab === firstTab ? 'blue' : 'white'}
        className={cn(s.tab, s.tab_left, activeTab === firstTab && s.active)}
        onClick={handleSetTab(firstTab)}
      >
        {firstTab}
      </Button>
      <Button
        color={activeTab === secondTab ? 'blue' : 'white'}
        className={cn(s.tab, s.tab_right, activeTab === secondTab && s.active)}
        onClick={handleSetTab(secondTab)}
      >
        {secondTab}
      </Button>
    </div>
  );
};

export default Switcher;
