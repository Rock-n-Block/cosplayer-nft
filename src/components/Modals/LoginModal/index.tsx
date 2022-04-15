import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { LoginForm } from 'forms';

import { Button, Modal } from 'components';
import { addressWithDots } from 'utils';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

import s from './LoginModal.module.scss';

const LoginModal: FC<StoreModalProps> = ({ id }) => {
  const { disconnect } = useWalletConnectorContext();
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const { address, provider } = useShallowSelector(userSelector.getUser);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    handleCloseModal();
    disconnect();
    dispatch(setActiveModal({ activeModal: 'ConnectWallet' }));
  };

  return (
    <Modal onClose={handleGoBack} visible={isVisibleModal} className={s.login_modal}>
      <div className="modal-header">
        <div className="modal-header_title">Create Account</div>
        <Button onClick={handleGoBack}>
          <CloseImg />
        </Button>
      </div>
      <div className="modal-inner">
        <div className="grey-box">
          <div className={s.connect}>
            <div className={s.connect_provider}>Connect with {provider}</div>
            <div className={s.user}>
              <div className={s.user_avatar} />
              <div className={s.user_address}>{address ? addressWithDots(address) : ''}</div>
            </div>
          </div>
          <Button color="white" className={s.change_btn} onClick={handleGoBack}>
            Change
          </Button>
        </div>
        <LoginForm />
      </div>
    </Modal>
  );
};

export default LoginModal;
