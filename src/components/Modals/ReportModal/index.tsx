import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { report } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { Button, FormInput, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const ReportModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const { id: tokenId } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const { [actionTypes.REPORT]: reportRequestStatus } = useShallowSelector(uiSelector.getUI);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleReport = () => {
    if (tokenId) {
      dispatch(report({ message, token: tokenId }));
    }
  };

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
          disabled={!message || reportRequestStatus === RequestStatus.REQUEST}
          onClick={handleReport}
        >
          {reportRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Send now'
          )}
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ReportModal;
