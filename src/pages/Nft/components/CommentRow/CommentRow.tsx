import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { likeComment } from 'store/nfts/actions';
import nftsSelector from 'store/nfts/selectors';

import moment from 'moment';

import { Button } from 'components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { IComment } from 'types';

import { LikeActiveImg, LikeImg } from 'assets/img/icons';

import s from './CommentRow.module.scss';

export interface CommentRowProps {
  comment: IComment;
  isLiked: boolean;
}

export const CommentRow: FC<CommentRowProps> = ({ comment, isLiked }) => {
  const [isLike, setIsLike] = useState(isLiked);
  const dispatch = useDispatch();
  const { id: tokenId } = useShallowSelector(nftsSelector.getProp('detailedNft'));

  const date = moment(comment.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow();

  const handleLike = () => {
    if (tokenId) {
      setIsLike(!isLiked);
      dispatch(likeComment({ id: comment.id, tokenId }));
    }
  };

  return (
    <div className={s.comment}>
      <div className={s.comment_content}>
        <Button href={routes.profile.link(comment.user.customUrl || '')}>
          <img src={comment.user.avatar} alt="comment author avatar" />
        </Button>
        <div className={s.comment_info}>
          <div className={s.comment_author}>{comment.user.customUrl}</div>
          <div className={s.comment_text}>{comment.text}</div>
          <div className={s.comment_footer}>{`${date}, ${comment.likeCount} like${
            +comment.likeCount !== 1 ? 's' : ''
          }`}</div>
        </div>
      </div>
      <Button className={s.like} onClick={handleLike}>
        {isLike ? <LikeActiveImg className={s.like_active} /> : <LikeImg />}
      </Button>
    </div>
  );
};
