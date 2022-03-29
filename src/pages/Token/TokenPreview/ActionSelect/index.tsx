import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from '@/store/modals/reducer';

import { Dropdown } from '@/components';

import { MoreImg } from '@/assets/img/icons';
import { actions } from './ActionSelect.mock';

import s from './ActionSelect.module.scss';

const ActionSelect: FC = () => {
  const [isOpenActions, setOpenActions] = useState(false);
  const dispatch = useDispatch();

  const handleAction = (index: number) => {
    switch (index) {
      case 0: {
        dispatch(setActiveModal({ activeModal: 'ChangePrice', visible: true }));
        break;
      }
      case 1: {
        dispatch(setActiveModal({ activeModal: 'TransferToken', visible: true }));
        break;
      }
      case 2: {
        dispatch(setActiveModal({ activeModal: 'RemoveToken', visible: true }));
        break;
      }
      case 3: {
        dispatch(setActiveModal({ activeModal: 'BurnToken', visible: true }));
        break;
      }
      case 4: {
        dispatch(setActiveModal({ activeModal: 'Report', visible: true }));
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Dropdown
      isVisible={isOpenActions}
      setVisible={setOpenActions}
      options={actions}
      classname={s.actions}
      controlClassname={s.actions_control}
      optionsClassname={s.actions_options}
      handleClickOnOption={handleAction}
    >
      <img src={MoreImg} alt="more icon" />
    </Dropdown>
  );
};

export default ActionSelect;
