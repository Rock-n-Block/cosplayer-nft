import { FC } from 'react';

import { CreateForm } from 'forms';

import s from './Create.module.scss';

export const Create: FC = () => {
  return (
    <div className={s.create_wrapper}>
      <CreateForm />
    </div>
  );
};
