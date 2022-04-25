import { FC, memo } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import cn from 'classnames';

import { Button, ImgLoader } from 'components';
import { addressWithDots } from 'utils';

import { useShallowSelector } from 'hooks';

import { DefaultAvatarImg } from 'assets/img/icons';

import s from './ConnectButton.module.scss';

type ConnectButtonProps = {
  closeMenu?: () => void;
};

const ConnectButton: FC<ConnectButtonProps> = ({ closeMenu }) => {
  const { address, displayName, avatar } = useShallowSelector(userSelector.getUser);
  const dispatch = useDispatch();

  const handleOpenUserInfoModal = () => {
    dispatch(setActiveModal({ activeModal: 'UserInfo' }));
  };

  const handleOpenConnectModal = () => {
    dispatch(setActiveModal({ activeModal: 'ConnectWallet' }));
    if (closeMenu) closeMenu();
  };

  return address ? (
    <Button color="blue" className={s.user_btn} onClick={handleOpenUserInfoModal}>
      <div className={s.user_info}>
        <div className={s.user_info_name}>
          {!displayName && 'Noname'}
          {displayName &&
            (displayName.length > 11 ? `${displayName.slice(0, 10)}...` : displayName)}
        </div>
        {addressWithDots(address)}
      </div>
      <div className={cn(s.user_avatar, avatar ? '' : s.user_avatar_default)}>
        <ImgLoader
          height={32}
          width={32}
          borderRadius="50%"
          url={avatar || DefaultAvatarImg}
          alt="user avatar"
        />
      </div>
    </Button>
  ) : (
    <Button color="blue" className={s.connect_wallet_btn} onClick={handleOpenConnectModal}>
      Connect wallet
    </Button>
  );
};

export default memo(ConnectButton);
