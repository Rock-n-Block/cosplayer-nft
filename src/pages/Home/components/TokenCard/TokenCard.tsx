import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { likeNft } from 'store/nfts/actions';

import { CreatorCard } from 'containers';

import { Button } from 'components';
import { logger } from 'utils';

import { routes } from 'appConstants';
import { Creator, Currency, TokenFull } from 'types';

import { BnbImg, DefaultAvatarImg, LikeActiveImg, LikeImg } from 'assets/img/icons';
import { CommentImg } from 'assets/img/icons/token-card';

import s from './TokenCard.module.scss';

type Owner = Creator & {
  quantity: number | string;
  price: number | string;
  currency: Currency;
};

export type TokenCardProps = {
  data: TokenFull & {
    owners: Owner;
  };
};

export const TokenCard: FC<TokenCardProps> = ({ data }) => {
  let clickTimeout: unknown = null;
  const navigate = useNavigate();
  const {
    id,
    creator,
    media,
    description,
    currency,
    name,
    isLiked,
    price,
    usdPrice,
    commentCount,
    likeCount,
    standart,
    owners,
    hashtags,
  } = data;
  const [isLike, setLike] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likeCount || 0);
  const dispatch = useDispatch();

  const successCallback = useCallback(() => {
    if (isLike) {
      setLikesCount((prev) => prev - 1);
      setLike(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setLike(true);
    }
  }, [isLike]);

  const errorCallback = useCallback(() => {
    if (isLike) {
      toast.error('Dislike error');
    } else {
      toast.error('Like error');
    }
  }, [isLike]);

  const handleLike = useCallback(() => {
    dispatch(likeNft({ id: id || 0, successCallback, errorCallback }));
  }, [dispatch, errorCallback, id, successCallback]);

  const handleNavigate = () => {
    if (id) navigate(routes.nft.link(id));
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
        <CreatorCard creator={creator} />
      </div>
      <Button className={s.preview} onClick={handleClick}>
        <img src={media} alt="nft token preview" />
      </Button>
      <div className={s.footer}>
        <div className={s.info}>
          <div className={s.info_actions}>
            <div className={s.action}>
              <Button onClick={handleLike}>
                {isLike ? <LikeActiveImg /> : <LikeImg className={s.like_img} />}
              </Button>
              <span>{likesCount}</span>
            </div>
            <div className={s.action}>
              <Button onClick={() => {}}>
                <CommentImg />
              </Button>
              <span>{commentCount}</span>
            </div>
          </div>
          <div className={s.price}>
            <div className={s.price_value}>
              <img src={BnbImg} alt="currency icon" />
              Price -&nbsp;
              <div className={s.blue_text}>
                {price} {currency.symbol?.toUpperCase()}
              </div>
            </div>
            <div className={s.price_usd}>${usdPrice}</div>
          </div>
        </div>
        <div className={s.description}>
          <div className={s.description_text}>
            <div className={s.title}>&quot;{name}&quot;</div>
            &nbsp;{description}
          </div>
          <div className={s.tags}>
            {hashtags &&
              hashtags.map(
                (tag) =>
                  tag.name !== '#' && (
                    <Button key={tag.name} onClick={() => {}}>
                      #{tag.name}
                    </Button>
                  ),
              )}
          </div>
          <div className={s.current_owner}>
            {standart === 'ERC1155' ? (
              <span>
                Multiple&nbsp;<span className={s.blue_text}>owners</span>
              </span>
            ) : (
              <Button href={`/profile/${owners?.id}`}>
                <img src={owners?.avatar || DefaultAvatarImg} alt="current owner avatar" />
                Current owner&nbsp;<span className={s.blue_text}>{owners?.customUrl}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
