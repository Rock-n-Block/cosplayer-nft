import { FC, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useDispatch } from 'react-redux';
import actionTypes from 'store/nfts/actionTypes';
import { clearNfts } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { Button } from 'components';

import { ProfileNavBar } from './components/ProfileNavBar';
import { UserInfo } from './components/UserInfo';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import s from './Profile.module.scss';

export const Profile: FC = () => {
  const nfts = useShallowSelector(nftsSelector.getProp('nfts'));
  const { [actionTypes.SEARCH_NFTS]: searchNftsRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearNfts());
    };
  }, [dispatch]);

  return (
    <div className={s.profile_wrapper}>
      <UserInfo />
      <div className={s.tokens}>
        <ProfileNavBar />
        <div className={s.tokens_list}>
          {searchNftsRequestStatus === RequestStatus.REQUEST && (
            <>
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
              <Skeleton className={s.token} />
            </>
          )}
          {searchNftsRequestStatus === RequestStatus.SUCCESS &&
            nfts.map((nft) => (
              <Button className={s.token} href={routes.nft.link(nft.id || 0)} key={nft.id}>
                <img src={nft.media} alt="nft" />
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
