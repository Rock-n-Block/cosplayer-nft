import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { searchNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { TokenCardSkeleton } from 'components';

import { sorts } from '../Home/components/Categories/Categories.mock';
import { SortSelect } from '../Home/components/SortSelect';
import { TokenCard } from '../Home/components/TokenCard';

import { useShallowSelector } from 'hooks';
import { RequestStatus, TokenFull } from 'types';

import s from './Search.module.scss';

export const Search: FC = () => {
  const [activeSort, setActiveSort] = useState(sorts[0]);
  const { key, value } = useParams();
  const dispatch = useDispatch();
  const nfts = useShallowSelector(nftsSelector.getProp('nfts'));
  const { [actionTypes.SEARCH_NFTS]: searchNftsRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  useEffect(() => {
    dispatch(
      searchNfts({
        data: { text: '' },
        props: {
          type: 'items',
          onSale: true,
          [key === 'hashtag' ? 'hashtag' : 'country']: value,
          orderBy: activeSort.value,
        },
      }),
    );
  }, [activeSort.value, dispatch, key, value]);

  return (
    <div className={s.page_wrapper}>
      <div className={s.header}>
        <SortSelect sorts={sorts} activeSort={activeSort} setActiveSort={setActiveSort} />
        <p className={s.title}>Search results for {key === 'hashtag' ? `#${value}` : value}</p>
      </div>
      <div className={s.tokens}>
        {searchNftsRequestStatus === RequestStatus.REQUEST && (
          <>
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
          </>
        )}
        {searchNftsRequestStatus === RequestStatus.SUCCESS &&
          nfts.map((nft) => <TokenCard data={nft as TokenFull & { owners: any }} key={nft.id} />)}
      </div>
    </div>
  );
};
