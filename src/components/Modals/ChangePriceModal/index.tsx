import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import modalSelector from 'store/modals/selectors';
import { patchNftData } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';
import { PriceSelector } from 'containers';

import { Button, Calendar, FormInput, Modal, Spinner, Switcher } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { Currencies, RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const ChangePriceModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [activeTab, setActiveTab] = useState('Fixed Price');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [startAuction, setStartAuction] = useState(new Date());
  const [endAuction, setEndAuction] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );
  const { props } = useShallowSelector(modalSelector.getProp('modalState'));
  const [currency, setCurrency] = useState<Currencies | string>(props.currency || 'bnb');
  const { rates, fee, id: userId } = useShallowSelector(userSelector.getUser);
  const {
    isAucSelling,
    standart,
    royalty,
    creator,
    id: tokenId,
  } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const { [actionTypes.PATCH_NFT_DATA]: patchNftDataRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );
  const dispatch = useDispatch();
  const web3Provider = useWalletConnectorContext().walletService.Web3();

  const isActiveAuc = useMemo(
    () => !!isAucSelling && Date.now() - new Date(endAuction || '').getTime() < 0,
    [endAuction, isAucSelling],
  );

  const totalFee = useMemo(() => {
    return userId === creator?.id ? fee / 100 : (fee + +(royalty || 0)) / 100;
  }, [creator?.id, fee, royalty, userId]);

  const isPatchNftDataLoading = useMemo(
    () => patchNftDataRequestStatus === RequestStatus.REQUEST,
    [patchNftDataRequestStatus],
  );

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 0.001) {
      setError(
        `${activeTab === 'Fixed Price' ? 'Price' : 'Minimal bid'} can't be lower then 0.001`,
      );
    } else setError('');
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    if (tokenId) {
      const formData = new FormData();
      formData.append('selling', 'True');
      formData.append('currency', activeTab === 'Fixed Price' ? currency : 'rec');
      if (activeTab === 'Fixed Price') {
        formData.append('price', price);
      } else {
        if (!isActiveAuc) {
          formData.append(
            'start_auction',
            new BigNumber(startAuction.getTime()).div(1000).toFixed(0, 1),
          );
          formData.append(
            'end_auction',
            new BigNumber(endAuction.getTime()).div(1000).toFixed(0, 1),
          );
        }
        formData.append('minimal_bid', price);
      }

      dispatch(patchNftData({ patchType: 'change-price', id: tokenId, formData, web3Provider }));
    }
  };

  useEffect(() => {
    if (standart === 'ERC1155') setActiveTab('Fixed Price');
  }, [standart]);

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-title">Change price</div>
        <div className="modal-switcher">
          {standart !== 'ERC1155' && (
            <Switcher
              firstTab="Fixed Price"
              secondTab="Time Auction"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
        <FormInput
          color="white"
          type="number"
          positiveOnly
          placeholder={activeTab === 'Fixed Price' ? 'Enter price' : 'Enter minimal bid'}
          value={price}
          max={currency === 'bnb' && activeTab === 'Fixed Price' ? 100000 : 1000000000}
          onChange={handleChangePrice}
          error={error}
          suffix={
            <div className="modal-suffix">
              <PriceSelector
                isOpen={isDropdownOpen}
                setOpen={activeTab === 'Fixed Price' ? setIsDropdownOpen : () => {}}
                isStatic={activeTab !== 'Fixed Price'}
                currentCurrency={activeTab === 'Fixed Price' ? currency : 'rec'}
                setCurrentCurrency={setCurrency}
              />
              <span>
                {new BigNumber(
                  rates[activeTab === 'Fixed Price' && currency === 'bnb' ? 'bnb' : 'rec'],
                )
                  .times(price || 0)
                  .toFixed(3, 1)}
                &nbsp;$
              </span>
            </div>
          }
        />
        {activeTab === 'Time Auction' && !isActiveAuc && (
          <div className="modal-row">
            <Calendar
              name="startAuction"
              classname="modal-date-picker"
              date={startAuction}
              minDate={new Date()}
              handleChange={setStartAuction}
              label="Starting date"
              placeholder="Enter Date"
              disabled={isPatchNftDataLoading}
            />
            <Calendar
              name="endAuction"
              classname="modal-date-picker"
              date={endAuction}
              minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
              allowSameDay={false}
              handleChange={setEndAuction}
              label="Expiration date"
              placeholder="Enter Date"
              disabled={isPatchNftDataLoading}
            />
          </div>
        )}
        <div className="modal-box-option">
          <span className="modal-box-option-name">Service fee:</span>
          <span className="modal-box-option-value">{fee}%</span>
        </div>
        {userId !== creator?.id && (
          <div className="modal-box-option">
            <span className="modal-box-option-name">Creator royalties:</span>
            <span className="modal-box-option-value">{royalty || 0}%</span>
          </div>
        )}
        <div className="modal-box-option">
          <span className="modal-box-option-name">You will receive:</span>
          <span className="modal-box-option-value">
            {new BigNumber(price || 0)
              .times(new BigNumber(1).minus(totalFee).toString(10))
              .toString(10)}
            &nbsp;
            {activeTab === 'Fixed Price' ? currency.toUpperCase() : 'REC'}
          </span>
        </div>
        <Button
          className="modal-box-button"
          color="blue"
          disabled={!!error || isPatchNftDataLoading || !price}
          onClick={handleSubmit}
        >
          {isPatchNftDataLoading ? <Spinner color="blue" size="sm" /> : 'Change price'}
        </Button>
        <Button className="modal-box-button" color="bordered" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePriceModal;
