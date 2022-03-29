import { FC, memo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import { Button, Modal } from '@/components';

import { useModal } from '@/hooks';
import { StoreModalProps } from '@/types';

import { CloseImg } from '@/assets/img/icons';
import {
  CopyShareImg,
  EmailShareImg,
  FacebookShareImg,
  TelegramShareImg,
  TwitterShareImg,
} from '@/assets/img/icons/share';

import s from './ShareNftModal.module.scss';

const ShareNftModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);

  const handleCopyLink = () => {
    toast.success('You have copied link to this NFT');
  };

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className={s.title}>Share This NFT</div>
      <div className={s.shares}>
        <div className={s.share}>
          <a
            className={s.share_btn}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={s.share_content}>
              <FacebookShareImg />
            </div>
          </a>
          <div className={s.share_title}>Facebook</div>
        </div>
        <div className={s.share}>
          <a
            className={s.share_btn}
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              window.location.href,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={s.share_content}>
              <TwitterShareImg />
            </div>
          </a>
          <div className={s.share_title}>Twitter</div>
        </div>
        <div className={s.share}>
          <a
            className={s.share_btn}
            href={`https://t.me/share/url?url=${window.location.href}&text=Look at this awesome NFT`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={s.share_content}>
              <TelegramShareImg />
            </div>
          </a>
          <div className={s.share_title}>Telegram</div>
        </div>
        <div className={s.share}>
          <a
            className={s.share_btn}
            href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to&su=Look+at+this+awesome+NFT&body=${window.location.href}&ui=2`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={s.share_content}>
              <EmailShareImg />
            </div>
          </a>
          <div className={s.share_title}>E-mail</div>
        </div>
        <div className={s.share}>
          <CopyToClipboard text={window.location.href} onCopy={handleCopyLink}>
            <div className={s.share_btn}>
              <div className={s.share_content}>
                <CopyShareImg />
              </div>
            </div>
          </CopyToClipboard>
          <div className={s.share_title}>Copy</div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ShareNftModal);
