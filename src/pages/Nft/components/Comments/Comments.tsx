import { FC } from 'react';

import { CommentRow } from '../CommentRow';
import { comments } from './Comments.mock';

import s from './Comments.module.scss';

export const Comments: FC = () => {
  return (
    <div className={s.comments}>
      {comments.map((comment, index) => (
        <CommentRow comment={comment} key={`${index + 1}`} />
      ))}
    </div>
  );
};