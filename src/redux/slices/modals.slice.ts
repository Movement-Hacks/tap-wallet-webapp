import { SimpleTransaction } from "@aptos-labs/ts-sdk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface SignedTransaction {
  functionName: string;
  payload: string;
  signature: string;
  transaction: SimpleTransaction;
  maxGas: string
}

interface ModalState {
  confirmTransactionModal: {
    isOpen: boolean;
    signedTransaction?: SignedTransaction;
    isSubmitting: boolean;
  };
}

const initialState: ModalState = {
    confirmTransactionModal: {
        isOpen: false,
        isSubmitting: false
    },
}

export const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        onConfirmTransactionModalOpenChange: (state) => {
            state.confirmTransactionModal.isOpen =
        !state.confirmTransactionModal.isOpen
        },
        onConfirmTransactionModalClose: (state) => {
            state.confirmTransactionModal.isOpen = false
        },
        openConfirmTransactionModal: (
            state,
            action: PayloadAction<{ signedTransaction: SignedTransaction }>
        ) => {
            state.confirmTransactionModal.isOpen = true
            state.confirmTransactionModal.signedTransaction =
        action.payload.signedTransaction
        },
        setIsConfirmTransactionModalSubmitting: (
            state,
            action: PayloadAction<{ isSubmitting: boolean }>
        ) => {
            state.confirmTransactionModal.isSubmitting = action.payload.isSubmitting
        },
    },
})

export const {
    onConfirmTransactionModalOpenChange,
    onConfirmTransactionModalClose,
    openConfirmTransactionModal,
    setIsConfirmTransactionModalSubmitting
} = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer
