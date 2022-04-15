import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import cn from 'classnames';

import { Button } from 'components';

import { useShallowSelector } from 'hooks';

import s from './NewPost.module.scss';

type NewPostProps = {
  isMobile: boolean;
  closeMenu?: () => void;
};

const NewPost: FC<NewPostProps> = ({ isMobile, closeMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { avatar, address } = useShallowSelector(userSelector.getUser);

  const handleOpenCreate = () => {
    if (!address) {
      dispatch(setActiveModal({ activeModal: 'ConnectWallet' }));
    } else if (!avatar) {
      dispatch(setActiveModal({ activeModal: 'AvatarRequired' }));
    } else {
      navigate('/create');
      if (isMobile && closeMenu) closeMenu();
    }
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
