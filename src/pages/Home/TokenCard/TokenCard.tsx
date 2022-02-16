import { FC, useState } from 'react';

import { Button } from 'components';

import { BnbImg } from 'assets/img/icons';
import { CommentImg, LikeImg, VerifiedImg } from 'assets/img/icons/token-card';
import NftImg from 'assets/img/nft-image.png';
import AvatarImg from 'assets/img/owner-avatar.png';

import s from './TokenCard.module.scss';

export const TokenCard: FC = () => {
  const [isLiked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!isLiked);
  };

  return (
    <div className={s.token_card}>
      <div className={s.header}>
        <Button className={s.owner_logo} onClick={() => {}}>
          <img src={AvatarImg} alt="owner avatar" />
        </Button>
        <div className={s.owner_info}>
          <div className={s.owner_info_name}>
            Jakepaul
            <img src={VerifiedImg} alt="verified icon" />
          </div>
          <Button className={s.owner_info_location} onClick={() => {}}>
            United States of America
          </Button>
        </div>
      </div>
      <Button className={s.preview} onClick={() => {}}>
        <img src={NftImg} alt="nft token preview" />
      </Button>
      <div className={s.footer}>
        <div className={s.info}>
          <div className={s.info_actions}>
            <div className={s.action}>
              <Button onClick={handleLike}>
                <img src={LikeImg} alt="like icon" />
              </Button>
              552
            </div>
            <div className={s.action}>
              <Button onClick={() => {}}>
                <img src={CommentImg} alt="comment icon" />
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
