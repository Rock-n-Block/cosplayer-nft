import { FC } from 'react';

import { useTypedSelector } from 'store';

import { Button, Modal } from 'components';
import { ModalProps } from 'components/Modal';
import { addressWithDots } from 'utils';

import { TAvailableProviders } from 'types';

import { CloseImg } from 'assets/img/icons';

import s from './LoginModal.module.scss';

interface LoginModalProps extends ModalProps {
  provider: TAvailableProviders;
}

const LoginModal: FC<LoginModalProps> = ({ visible, provider, onClose }) => {
  const { address } = useTypedSelector((state) => state.UserReducer);

  return (
    <Modal onClose={onClose} visible={visible} className={s.login_modal}>
      <div className={s.header}>
        <div className={s.header_title}>Create Account</div>
        <Button onClick={onClose}>
          <CloseImg />
        </Button>
      </div>
      <div className="grey-box">
        <div className={s.connect}>
          <div className={s.connect_provider}>Connect with {provider}</div>
          <div className={s.user}>
            <div className={s.user_avatar} />
            <div className={s.user_address}>{address ? addressWithDots(address) : ''}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
