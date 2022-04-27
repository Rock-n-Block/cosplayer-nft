import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import nftsSelector from 'store/nfts/selectors';

import { CreatorCard, LikeButton } from 'containers';
import Tabs, { TabPane } from 'rc-tabs';

import { Button } from 'components';

import { useShallowSelector } from 'hooks';

import { Bids } from '../Bids';
import { CommentForm } from '../CommentForm';
import { Comments } from '../Comments';
import { Info } from '../Info';
import { Owners } from '../Owners';
import { Sales } from '../Sales';

import { ShareImg } from 'assets/img/icons';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './TokenMenu.module.scss';

export const TokenMenu: FC = () => {
  const [activeTab, setActiveTab] = useState('comments');
  const {
    selling,
    isLiked,
    id,
    likeCount,
    creator,
    price,
    isSelling,
    usdPrice,
    minimalBid,
    minimalBidUsd,
    currency,
    name,
    description,
    hashtags,
  } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenShareNftModal = () => {
    dispatch(setActiveModal({ activeModal: 'ShareNft' }));
  };

  const handlePurchase = () => {
    setActiveTab('owners');
  };

  const handleCreatorNavigate = (route: string) => {
    return () => navigate(route);
  };

  return (
    <div className={s.token_menu}>
      <div className={s.token_menu_header}>
        <CreatorCard handleNavigate={handleCreatorNavigate} creator={creator} />
        <Button className={s.purchase_btn} color="orange" onClick={handlePurchase}>
          Purchase
        </Button>
      </div>
      <div className={s.content}>
        <div className={s.activity}>
          <div className={s.activity_actions}>
            {id && typeof likeCount !== 'undefined' ? (
              <LikeButton likesNumber={likeCount} isLiked={!!isLiked} artId={id} />
            ) : (
              <Skeleton width={40} height={28} borderRadius={14} />
            )}
            <Button className={s.activity_btn} color="white" onClick={handleOpenShareNftModal}>
              <ShareImg />
            </Button>
          </div>
          <div className={s.activity_btn}>
            {typeof selling === 'undefined' && <Skeleton width={150} height={18} />}
            {typeof selling !== 'undefined' &&
              (selling ? (
                <div className={s.price}>
                  {currency.image ? (
                    <img src={currency.image} alt="currency icon" />
                  ) : (
                    <div className="default-currency-icon" />
                  )}
                  {(price || minimalBid) && currency.symbol && (
                    <span className={s.blue_text}>
                      {isSelling ? `Price - ${price}` : `Minimum Bid - ${minimalBid}`}&nbsp;
                      {currency.symbol?.toUpperCase()}
                    </span>
                  )}
                  <span className={s.grey_text}>&nbsp;${isSelling ? usdPrice : minimalBidUsd}</span>
                </div>
              ) : (
                <span className={s.not_for_sale}>Not for sale</span>
              ))}
          </div>
        </div>
        <div className={s.description}>
          {name || description ? (
            <div className={s.description_text}>
              <span className={s.bold_text}>{name}</span>
              &nbsp;{description}
            </div>
          ) : (
            <Skeleton className={s.description_text} />
          )}
          <div className={s.tags}>
            {name && typeof hashtags !== 'undefined' ? (
              hashtags.map((hashtag) => (
                <Button
                  key={hashtag.name}
                  className={s.tag}
                  href={`/search/hashtag/${hashtag.name}`}
                >
                  <span>#{hashtag.name}</span>
                </Button>
              ))
            ) : (
              <Skeleton width={300} />
            )}
          </div>
        </div>
        <Tabs
          className={s.tabs}
          activeKey={activeTab}
          onChange={(activeKey) => setActiveTab(activeKey)}
        >
          <TabPane className={s.tabs_item} tab="Comments" key="comments">
            <Comments />
            <CommentForm />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Bids" key="bids">
            <Bids />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Sales" key="sales">
            <Sales />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Ownership" key="owners">
            <Owners />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Additional Info" key="info">
            <Info />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
