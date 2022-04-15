import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { CreateForm } from 'forms';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';

import s from './Create.module.scss';

export const Create: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = useShallowSelector(userSelector.getProp('avatar'));

  useEffect(() => {
    if (!avatar) {
      navigate(routes.home.root);
      dispatch(setActiveModal({ activeModal: 'AvatarRequired' }));
    }
  }, [avatar, dispatch, navigate]);

  return (
    <div className={s.create_wrapper}>
      <CreateForm />
    </div>
  );
};
