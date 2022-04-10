import { FC } from 'react';

import cn from 'classnames';
import Dialog from 'rc-dialog';

import 'rc-dialog/assets/index.css';
import s from './Modal.module.scss';

export interface ModalProps {
  className?: string;
  visible: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ className, visible, onClose, children }) => {
  return (
    <Dialog
      prefixCls="modal"
      zIndex={1000}
      destroyOnClose
      className={cn(s.modal_wrapper, visible ? s.visible : s.invisible, className)}
      closable={false}
      visible={visible}
      maskClosable
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
