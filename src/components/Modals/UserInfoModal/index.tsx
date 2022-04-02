import { FC, memo } from 'react';

import { Modal } from 'components';

import { HeaderMenu } from 'containers/Header/components';

import { useModal } from 'hooks';
import { StoreModalProps } from 'types';

import s from './UserInfoModal.module.scss';

const UserInfoModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);

  return (
    <Modal className={s.user_info_modal} visible={isVisibleModal} onClose={handleCloseModal}>
      <HeaderMenu isModal />
    </Modal>
  );
};

export default memo(UserInfoModal);
