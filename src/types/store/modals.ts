// export enum Modals {
//   ConnectWallet = 'ConnectWallet',
//   Login = 'Login',
//   AvatarRequired = 'AvatarRequired',
//   none = '',
// }

export type ActiveModal = 'ConnectWallet' | 'Login' | 'AvatarRequired' | '';

export interface ModalState {
  activeModal: ActiveModal;
  visible: boolean;
}

export interface ModalsInitialState {
  modalState: ModalState;
}
