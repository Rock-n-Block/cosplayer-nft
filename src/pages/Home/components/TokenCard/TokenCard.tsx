import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreatorCard } from 'containers';

import { Button } from 'components';
import { logger } from 'utils';

import { routes } from 'appConstants';

import { BnbImg, LikeActiveImg, LikeImg } from 'assets/img/icons';
import { CommentImg } from 'assets/img/icons/token-card';
import NftImg from 'assets/img/nft-image.png';
import AvatarImg from 'assets/img/owner-avatar.png';

import s from './TokenCard.module.scss';

export const TokenCard: FC = () => {
  const [isLiked, setLiked] = useState(false);
  let clickTimeout: unknown = null;
  const navigate = useNavigate();

  const handleLike = () => {
    setLiked(!isLiked);
    logger('isLiked:', isLiked.toString());
  };

  const handleNavigate = () => {
    navigate(routes.nft.link(1));
  };

  const handleClick = () => {
    if (clickTimeout !== null) {
      logger('double click executes');
      clearTimeout(clickTimeout as NodeJS.Timeout);
      clickTimeout = null;
      handleLike();
    } else {
      logger('single click');
      clickTimeout = setTimeout(() => {
        logger('first click executes ');
        clearTimeout(clickTimeout as NodeJS.Timeout);
        clickTimeout = null;
        handleNavigate();
      }, 500);
    }
  };

  return (
    <div className={s.token_card}>
      <div className={s.header}>
        <CreatorCard />
      </div>
      <Button className={s.preview} onClick={handleClick}>
        <img src={NftImg} alt="nft token preview" />
      </Button>
      <div className={s.footer}>
        <div className={s.info}>
          <div className={s.info_actions}>
            <div className={s.action}>
              <Button onClick={handleLike}>
                {isLiked ? <LikeActiveImg /> : <LikeImg className={s.like} />}
              </Button>
              552
            </div>
            <div className={s.action}>
              <Button onClick={() => {}}>
                <CommentImg />
              </Button>
              552
            </div>
          </div>
          <div className={s.price}>
            <div className={s.price_value}>
              <img src={BnbImg} alt="currency icon" />
              Price -&nbsp;<div className={s.blue_text}>88888888 NAFT</div>
            </div>
            <div className={s.price_usd}>$201,201.08</div>
          </div>
        </div>
        <div className={s.description}>
          <div className={s.description_text}>
            <div className={s.title}>&quot;THE CHOSEN ONE&quot;</div>
            &nbsp;I will keep proving people...
          </div>
          <div className={s.tags}>
            <Button onClick={() => {}}>#boxing</Button>
            <Button onClick={() => {}}>#nftdrop</Button>
            <Button onClick={() => {}}>#nft</Button>
            <Button onClick={() => {}}>#nftart</Button>
          </div>
          <div className={s.current_owner}>
            <Button onClick={() => {}}>
              <img src={AvatarImg} alt="current owner avatar" />
              Current owner&nbsp;<div className={s.blue_text}>hayato</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
