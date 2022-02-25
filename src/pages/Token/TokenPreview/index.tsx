import { FC } from 'react';

import ActionSelect from './ActionSelect';

import TokenImg from 'assets/img/nft.png';

import s from './TokenPreview.module.scss';

const TokenPreview: FC = () => {
  return (
    <div className={s.token_preview}>
      <img className={s.token_image} src={TokenImg} alt="token preview" />
      <ActionSelect />
    </div>
  );
};

export default TokenPreview;
