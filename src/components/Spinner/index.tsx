import { FC } from 'react';

import cn from 'classnames';

import s from './Spinner.module.scss';

type SpinnerProps = {
  color: 'white' | 'blue';
  size: 'sm' | 'md' | 'lg';
};

const Spinner: FC<SpinnerProps> = ({ color, size }) => (
  <div className={s.loading}>
    <div className={cn(s.spinner, s[color], s[size])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
