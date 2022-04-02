import { FC } from 'react';

import { TokenMenu } from './components/TokenMenu';
import { TokenPreview } from './components/TokenPreview';

import s from './Nft.module.scss';

export const Nft: FC = () => {
  return (
    <div className={s.token_wrapper}>
      <div className={s.token_wrapper_preview}>
        <TokenPreview />
      </div>
      <TokenMenu />
    </div>
  );
};
