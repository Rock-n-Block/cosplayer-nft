import { is_production } from 'config';
import { addressWithDots } from 'utils';

import { IAdditionalInfo } from 'types';

export const info: IAdditionalInfo = {
  contractAddress: addressWithDots('0x6059A3AdA4E3aA5197331458dA36EB740c32ceAD'),
  tokenID: 2538,
  blockchain: is_production ? 'Binance Smart Chain' : 'Binance Smart Chain Testnet',
};
