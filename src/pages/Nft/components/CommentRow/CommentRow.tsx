import { FC, useState } from 'react';

import { Button } from 'components';

import { IComment } from 'types';

import { LikeActiveImg, LikeImg } from 'assets/img/icons';

import s from './CommentRow.module.scss';

export interface CommentRowProps {
  comment: IComment;
}

export const CommentRow: FC<CommentRowProps> = ({ comment }) => {
  const [isLiked, setLiked] = useState(comment.isLiked);

  const handleLike = () => {
    setLiked(!isLiked);
  };

  return (
    <div className={s.comment}>
      <div className={s.comment_content}>
        <img src={comment.author.avatar} alt="comment author avatar" />
        <div className={s.comment_info}>
          <div className={s.comment_author}>{comment.author.name}</div>
          <div className={s.comment_text}>{comment.text}</div>
          <div className={s.comment_footer}>{`${comment.time}  ${comment.likes} likes`}</div>
        </div>
      </div>
      <Button className={s.like} onClick={handleLike}>
        {isLiked ? <LikeActiveImg className={s.like_active} /> : <LikeImg />}
      </Button>
    </div>
  );
};
