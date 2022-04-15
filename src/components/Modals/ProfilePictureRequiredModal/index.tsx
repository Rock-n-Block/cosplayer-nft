import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Modal } from 'components/index';

import { routes } from 'appConstants';
import { useModal } from 'hooks';
import { StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

import s from './ProfilePictureRequiredModal.module.scss';

const ProfilePictureRequiredModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(routes.profile.edit);
    handleCloseModal();
  };

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className={s.content}>
        <div className={s.title}>Profile Picture Required</div>
        <div className={s.description}>
          A profile picture is required in order to post on CosplayerNFT.
        </div>
        <Button color="blue" className={s.edit_profile_btn} onClick={handleNavigate}>
          Edit Profile
        </Button>
      </div>
    </Modal>
  );
};

export default ProfilePictureRequiredModal;
