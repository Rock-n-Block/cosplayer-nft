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
  | 'Buy'
  | 'PlaceBid'
  | 'AcceptBid'
  | 'SupportTicket'
  | '';

export interface ModalState {
  activeModal: ActiveModal;
  props: {
    tokenId: number | string;
    amount: number | string;
    sellerId: string;
    quantity: number | string;
    currency: string;
  };
}

export interface ModalsInitialState {
  modalState: ModalState;
}
