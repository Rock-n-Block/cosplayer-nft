import { ChangeEvent, FC, memo, useState } from 'react';

import { PriceSelector } from '@/containers';

import { Button, FormInput, Modal } from '@/components';

import { useModal } from '@/hooks';
import { Currencies, StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';

const ChangePriceModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState<Currencies>('bnb');

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0) {
      setError('Price should be greater then 0');
    } else setError('');
    setPrice(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-title">Change price</div>
        <FormInput
          color="white"
          type="number"
          positiveOnly
          placeholder="Enter price"
          value={price}
          onChange={handleChangePrice}
          error={error}
          suffix={(
            <PriceSelector
              isOpen={isDropdownOpen}
              setOpen={setIsDropdownOpen}
              currentCurrency={currency}
              setCurrentCurrency={setCurrency}
            />
          )}
        />
        <div className="modal-box-option">
          <div className="modal-box-option-name">Service fee:</div>
          <div className="modal-box-option-value">5%</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">You will receive:</div>
          <div className="modal-box-option-value">
            {+price * 0.95}&nbsp;{currency.toUpperCase()}
          </div>
        </div>
        <Button className="modal-box-button" color="blue" disabled={!!error} onClick={handleSubmit}>
          Change price
        </Button>
        <Button className="modal-box-button" color="bordered" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default memo(ChangePriceModal);
