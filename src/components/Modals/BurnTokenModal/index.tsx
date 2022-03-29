import { FC, memo } from 'react';

import { Button, Modal } from '@/components';

import { useModal } from '@/hooks';
import { StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';

const BurnTokenModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);

  const handleBurnToken = () => {};

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button onClick={handleCloseModal} className="modal-close-btn">
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div>
          <div className="modal-title">Burn token</div>
          <div className="modal-box-description">
            Are you sure to burn this token? This action cannot be undone. Token will be transferred
            to zero address
          </div>
        </div>
        <Button color="red" className="modal-box-button" onClick={handleBurnToken}>
          Burn token
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default memo(BurnTokenModal);
