import { FC } from 'react';

import { Button, Modal } from 'components';
import { ModalProps } from 'components/Modal';
import { logger } from 'utils';

import { wallets } from './ConnectWalletModal.mock';

import { CloseImg } from 'assets/img/icons';

import s from './ConnectWalletModal.module.scss';

const ConnectWalletModal: FC<ModalProps> = ({ onClose, visible }) => {
  logger(visible ? 'opened connect modal' : 'closed connect modal');

  return (
    <Modal onClose={onClose} visible={visible} className={s.connect_modal}>
      <div className={s.header}>
        <div className={s.header_title}>Connect to a Wallet</div>
        <Button onClick={onClose}>
          <img src={CloseImg} alt="close icon" />
        </Button>
      </div>
      <div className={s.wallets}>
        {wallets.map((wallet, index) => (
          <Button className={s.wallet} key={`${index + 1}`} onClick={() => {}}>
            <img src={wallet.logo} alt={wallet.provider} />
            <div className={s.wallet_name}>{wallet.name}</div>
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
