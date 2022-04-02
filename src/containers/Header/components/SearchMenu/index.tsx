import React, { FC, memo, useState } from 'react';

import { CreatorCard } from 'containers';

import { Button } from 'components';
import { logger } from 'utils';

import s from './SearchMenu.module.scss';

type AvailableTabs = 'User' | '#Tag' | 'Location';

type SearchMenuProps = {
  searchInput: string;
};

const SearchMenu: FC<SearchMenuProps> = ({ searchInput }) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>('User');

  logger('searchInput:', searchInput);

  const handleSetTab = (tab: AvailableTabs) => {
    return () => {
      setActiveTab(tab);
    };
  };

  return (
    <div className={s.search_menu}>
      <div className={s.tabs}>
        <Button
          color={activeTab === 'User' ? 'blue' : 'inactive'}
          className={s.tab}
          onClick={handleSetTab('User')}
        >
          User
        </Button>
        <Button
          color={activeTab === '#Tag' ? 'blue' : 'inactive'}
          className={s.tab}
          onClick={handleSetTab('#Tag')}
        >
          #Tab
        </Button>
        <Button
          color={activeTab === 'Location' ? 'blue' : 'inactive'}
          className={s.tab}
          onClick={handleSetTab('Location')}
        >
          Location
        </Button>
      </div>
      <div className={s.result}>
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
      </div>
    </div>
  );
};

export default memo(SearchMenu);
