import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import nftsSelector from 'store/nfts/selectors';
import userSelector from 'store/user/selectors';

import { useShallowSelector } from 'hooks';

import { CommentRow } from '../CommentRow';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './Comments.module.scss';

export const Comments: FC = () => {
  const { comments } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const userId = useShallowSelector(userSelector.getProp('id'));

  return (
    <div className={s.comments}>
      {typeof comments === 'undefined' && <Skeleton width="100%" height={64} />}
      {typeof comments !== 'undefined' &&
        comments.map((comment, index) => (
          <CommentRow
            isLiked={!!comment.likedBy.filter((user) => user.id === userId).length}
            comment={comment}
            key={`${index + 1}`}
          />
        ))}
    </div>
  );
};
