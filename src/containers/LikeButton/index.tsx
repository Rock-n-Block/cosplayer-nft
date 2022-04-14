import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { likeNft } from 'store/nfts/actions';

import cn from 'classnames';

import { Button } from 'components';

import { ButtonColors } from 'types';

import { LikeActiveImg, LikeImg } from 'assets/img/icons';

import s from './LikeButton.module.scss';

type LikeButtonProps = {
  isLiked: boolean;
  type: 'nft' | 'comment';
  buttonColor?: ButtonColors;
  likesNumber?: number;
  artId: number | string;
  likeClassName?: string;
  setLikesNumber?: (type: 'dislike' | 'like') => void;
};

const LikeButton: FC<LikeButtonProps> = ({
  isLiked,
  type,
  buttonColor = 'default',
  likesNumber,
  artId,
  likeClassName,
  setLikesNumber,
}) => {
  const [isLike, setIsLike] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likesNumber || (isLiked ? 1 : 0));

  const dispatch = useDispatch();

  const successCallback = useCallback(() => {
    if (isLike) {
      if (likesNumber) setLikesCount(isLiked ? likesNumber - 1 : likesNumber);
      if (setLikesNumber) setLikesNumber('dislike');
      setIsLike(false);
    } else {
      if (likesNumber) setLikesCount(isLiked ? likesNumber : likesNumber + 1);
      if (setLikesNumber) setLikesNumber('like');
      setIsLike(true);
    }
  }, [isLike, isLiked, likesNumber, setLikesNumber]);

  const errorCallback = useCallback(() => {
    if (isLike) {
      toast.error('Dislike error');
    } else {
      toast.error('Like error');
    }
  }, [isLike]);

  const likeAction = useCallback(
    (art: number | string) => {
      dispatch(
        type === 'nft' &&
          likeNft({
            id: art,
            successCallback,
            errorCallback,
          }),
      );
    },
    [dispatch, errorCallback, successCallback, type],
  );

  const handleLike = useCallback(() => {
    likeAction(artId);
  }, [artId, likeAction]);

  return type === 'nft' ? (
    <div color={buttonColor} className={s.like}>
      <Button className={cn(s.like_btn, likeClassName)} onClick={handleLike}>
        {isLike ? <LikeActiveImg /> : <LikeImg className={s.like_img} />}
      </Button>
      <span className={s.like_count}>{likesCount}</span>
    </div>
  ) : (
    <Button onClick={handleLike} className={s.like_comment}>
      {isLike ? <LikeActiveImg className={s.like_comment_active} /> : <LikeImg />}
    </Button>
  );
};

export default LikeButton;
