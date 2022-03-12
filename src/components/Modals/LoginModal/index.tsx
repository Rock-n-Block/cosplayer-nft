import { FC, memo, useEffect, useState } from 'react';

import userSelector from 'store/user/selectors';

import { Button, Modal } from 'components';
import { addressWithDots } from 'utils';

import { useShallowSelector } from 'hooks';

import { CloseImg } from 'assets/img/icons';

import s from './LoginModal.module.scss';

const LoginModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, displayName, provider } = useShallowSelector(userSelector.getUser);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (address && !displayName) {
      setIsOpen(true);
    }
  }, [address, displayName]);

  return (
    <Modal onClose={closeModal} visible={isOpen} className={s.login_modal}>
      <div className={s.header}>
        <div className={s.header_title}>Create Account</div>
        <Button onClick={closeModal}>
          <img src={CloseImg} alt="close icon" />
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

export default memo(LoginModal);
