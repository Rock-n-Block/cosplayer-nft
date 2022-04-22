import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { patchNftData } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { Button, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const RemoveTokenModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const { detailedNft } = useShallowSelector(nftsSelector.getNfts);
  const { [actionTypes.PATCH_NFT_DATA]: patchNftDataRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const handleRemoveToken = () => {
    if (detailedNft.id) {
      const formData = new FormData();
      formData.append('selling', 'False');

      dispatch(patchNftData({ id: detailedNft.id, formData }));
    }
  };

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
        <Button
          color="blue"
          className="modal-box-button"
          disabled={patchNftDataRequestStatus === RequestStatus.REQUEST}
          onClick={handleRemoveToken}
        >
          {patchNftDataRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Remove now'
          )}
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveTokenModal;
