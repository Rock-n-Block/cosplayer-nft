import { FC } from 'react';

import {
  BurnTokenModal,
  ChangePriceModal,
  ConnectWalletModal,
  LoginModal,
  PlaceBidModal,
  ProfilePictureRequiredModal,
  RemoveTokenModal,
  ReportModal,
  ShareNftModal,
  TransferTokenModal,
  UserInfoModal,
} from '@/components/Modals';

const ModalsManager: FC = () => (
  <>
    <ConnectWalletModal id="ConnectWallet" />
    <LoginModal id="Login" />
    <ProfilePictureRequiredModal id="AvatarRequired" />
    <UserInfoModal id="UserInfo" />
    <ShareNftModal id="ShareNft" />
    <ChangePriceModal id="ChangePrice" />
    <BurnTokenModal id="BurnToken" />
    <RemoveTokenModal id="RemoveToken" />
    <TransferTokenModal id="TransferToken" />
    <ReportModal id="Report" />
    <PlaceBidModal id="PlaceBid" />
  </>
);

export default ModalsManager;
