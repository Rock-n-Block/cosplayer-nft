import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import modalSelector from 'store/modals/selectors';

import { Button, Modal } from 'components';

import { routes } from 'appConstants';
import { useModal, useShallowSelector } from 'hooks';
import { StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const MintSuccessModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const navigate = useNavigate();
  const { props } = useShallowSelector(modalSelector.getProp('modalState'));

  const handleNavigateToNft = () => {
    if (props.tokenId) {
      handleCloseModal();
      navigate(routes.nft.link(props.tokenId));
    }
  };

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button onClick={handleCloseModal} className="modal-close-btn">
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div>
          <div className="modal-title">Your token has been minted</div>
          <div className="modal-box-description">
            Congratulations, you have successfully minted your token! Now token is live on
            CosplayerNFT platform for the world to see.
          </div>
        </div>
        <Button color="blue" className="modal-box-button" onClick={handleNavigateToNft}>
          View Post
        </Button>
      </div>
    </Modal>
  );
};

export default MintSuccessModal;
