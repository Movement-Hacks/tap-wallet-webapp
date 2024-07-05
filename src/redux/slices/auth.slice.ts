import { AccountAddress, KeylessAccount } from "@aptos-labs/ts-sdk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  authenticated: boolean;
  accountAddress?: AccountAddress;
  keylessAccount?: KeylessAccount;
}

const initialState: AuthState = {
    authenticated: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        connectKeyless: (
            state,
            action: PayloadAction<{ keylessAccount: KeylessAccount }>
        ) => {
            state.accountAddress = action.payload.keylessAccount.accountAddress
            state.keylessAccount = action.payload.keylessAccount
            state.authenticated = true
        },
        disconnectKeyless: (state) => {
            state.accountAddress = undefined
            state.keylessAccount = undefined
            state.authenticated = false
        },
    },
})

export const { connectKeyless, disconnectKeyless } = authSlice.actions
export const authReducer = authSlice.reducer
