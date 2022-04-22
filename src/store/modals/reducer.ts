import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalsInitialState, ModalState } from 'types';

const initialState: ModalsInitialState = {
  modalState: {
    activeModal: '',
    props: {
      tokenId: '',
      amount: 0,
      quantity: 0,
      sellerId: '',
      currency: '',
    },
  },
};

export const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModal: (state, action: PayloadAction<Partial<ModalState>>) => ({
      ...state,
      modalState: {
        ...state.modalState,
        ...action.payload,
      },
    }),

    closeModal: (state) => ({
      ...state,
      modalState: {
        ...initialState.modalState,
      },
    }),
  },
});

export const { setActiveModal, closeModal } = modalsReducer.actions;

export default modalsReducer.reducer;
