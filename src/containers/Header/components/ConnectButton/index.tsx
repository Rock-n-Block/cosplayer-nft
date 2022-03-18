import { FC, memo } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Button } from 'components';
import { addressWithDots } from 'utils';

import { useShallowSelector } from 'hooks';

import { DefaultAvatarImg } from 'assets/img/icons';

import s from './ConnectButton.module.scss';

const ConnectButton: FC = () => {
  const { address, displayName, avatar } = useShallowSelector(userSelector.getUser);
  const dispatch = useDispatch();

  const handleOpenUserInfoModal = () => {
    dispatch(setActiveModal({ activeModal: 'UserInfo', visible: true }));
  };

  const handleOpenConnectModal = () => {
    dispatch(setActiveModal({ activeModal: 'ConnectWallet', visible: true }));
  };

  return address ? (
    <Button color="blue" className={s.user_btn} onClick={handleOpenUserInfoModal}>
      <div className={s.user_info}>
        <div className={s.user_info_name}>
          {!displayName && 'Noname'}
          {displayName &&
            (displayName.length > 15 ? `${displayName.slice(0, 14)}...` : displayName)}
        </div>
        {addressWithDots(address)}
      </div>
      <div className={s.user_avatar}>
        <img src={avatar || DefaultAvatarImg} alt="user avatar" />
      </div>
    </Button>
  ) : (
    <Button color="blue" className={s.connect_wallet_btn} onClick={handleOpenConnectModal}>
      Connect wallet
    </Button>
  );
};

export default memo(ConnectButton);