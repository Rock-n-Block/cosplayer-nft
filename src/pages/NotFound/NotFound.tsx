import { FC } from 'react';

import s from './NotFound.module.scss';

export const NotFound: FC = () => (
  <div className={s.page_wrapper}>
    <h1 className={s.title}>404 Page not found</h1>
  </div>
);
