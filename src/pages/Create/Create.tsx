import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import userSelector from 'store/user/selectors';

import { CreateForm } from 'forms';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';

import s from './Create.module.scss';

export const Create: FC = () => {
  const navigate = useNavigate();
  const { address, avatar } = useShallowSelector(userSelector.getUser);

  useEffect(() => {
    if (address && !avatar) {
      navigate(routes.home.root);
    }
  }, [address, avatar, navigate]);

  return (
    <div className={s.create_wrapper}>
      <CreateForm />
    </div>
  );
};
