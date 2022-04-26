import { FC, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/user/actionTypes';
import { disconnectWalletState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { LoginForm } from 'forms';

import { Button, Modal, Spinner } from 'components';
import { addressWithDots } from 'utils';

import { useModal, useShallowSelector } from 'hooks';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

import s from './LoginModal.module.scss';

const LoginModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal] = useModal(id);
  const { address, provider } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.PATCH_USER_INFO]: patchUserInfoRequestType } = useShallowSelector(
    uiSelector.getUI,
  );
  const dispatch = useDispatch();

  const isPatchUserInfoLoading = useMemo(
    () => patchUserInfoRequestType === RequestStatus.REQUEST,
    [patchUserInfoRequestType],
  );

  const handleGoBack = () => {
    dispatch(disconnectWalletState());
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
          <Button
            color="white"
            className={s.change_btn}
            disabled={isPatchUserInfoLoading}
            onClick={handleGoBack}
          >
            {isPatchUserInfoLoading ? <Spinner color="blue" size="sm" /> : 'Change'}
          </Button>
        </div>
        <LoginForm />
      </div>
    </Modal>
  );
};

export default LoginModal;
