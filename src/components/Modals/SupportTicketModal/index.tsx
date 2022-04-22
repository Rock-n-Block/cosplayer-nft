import { FC } from 'react';

import { SupportForm } from 'forms';

import { Button, Modal } from 'components';

import { useModal } from 'hooks';
import { StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const SupportTicketModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <div className="modal-header">
        <div className="modal-header_title">Submit Support Ticket</div>
        <Button onClick={handleCloseModal}>
          <CloseImg />
        </Button>
      </div>
      <div className="modal-inner">
        <div className="modal-box-header">
          <div className="modal-title">Submit Support Ticket</div>
          <div className="modal-box-description modal-box-description-grey">Explain Your Issue</div>
        </div>
        <SupportForm />
      </div>
    </Modal>
  );
};

export default SupportTicketModal;
