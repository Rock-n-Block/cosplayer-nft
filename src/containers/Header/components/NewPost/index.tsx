import { FC, memo } from 'react';

import { Button } from 'components';

import s from '../../Header.module.scss';

const NewPost: FC = () => {
  return (
    <Button color="blue" className={s.new_post_btn} onClick={() => {}}>
      <div className={s.new_post_btn_content}>
        <div className={s.new_post_btn_content_text}>New post</div>
      </div>
    </Button>
  );
};

export default memo(NewPost);
