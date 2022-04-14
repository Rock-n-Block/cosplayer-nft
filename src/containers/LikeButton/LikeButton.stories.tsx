import { FC } from 'react';

import LikeButton from './index';

export default {
  title: 'containers/LikeButton',
  component: LikeButton,
};

export const Default: FC = () => (
  <>
    <LikeButton isLiked={false} likesNumber={0} artId={0} type="nft" />
    <br />
    <LikeButton isLiked={false} type="comment" artId={0} />
  </>
);
