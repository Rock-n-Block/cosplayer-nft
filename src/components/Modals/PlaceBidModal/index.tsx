import { ChangeEvent, FC, memo, useState } from 'react';

import userSelector from '@/store/user/selectors';

import BigNumber from 'bignumber.js/bignumber';
import { PriceSelector } from '@/containers';

import { Button, FormInput, Modal } from '@/components';

import { useModal, useShallowSelector } from '@/hooks';
import { Currencies, StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';

const PlaceBidModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const { balance } = useShallowSelector(userSelector.getUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bid, setBid] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState<Currencies>('bnb');
  const currentBalance = new BigNumber(balance[currency]).div(10 ** 18).toString(10);

  const handleChangeBid = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0) {
      setError('Bid should be greater then 0');
    } else if (+e.target.value > +currentBalance) {
      setError("Bid can't be greater then your balance");
    } else setError('');
    setBid(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-box-header">
          <div className="modal-title">Place a Bid</div>
          <div className="modal-box-description modal-box-description-grey">
            You must bid at least 1.01 BNB
          </div>
        </div>
        <FormInput
          color="white"
          type="number"
          positiveOnly
          placeholder="Enter bid"
          value={bid}
          onChange={handleChangeBid}
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
          <div className="modal-box-option-name">Your balance:</div>
          <div className="modal-box-option-value">
            {currentBalance}&nbsp;{currency.toUpperCase()}
          </div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">Service fee:</div>
          <div className="modal-box-option-value">5%</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">You will pay:</div>
          <div className="modal-box-option-value">
            {+bid * 1.05}&nbsp;{currency.toUpperCase()}
          </div>
        </div>
        <Button className="modal-box-button" color="blue" disabled={!!error} onClick={handleSubmit}>
          Place a Bid
        </Button>
      </div>
    </Modal>
  );
};

export default memo(PlaceBidModal);
