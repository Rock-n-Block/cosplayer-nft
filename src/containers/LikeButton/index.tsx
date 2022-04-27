import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { likeNft } from 'store/nfts/actions';

import { Button } from 'components';

import { LikeActiveImg, LikeImg } from 'assets/img/icons';

import s from './LikeButton.module.scss';

type LikeButtonProps = {
  isLiked: boolean;
  likesNumber?: number;
  artId: number | string;
  setLikesNumber?: (type: 'dislike' | 'like') => void;
};

const LikeButton: FC<LikeButtonProps> = ({ isLiked, likesNumber, artId, setLikesNumber }) => {
  const [isLike, setIsLike] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likesNumber || (isLiked ? 1 : 0));

  const dispatch = useDispatch();

  const successCallback = useCallback(() => {
    if (isLike) {
      if (typeof likesNumber !== 'undefined')
        setLikesCount(isLiked ? likesNumber - 1 : likesNumber);
      if (setLikesNumber) setLikesNumber('dislike');
      setIsLike(false);
    } else {
      if (typeof likesNumber !== 'undefined')
        setLikesCount(isLiked ? likesNumber : likesNumber + 1);
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
        likeNft({
          id: art,
          successCallback,
          errorCallback,
        }),
      );
    },
    [dispatch, errorCallback, successCallback],
  );

  const handleLike = useCallback(() => {
    likeAction(artId);
  }, [artId, likeAction]);

  return (
    <Button color="white" className={s.like_nft} onClick={handleLike}>
      {isLike ? <LikeActiveImg /> : <LikeImg className={s.like_img} />}
      <span className={s.like_count}>{likesCount}</span>
    </Button>
  );
};

export default LikeButton;
