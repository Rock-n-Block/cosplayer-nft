import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { searchNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { Button } from 'components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import { BidImg, CreatedImg, ForSaleImg, MoneyBagImg, OwnedImg } from 'assets/img/icons/profile';

import s from './ProfileNavBar.module.scss';

export const ProfileNavBar: FC = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const activeTab = new URLSearchParams(useLocation().search).get('tab');
  const nfts = useShallowSelector(nftsSelector.getProp('nfts'));
  const { [actionTypes.SEARCH_NFTS]: searchNftsRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  useEffect(() => {
    if (userId && activeTab === 'created') {
      dispatch(searchNfts({ data: { text: '' }, props: { type: 'items', creator: userId } }));
    }
    if (userId && activeTab === 'for-sale') {
      dispatch(
        searchNfts({ data: { text: '' }, props: { type: 'items', owner: userId, onSale: true } }),
      );
    }
    if (userId && activeTab === 'owned') {
      dispatch(searchNfts({ data: { text: '' }, props: { type: 'items', owner: userId } }));
    }
    if (userId && activeTab === 'sold') {
      dispatch(
        searchNfts({ data: { text: '' }, props: { type: 'items', creator: userId, sold: true } }),
      );
    }
    if (userId && activeTab === 'bidded') {
      dispatch(
        searchNfts({ data: { text: '' }, props: { type: 'items', creator: userId, bidded: true } }),
      );
    }
  }, [activeTab, dispatch, userId]);

  return (
    <div className={s.navbar}>
      <div className={s.tabs}>
        <Button
          className={activeTab === 'for-sale' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'for-sale')}
        >
          <ForSaleImg className={s.tab_img} />
          <span>
            For Sale&nbsp;
            {activeTab === 'for-sale' && searchNftsRequestStatus === RequestStatus.SUCCESS && (
              <span className={s.grey}>{nfts.length}</span>
            )}
          </span>
        </Button>
        <Button
          className={activeTab === 'created' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'created')}
        >
          <CreatedImg className={s.tab_img} />
          <span>
            Created&nbsp;
            {activeTab === 'created' && searchNftsRequestStatus === RequestStatus.SUCCESS && (
              <span className={s.grey}>{nfts.length}</span>
            )}
          </span>
        </Button>
        <Button
          className={activeTab === 'owned' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'owned')}
        >
          <OwnedImg className={s.tab_img} />
          <span>
            Owned&nbsp;
            {activeTab === 'owned' && searchNftsRequestStatus === RequestStatus.SUCCESS && (
              <span className={s.grey}>{nfts.length}</span>
            )}
          </span>
        </Button>
        <Button
          className={activeTab === 'sold' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'sold')}
        >
          <MoneyBagImg className={s.tab_img} />
          <span>
            Sold&nbsp;
            {activeTab === 'sold' && searchNftsRequestStatus === RequestStatus.SUCCESS && (
              <span className={s.grey}>{nfts.length}</span>
            )}
          </span>
        </Button>
        <Button
          className={activeTab === 'bidded' ? s.tab_active : s.tab}
          href={routes.profile.link(userId || 'undefined', 'bidded')}
        >
          <BidImg className={s.tab_img} />
          <span>
            Bidded&nbsp;
            {activeTab === 'bidded' && searchNftsRequestStatus === RequestStatus.SUCCESS && (
              <span className={s.grey}>{nfts.length}</span>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};
