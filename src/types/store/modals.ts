export type ActiveModal =
  | 'ConnectWallet'
  | 'Login'
  | 'AvatarRequired'
  | 'UserInfo'
  | 'ShareNft'
  | 'ChangePrice'
  | '';

export interface ModalState {
  activeModal: ActiveModal;
  visible: boolean;
}

export interface ModalsInitialState {
  modalState: ModalState;
}
