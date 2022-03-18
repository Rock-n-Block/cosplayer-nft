import { FC } from 'react';

import {
  ConnectWalletModal,
  LoginModal,
  ProfilePictureRequiredModal,
  UserInfoModal,
} from 'components/Modals';

const ModalsManager: FC = () => (
  <>
    <ConnectWalletModal id="ConnectWallet" />
    <LoginModal id="Login" />
    <ProfilePictureRequiredModal id="AvatarRequired" />
    <UserInfoModal id="UserInfo" />
  </>
);

export default ModalsManager;
