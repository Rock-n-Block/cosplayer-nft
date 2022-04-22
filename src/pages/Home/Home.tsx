import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { getHotNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearHotNfts } from 'store/nfts/reducer';
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
  const { hotNfts } = useShallowSelector(nftsSelector.getNfts);
  const { [actionTypes.HOT_NFTS]: hotNftsRequestStatus } = useShallowSelector(uiSelector.getUI);

  const isGetHotNftsLoading = useMemo(
    () => hotNftsRequestStatus === RequestStatus.REQUEST,
    [hotNftsRequestStatus],
  );
  const isGetHotNftsSuccess = useMemo(
    () => hotNftsRequestStatus === RequestStatus.SUCCESS,
    [hotNftsRequestStatus],
  );

  const fetchHotNfts = useCallback(() => {
    dispatch(getHotNfts({ tag: activeTag?.name, sort: activeSort.value }));
  }, [activeSort.value, activeTag?.name, dispatch]);

  useEffect(() => {
    fetchHotNfts();
  }, [fetchHotNfts]);

  useEffect(
    () => () => {
      dispatch(clearHotNfts());
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
      {isGetHotNftsLoading && (
        <div className={s.token_cards}>
          <TokenCardSkeleton />
          <TokenCardSkeleton />
          <TokenCardSkeleton />
          <TokenCardSkeleton />
        </div>
      )}
      {isGetHotNftsSuccess && hotNfts.length > 0 && (
        <div className={s.token_cards}>
          {hotNfts.map(
            (token) =>
              token.selling && (
                <TokenCard data={token as TokenFull & { owners: any }} key={token.id} />
              ),
          )}
        </div>
      )}
      {isGetHotNftsSuccess && hotNfts.length === 0 && (
        <div className={s.not_found}>No items found. Try another tags or refresh page</div>
      )}
    </div>
  );
};
