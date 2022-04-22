import { FC } from 'react';

import nftsSelector from 'store/nfts/selectors';

import { contracts, IS_PRODUCTION } from 'config';
import { addressWithDots } from 'utils';

import { useShallowSelector } from 'hooks';

import s from './Info.module.scss';

export const Info: FC = () => {
  const { id, standart } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const { params, type } = contracts;
  return (
    <div className={s.info}>
      <div className={s.info_item}>
        <div className={s.key}>Contract address</div>
        <a
          className={s.value}
          href={`https://${IS_PRODUCTION ? '' : 'testnet.'}bscscan.com/address/${
            standart === 'ERC721' ? params.ERC721[type].address : params.ERC1155[type].address
          }`}
          target="_blank"
          rel="noreferrer"
        >
          {addressWithDots(
            standart === 'ERC721' ? params.ERC721[type].address : params.ERC1155[type].address,
          )}
        </a>
      </div>
      <div className={s.info_item}>
        <div className={s.key}>Token ID</div>
        <div className={s.value}>{id || 0}</div>
      </div>
      <div className={s.info_item}>
        <div className={s.key}>Blockchain</div>
        <div className={s.value}>{`Binance Smart Chain${IS_PRODUCTION ? '' : ' Testnet'}`}</div>
      </div>
    </div>
  );
};
