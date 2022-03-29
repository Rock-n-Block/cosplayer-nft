import { ChangeEvent, FC, memo, useState } from 'react';

import { Button, FormInput, Modal } from '@/components';

import { useModal } from '@/hooks';
import { StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';

const ReportModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [message, setMessage] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleReport = () => {};

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-title">Report</div>
        <div className="modal-text">
          Describe why you think this item should be removed from marketplace
        </div>
        <FormInput
          color="grey"
          type="text"
          placeholder="Tell us the details"
          value={message}
          label="Message"
          onChange={handleChangeInput}
        />
        <Button
          color="blue"
          className="modal-box-button"
          disabled={!message}
          onClick={handleReport}
        >
          Send now
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default memo(ReportModal);
