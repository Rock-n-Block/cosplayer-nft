import { FC, memo, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Button, Modal } from 'components/index';

import { useModal, useShallowSelector } from 'hooks';
import { StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

import s from './ProfilePictureRequiredModal.module.scss';

const ProfilePictureRequiredModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const { address, displayName, avatar } = useShallowSelector(userSelector.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address && displayName && !avatar) {
      dispatch(setActiveModal({ activeModal: 'AvatarRequired', visible: true }));
    }
  }, [address, avatar, dispatch, displayName]);

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal} className={s.avatar_required_modal}>
      <Button className={s.header_close} onClick={handleCloseModal}>
        <CloseImg className={s.close_btn} />
      </Button>
      <div className={s.content}>
        <div className={s.title}>Profile Picture Required</div>
        <div className={s.description}>
          A profile picture is required in order to post on CosplayerNFT.
        </div>
        <Button color="blue" className={s.edit_profile_btn} href="/">
          Edit Profile
        </Button>
      </div>
    </Modal>
  );
};

export default memo(ProfilePictureRequiredModal);
