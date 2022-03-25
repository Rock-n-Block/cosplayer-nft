import { ChangeEvent, FC, memo, useState } from 'react';

import cn from 'classnames';

import { Button, Dropdown, FormInput, Modal } from 'components';

import { useModal } from 'hooks';
import { StoreModalProps } from 'types';

import { currencies } from './ChangePriceModal.mock';

import { ArrowDownBlueImg, CloseImg } from 'assets/img/icons';

import s from './ChangePriceModal.module.scss';

const ChangePriceModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState(currencies[0]);

  const handleChangeCurrency = (index: number) => {
    setCurrency(currencies[index]);
    setIsDropdownOpen(false);
  };

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0) {
      setError('price should be greater then 0');
    } else setError('');
    setPrice(e.target.value);
  };

  const handleSubmit = () => {};

  const showDropdown = () => (
    <Dropdown
      isVisible={isDropdownOpen}
      setVisible={setIsDropdownOpen}
      options={currencies}
      classname={s.currencies}
      controlClassname={s.currency}
      optionsClassname={s.currencies_list}
      handleClickOnOption={handleChangeCurrency}
    >
      <img src={currency.icon} alt="currency logo" />
      <div className={s.currency_name}>{currency.label}</div>
      <ArrowDownBlueImg className={isDropdownOpen ? s.arrow_up : s.arrow} />
    </Dropdown>
  );

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-title">Change price</div>
        <FormInput
          className={s.price_input}
          color="white"
          type="number"
          positiveOnly
          placeholder="Enter price"
          value={price}
          onChange={handleChangePrice}
          error={error}
          suffix={showDropdown()}
        />
        <div className={s.option}>
          <div className={s.option_name}>Service fee:</div>
          <div className={s.option_value}>5%</div>
        </div>
        <div className={s.option}>
          <div className={s.option_name}>You will receive:</div>
          <div className={s.option_value}>
            {+price * 0.95}&nbsp;{currency.label}
          </div>
        </div>
        <Button className={s.button} color="blue" disabled={!!error} onClick={handleSubmit}>
          Change price
        </Button>
        <Button className={cn(s.button, s.button_cancel)} color="white" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default memo(ChangePriceModal);
