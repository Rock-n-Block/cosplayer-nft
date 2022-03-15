import { FC } from 'react';

import { ConnectWalletModal, LoginModal, ProfilePictureRequiredModal } from 'components/Modals';

const ModalsManager: FC = () => (
  <>
    <ConnectWalletModal id="ConnectWallet" />
    <LoginModal id="Login" />
    <ProfilePictureRequiredModal id="AvatarRequired" />
  </>
);

export default ModalsManager;
