import { FC, useCallback } from 'react';

import { Button } from 'components';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import s from './Header.module.scss';

const Header: FC = () => {
  const { connect } = useWalletConnectorContext();
  const connectToWallet = useCallback(async () => {
    await connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask');
  }, [connect]);

  return (
    <div className={s.header_wrapper}>
      <Button onClick={connectToWallet}>Connect Wallet</Button>
    </div>
  );
};

export default Header;
