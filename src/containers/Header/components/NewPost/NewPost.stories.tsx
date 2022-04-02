import { FC } from 'react';

import NewPost from '.';

export default {
  title: 'containers/header/NewPost',
  component: NewPost,
};

export const Default: FC = () => (
  <>
    <NewPost isMobile={false} />
    <NewPost isMobile />
  </>
);
