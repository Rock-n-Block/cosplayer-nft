import { FC } from 'react';

import { useDispatch } from 'react-redux';
import modalsSelector from 'store/modals/selectors';
import { deleteComment } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { Button, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const RemoveCommentModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const { id: tokenId } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const { props } = useShallowSelector(modalsSelector.getProp('modalState'));
  const { [actionTypes.DELETE_COMMENT]: deleteCommentRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const handleRemoveComment = () => {
    if (props.itemId && tokenId) {
      dispatch(deleteComment({ comment_id: props.itemId, tokenId }));
    }
  };

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button onClick={handleCloseModal} className="modal-close-btn">
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div>
          <div className="modal-title">Remove comment</div>
          <div className="modal-box-description">Do you really want to remove your comment?</div>
        </div>
        <Button
          color="red"
          className="modal-box-button"
          disabled={deleteCommentRequestStatus === RequestStatus.REQUEST}
          onClick={handleRemoveComment}
        >
          {deleteCommentRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Remove'
          )}
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveCommentModal;
