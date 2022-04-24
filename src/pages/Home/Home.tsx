import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { searchNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearNfts } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { TokenCardSkeleton } from 'components';

import { Categories } from './components/Categories';
import { categoriesList, sorts } from './components/Categories/Categories.mock';
import { TokenCard } from './components/TokenCard';

import { useShallowSelector } from 'hooks';
import { ICategory, RequestStatus, TokenFull } from 'types';

import s from './Home.module.scss';

export const Home: FC = () => {
  const [activeSort, setActiveSort] = useState(sorts[0]);
  const [activeTag, setActiveTag] = useState<ICategory>();
  const dispatch = useDispatch();
  const { nfts } = useShallowSelector(nftsSelector.getNfts);
  const { [actionTypes.SEARCH_NFTS]: searchNftsRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const isSearchHotNftsLoading = useMemo(
    () => searchNftsRequestStatus === RequestStatus.REQUEST,
    [searchNftsRequestStatus],
  );
  const isSearchHotNftsSuccess = useMemo(
    () => searchNftsRequestStatus === RequestStatus.SUCCESS,
    [searchNftsRequestStatus],
  );

  const fetchNfts = useCallback(() => {
    dispatch(
      searchNfts({
        data: { text: '' },
        props: {
          type: 'items',
          onSale: true,
          tags: activeTag?.name !== 'All' ? activeTag?.name : undefined,
          orderBy: activeSort.value,
        },
      }),
    );
  }, [activeSort.value, activeTag?.name, dispatch]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);

  useEffect(
    () => () => {
      dispatch(clearNfts());
    },
    [dispatch],
  );

  return (
    <div className={s.home_wrapper}>
      <Categories
        activeCategory={activeTag || categoriesList[0]}
        setActiveCategory={setActiveTag}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />
      {isSearchHotNftsLoading && (
        <div className={s.token_cards}>
          <TokenCardSkeleton />
          <TokenCardSkeleton />
          <TokenCardSkeleton />
          <TokenCardSkeleton />
        </div>
      )}
      {isSearchHotNftsSuccess && nfts.length > 0 && (
        <div className={s.token_cards}>
          {nfts.map((token) => (
            <TokenCard data={token as TokenFull & { owners: any }} key={token.id} />
          ))}
        </div>
      )}
      {isSearchHotNftsSuccess && nfts.length === 0 && (
        <div className={s.not_found}>No items found. Try another tags or refresh page</div>
      )}
    </div>
  );
};
