import { FC, memo } from 'react';

import { Button, Modal } from '@/components';

import { useModal } from '@/hooks';
import { StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';

const RemoveTokenModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);

  const handleRemoveToken = () => {};

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button onClick={handleCloseModal} className="modal-close-btn">
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div>
          <div className="modal-title">Remove token</div>
          <div className="modal-box-description">
            Do you really want to remove your item from sale? You can put it on sale anytime
          </div>
        </div>
        <Button color="blue" className="modal-box-button" onClick={handleRemoveToken}>
          Remove now
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default memo(RemoveTokenModal);
