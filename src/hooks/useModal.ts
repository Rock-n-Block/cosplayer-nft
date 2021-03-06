import { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from 'store/modals/reducer';
import modalsSelector from 'store/modals/selectors';

import { useShallowSelector } from './index';

import { ActiveModal } from 'types';

const useModal = (id: ActiveModal): [boolean, () => void] => {
  const { activeModal } = useShallowSelector(modalsSelector.getProp('modalState'));
  const dispatch = useDispatch();
  const isVisibleModal = activeModal === id;

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return [isVisibleModal, handleCloseModal];
};

export default useModal;
