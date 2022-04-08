import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import cn from 'classnames';

import { Button } from 'components';

import s from './NewPost.module.scss';

type NewPostProps = {
  isMobile: boolean;
  closeMenu?: () => void;
};

const NewPost: FC<NewPostProps> = ({ isMobile, closeMenu }) => {
  const navigate = useNavigate();

  const handleOpenCreate = () => {
    navigate('/create');
    if (isMobile && closeMenu) closeMenu();
  };

  return (
    <Button
      color="blue"
      className={cn(s.new_post_btn, isMobile && s.mobile)}
      onClick={handleOpenCreate}
    >
      <div className={s.new_post_btn_content}>
        <div className={s.new_post_btn_content_text}>New post</div>
      </div>
    </Button>
  );
};

export default memo(NewPost);
