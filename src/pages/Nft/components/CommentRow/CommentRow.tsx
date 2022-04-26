import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import { likeComment } from 'store/nfts/actions';
import nftsSelector from 'store/nfts/selectors';
import userSelector from 'store/user/selectors';

import moment from 'moment';

import { Button } from 'components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { IComment } from 'types';

import { LikeActiveImg, LikeImg } from 'assets/img/icons';
import { RemoveImg } from 'assets/img/icons/actions';

import s from './CommentRow.module.scss';

export interface CommentRowProps {
  comment: IComment;
  isLiked: boolean;
}

export const CommentRow: FC<CommentRowProps> = ({ comment, isLiked }) => {
  const [isLike, setIsLike] = useState(isLiked);
  const dispatch = useDispatch();
  const { id: tokenId } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const yourId = useShallowSelector(userSelector.getProp('id'));

  const date = moment(comment.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow();

  const handleLike = () => {
    if (tokenId) {
      setIsLike(!isLiked);
      dispatch(likeComment({ id: comment.id, tokenId }));
    }
  };

  const handleRemoveComment = () => {
    dispatch(setActiveModal({ activeModal: 'RemoveComment', props: { itemId: comment.id } }));
  };

  return (
    <div className={s.comment}>
      <div className={s.comment_content}>
        <Button href={routes.profile.link(comment.user.customUrl || '')}>
          <img src={comment.user.avatar} alt="comment author avatar" />
        </Button>
        <div className={s.comment_info}>
          <span className={s.comment_author}>{comment.user.customUrl}</span>
          <span className={s.comment_text}>{comment.text}</span>
          <span className={s.comment_footer}>{`${date}, ${comment.likeCount} like${
            +comment.likeCount !== 1 ? 's' : ''
          }`}</span>
        </div>
      </div>
      <div className={s.actions}>
        {comment.user.id === yourId && (
          <Button className={s.action} onClick={handleRemoveComment}>
            <img src={RemoveImg} alt="remove icon" />
          </Button>
        )}
        <Button className={s.action} onClick={handleLike}>
          {isLike ? <LikeActiveImg className={s.action_active} /> : <LikeImg />}
        </Button>
      </div>
    </div>
  );
};
