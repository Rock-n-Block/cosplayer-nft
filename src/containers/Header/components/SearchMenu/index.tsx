import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { searchCountries, searchHashtags, searchNfts } from 'store/nfts/actions';
import nftsSelector from 'store/nfts/selectors';

import { CreatorCard } from 'containers';

import { Button } from 'components';

import { useShallowSelector } from 'hooks';

import s from './SearchMenu.module.scss';

type AvailableTabs = 'User' | '#Tag' | 'Location';

type SearchMenuProps = {
  searchInput: string;
  closeMenu: () => void;
};

const SearchMenu: FC<SearchMenuProps> = ({ searchInput, closeMenu }) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>('User');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedUsers, hashtags, countries } = useShallowSelector(nftsSelector.getNfts);

  const handleSetTab = (tab: AvailableTabs) => {
    return () => {
      setActiveTab(tab);
    };
  };

  const handleNavigate = (route: string) => {
    return () => {
      navigate(route);
      closeMenu();
    };
  };

  useEffect(() => {
    if (activeTab === 'User') {
      dispatch(searchNfts({ data: { text: searchInput }, props: { type: 'users' } }));
    } else if (activeTab === '#Tag') {
      dispatch(searchHashtags({ hashtag: searchInput }));
    } else {
      dispatch(searchCountries({ country: searchInput }));
    }
  }, [activeTab, dispatch, searchInput]);

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
          #Tag
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
        {activeTab === 'User' &&
          searchedUsers.map((user) => (
            <CreatorCard handleNavigate={handleNavigate} key={user.id} creator={user} />
          ))}
        {activeTab === '#Tag' &&
          hashtags.map((hashtag) => (
            <Button
              key={hashtag.name}
              className={s.hashtag}
              onClick={handleNavigate(`/search/hashtag/${hashtag.name}`)}
            >
              #{hashtag.name}
            </Button>
          ))}
        {activeTab === 'Location' &&
          countries.map((country) => (
            <Button
              className={s.hashtag}
              key={country.country}
              onClick={handleNavigate(`/search/country/${country.country}`)}
            >
              {country.country}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default SearchMenu;
