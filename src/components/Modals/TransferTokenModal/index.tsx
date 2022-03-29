import { ChangeEvent, FC, memo, useState } from 'react';

import { Button, FormInput, Modal } from '@/components';

import { useModal } from '@/hooks';
import { StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';

const TransferTokenModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [address, setAddress] = useState('');

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleTransferToken = () => {};

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-title">Transfer token</div>
        <div className="modal-text">You can transfer tokens from your address to another</div>
        <FormInput
          color="grey"
          type="text"
          placeholder="Paste address"
          value={address}
          label="Receiver address"
          onChange={handleChangeAddress}
        />
        <Button
          color="blue"
          className="modal-box-button"
          disabled={!address}
          onClick={handleTransferToken}
        >
          Continue
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default memo(TransferTokenModal);
