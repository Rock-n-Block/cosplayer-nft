import { FC, memo } from 'react';

import cn from 'classnames';

import { Button } from '@/components';

import s from './NewPost.module.scss';

const NewPost: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <Button color="blue" className={cn(s.new_post_btn, isMobile && s.mobile)} onClick={() => {}}>
      <div className={s.new_post_btn_content}>
        <div className={s.new_post_btn_content_text}>New post</div>
      </div>
    </Button>
  );
};

export default memo(NewPost);
