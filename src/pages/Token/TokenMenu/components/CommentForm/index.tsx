import { FC, memo, useState } from 'react';

import { EmojiPicker } from '@/containers';

import { Button } from '@/components';
import { logger } from '@/utils';

import AvatarImg from '@/assets/img/owner-avatar.png';
import { comments } from '../Comments/Comments.mock';

import s from './CommentForm.module.scss';

const CommentForm: FC = () => {
  const [comment, setComment] = useState('');

  const handleInput = (str: string) => {
    setComment(str);
  };

  const handlePostComment = () => {
    comments.push({
      author: {
        name: 'KiryaFT',
        avatar: AvatarImg,
      },
      text: comment,
      time: 'now',
      isLiked: false,
      likes: 0,
    });

    logger('comments', JSON.stringify(comments));
  };

  return (
    <div className={s.form}>
      <EmojiPicker setState={setComment} />
      <input
        type="text"
        className={s.form_input}
        placeholder="Add comment"
        value={comment}
        onChange={(e) => handleInput(e.target.value)}
      />
      <Button
        color={comment ? 'orange' : 'disabled'}
        className={s.form_submit}
        onClick={handlePostComment}
      >
        Post
      </Button>
    </div>
  );
};

export default memo(CommentForm);
