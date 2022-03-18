import { FC, useState } from 'react';

import { CreatorCard } from 'containers';
import Tabs, { TabPane } from 'rc-tabs';

import { Button } from 'components';

import { Bids, CommentForm, Comments, Info, Owners, Sales } from './components';

import { BnbImg, LikeActiveImg, LikeImg, ShareImg } from 'assets/img/icons';

import s from './TokenMenu.module.scss';

const TokenMenu: FC = () => {
  const [isLiked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!isLiked);
  };

  return (
    <div className={s.token_menu}>
      <div className={s.token_menu_header}>
        <CreatorCard />
        <Button className={s.purchase_btn} color="orange" onClick={() => {}}>
          Purchase
        </Button>
      </div>
      <div className={s.content}>
        <div className={s.activity}>
          <div className={s.activity_actions}>
            <Button className={s.activity_btn} color="white" onClick={handleLike}>
              &nbsp;{isLiked ? <LikeActiveImg /> : <LikeImg />}&nbsp;552&nbsp;
            </Button>
            <Button className={s.activity_btn} color="white" onClick={() => {}}>
              <ShareImg />
            </Button>
          </div>
          <div className={s.activity_btn}>
            <div className={s.price}>
              <img src={BnbImg} alt="bnb icon" />
              <span className={s.blue_text}>Price - 69 BNB</span>
              <span className={s.grey_text}> $301,201.08</span>
            </div>
          </div>
        </div>
        <div className={s.description}>
          <div className={s.description_text}>
            <span className={s.bold_text}>&quot;THE CHOSEN ONE&quot;</span>&nbsp;I will keep proving
            people...
          </div>
          <div className={s.tags}>
            <Button className={s.tag}>#boxing</Button>
            <Button className={s.tag}>#nftdrop</Button>
            <Button className={s.tag}>#nft</Button>
            <Button className={s.tag}>#nftart</Button>
          </div>
        </div>
        <Tabs className={s.tabs} onChange={() => {}}>
          <TabPane className={s.tabs_item} tab="Comments" key={1}>
            <Comments />
            <CommentForm />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Bids" key={2}>
            <Bids />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Sales" key={3}>
            <Sales />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Ownership" key={4}>
            <Owners />
          </TabPane>
          <TabPane className={s.tabs_item} tab="Additional Info" key={5}>
            <Info />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TokenMenu;