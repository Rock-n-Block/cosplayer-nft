import { FC, useState } from 'react';

import { logger } from 'utils';

import EmojiPicker from '.';

export default {
  title: 'containers/EmojiPicker',
  component: EmojiPicker,
};

export const Default: FC = () => {
  const [comment, setComment] = useState('');

  logger('comment:', comment);

  return <EmojiPicker setState={setComment} />;
};
