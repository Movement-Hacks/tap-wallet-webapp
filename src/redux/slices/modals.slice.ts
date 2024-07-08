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
  privateKeyModal: {
    isOpen: boolean;
  },
  mnemonicModal: {
    isOpen: boolean
  }
}

const initialState: ModalState = {
    confirmTransactionModal: {
        isOpen: false,
        isSubmitting: false
    },
    mnemonicModal: {
        isOpen: false
    },
    privateKeyModal: {
        isOpen: false
    }
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
        onConfirmTransactionModalOpen: (
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
        onPrivateKeyModalOpenChange: (state) => {
            state.privateKeyModal.isOpen =
        !state.privateKeyModal.isOpen
        },
        onPrivateKeyModalClose: (state) => {
            state.privateKeyModal.isOpen = false
        },
        onPrivateKeyModalOpen: (
            state
        ) => {
            state.privateKeyModal.isOpen = true
        },
        onMnemonicModalOpenChange: (state) => {
            state.mnemonicModal.isOpen =
        !state.mnemonicModal.isOpen
        },
        onMnemonicModalClose: (state) => {
            state.mnemonicModal.isOpen = false
        },
        onMnemonicModalOpen: (
            state
        ) => {
            state.mnemonicModal.isOpen = true
        },
    },
})

export const {
    onConfirmTransactionModalOpenChange,
    onConfirmTransactionModalClose,
    onConfirmTransactionModalOpen,
    setIsConfirmTransactionModalSubmitting,
    onPrivateKeyModalOpenChange,
    onPrivateKeyModalClose,
    onPrivateKeyModalOpen,
    onMnemonicModalOpenChange,
    onMnemonicModalClose,
    onMnemonicModalOpen
} = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer
