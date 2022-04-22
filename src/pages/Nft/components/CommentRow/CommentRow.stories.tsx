import { FC } from 'react';

import { comments } from '../Comments/Comments.mock';
import { CommentRow } from './CommentRow';

export default {
  title: 'nft/CommentRow',
  component: CommentRow,
};

export const Default: FC = () => <CommentRow comment={comments[0]} isLiked={false} />;
