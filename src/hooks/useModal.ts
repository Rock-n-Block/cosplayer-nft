import { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modals/reducer';
import modalsSelector from '@/store/modals/selectors';

import { ActiveModal } from '@/types';
import { useShallowSelector } from './index';

const useModal = (id: ActiveModal): [boolean, () => void] => {
  const { visible, activeModal } = useShallowSelector(modalsSelector.getProp('modalState'));
  const dispatch = useDispatch();
  const isVisibleModal = activeModal === id && visible;

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return [isVisibleModal, handleCloseModal];
};

export default useModal;
