export type ActiveModal =
  | 'ConnectWallet'
  | 'Login'
  | 'AvatarRequired'
  | 'UserInfo'
  | 'ShareNft'
  | 'ChangePrice'
  | 'BurnToken'
  | 'RemoveToken'
  | 'TransferToken'
  | 'Report'
  | 'PlaceBid'
  | 'SupportTicket'
  | '';

export interface ModalState {
  activeModal: ActiveModal;
  visible: boolean;
}

export interface ModalsInitialState {
  modalState: ModalState;
}
