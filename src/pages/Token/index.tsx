import { FC } from 'react';

import TokenMenu from './TokenMenu';
import TokenPreview from './TokenPreview';

import s from './Token.module.scss';

const Token: FC = () => {
  return (
    <div className={s.token_wrapper}>
      <div className={s.token_wrapper_preview}>
        <TokenPreview />
      </div>
      <TokenMenu />
    </div>
  );
};

export default Token;
