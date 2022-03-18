export type ActiveModal = 'ConnectWallet' | 'Login' | 'AvatarRequired' | 'UserInfo' | '';

export interface ModalState {
  activeModal: ActiveModal;
  visible: boolean;
}

export interface ModalsInitialState {
  modalState: ModalState;
}
