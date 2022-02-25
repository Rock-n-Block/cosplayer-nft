import { FC } from 'react';

import TokenMenu from './TokenMenu';
import TokenPreview from './TokenPreview';

import s from './Token.module.scss';

const Token: FC = () => {
  return (
    <div className={s.token_wrapper}>
      <TokenPreview />
      <TokenMenu />
    </div>
  );
};

export default Token;
