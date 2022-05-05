import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getCollections } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';

import { CreateForm } from 'forms';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';

import s from './Create.module.scss';

export const Create: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { address, avatar } = useShallowSelector(userSelector.getUser);

  useEffect(() => {
    if (address && !avatar) {
      navigate(routes.home.root);
    }
  }, [address, avatar, navigate]);

  useEffect(() => {
    if (address) {
      dispatch(getCollections());
    }
  }, [address, dispatch]);

  return (
    <div className={s.create_wrapper}>
      <CreateForm />
    </div>
  );
};
