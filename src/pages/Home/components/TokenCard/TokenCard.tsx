import { FC, Fragment, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { likeNft } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js/bignumber';
import { CreatorCard } from 'containers';

import { Button, ImgLoader } from 'components';
import { logger } from 'utils';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { Creator, Currency, TokenFull } from 'types';

import { DefaultAvatarImg, LikeActiveImg, LikeImg } from 'assets/img/icons';
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
    isSelling,
    price,
    usdPrice,
    minimalBid,
    minimalBidUsd,
    commentCount,
    likeCount,
    standart,
    owners,
    hashtags,
  } = data;
  const [isLike, setLike] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likeCount || 0);
  const address = useShallowSelector(userSelector.getProp('address'));
  const dispatch = useDispatch();

  const getUSDPrice = useMemo(() => {
    if (usdPrice) return usdPrice;
    if (minimalBidUsd) return minimalBidUsd;
    if (price && currency.rate)
      return new BigNumber(new BigNumber(price).times(currency.rate).toFixed(5, 1)).toString(10);
    if (minimalBid && currency.rate)
      return new BigNumber(new BigNumber(minimalBid).times(currency.rate).toFixed(5, 1)).toString(
        10,
      );
    return 0;
  }, [currency?.rate, minimalBid, minimalBidUsd, price, usdPrice]);

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
    if (address) {
      dispatch(likeNft({ id: id || 0, successCallback, errorCallback }));
    }
  }, [address, dispatch, errorCallback, id, successCallback]);

  const handleNavigate = () => {
    if (id) navigate(routes.nft.link(id));
  };

  const handleCreatorNavigate = (route: string) => {
    return () => {
      navigate(route);
    };
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
        <CreatorCard handleNavigate={handleCreatorNavigate} creator={creator} />
      </div>
      <Button className={s.preview} onClick={handleClick}>
        <ImgLoader url={media || ''} alt="token preview" />
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
              <CommentImg />
              <span>{commentCount}</span>
            </div>
          </div>
          <div className={s.price}>
            <div className={s.price_value}>
              <img src={currency.image} alt="currency icon" />
              {isSelling ? 'Price -' : 'Minimum Bid -'}&nbsp;
              <div className={s.blue_text}>
                {price || minimalBid} {currency.symbol?.toUpperCase()}
              </div>
            </div>
            <div className={s.price_usd}>${getUSDPrice}</div>
          </div>
        </div>
        <div className={s.description}>
          <p className={s.description_text}>
            <b>{name}&nbsp;</b>
            {description}
          </p>
          <div className={s.tags}>
            {hashtags &&
              hashtags.map((tag) => {
                return tag.name === '#' || tag.name === ' ' ? (
                  Fragment
                ) : (
                  <Button key={tag.name} href={`/search/hashtag/${tag.name}`}>
                    <span>#{tag.name}</span>
                  </Button>
                );
              })}
          </div>
          <div className={s.current_owner}>
            {standart === 'ERC1155' ? (
              <span>
                Multiple&nbsp;<span className={s.blue_text}>owners</span>
              </span>
            ) : (
              <Button href={routes.profile.link(owners?.customUrl || owners?.id || '')}>
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
