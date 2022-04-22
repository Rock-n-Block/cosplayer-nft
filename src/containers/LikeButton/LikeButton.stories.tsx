import { FC } from 'react';

import LikeButton from './index';

export default {
  title: 'containers/LikeButton',
  component: LikeButton,
};

export const Default: FC = () => <LikeButton isLiked={false} likesNumber={0} artId={0} />;
