import { FC, memo, useState } from 'react';

import { Button, Modal } from 'components';
import { ModalProps } from 'components/Modal';

import { useWalletConnectorContext } from 'services';
import { chainsEnum, TAvailableProviders } from 'types';

import { wallets } from './ConnectWalletModal.mock';

import { CloseImg } from 'assets/img/icons';

import s from './ConnectWalletModal.module.scss';

const ConnectWalletModal: FC<ModalProps> = ({ onClose, visible }) => {
  const [connectError, setConnectError] = useState<TAvailableProviders | ''>('');
  const { connect } = useWalletConnectorContext();
  const errorWallet = wallets.find((wallet) => wallet.provider === connectError);

  const handleConnect = (provider: TAvailableProviders) => {
    return async () => {
      const isConnected = await connect(chainsEnum['Binance-Smart-Chain'], provider);
      if (!isConnected) setConnectError(provider);
    };
  };

  const handleCloseError = () => {
    setConnectError('');
  };

  return (
    <Modal onClose={onClose} visible={visible} className={s.connect_modal}>
      <div className={s.header}>
        <div className={s.header_title}>{connectError ? 'Back' : 'Connect to a Wallet'}</div>
        <Button onClick={onClose}>
          <img src={CloseImg} alt="close icon" />
        </Button>
      </div>
      <div className={s.wallets}>
        {!connectError ? (
          wallets.map((wallet, index) => (
            <Button
              className={s.wallet}
              key={`${index + 1}`}
              onClick={handleConnect(wallet.provider)}
            >
              <img src={wallet.logo} alt={wallet.provider} />
              <div className={s.wallet_name}>{wallet.name}</div>
            </Button>
          ))
        ) : (
          <>
            <div className={s.error}>
              <div className={s.error_text}>{connectError} is not installed.</div>
              <Button color="blue" className={s.error_btn} onClick={handleCloseError}>
                Try again
              </Button>
            </div>
            <div className={s.wallet}>
              <img src={errorWallet?.logo} alt={errorWallet?.provider} />
              <div className={s.wallet_name}>
                {errorWallet?.name}
                <div className={s.wallet_name_msg}>Easy to use browser extension</div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default memo(ConnectWalletModal);
