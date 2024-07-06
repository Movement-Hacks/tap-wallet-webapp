import { Ed25519Account, KeylessAccount } from "@aptos-labs/ts-sdk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { AccountsWithState, getAccountsWithState } from "../../features"

interface AuthState {
  authenticated: boolean;
  isKeyless: boolean;
  keylessAccount?: KeylessAccount;
  account?: Ed25519Account;
  accountsWithState?: AccountsWithState;
}

const initialState: AuthState = {
    authenticated: false,
    isKeyless: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        connectKeyless: (
            state,
            action: PayloadAction<{ keylessAccount: KeylessAccount }>
        ) => {
            state.keylessAccount = action.payload.keylessAccount
            state.isKeyless = true
            state.authenticated = true
        },
        connect: (state, action: PayloadAction<{ account: Ed25519Account }>) => {
            state.account = action.payload.account
            state.isKeyless = false
            state.authenticated = true
        },
        disconnect: (state) => {
            state.authenticated = false
        },
        loadAccountsWithState: (state) => {
            state.accountsWithState = getAccountsWithState() ?? undefined
        }
    },
})

export const {
    connectKeyless,
    disconnect,
    connect,
    loadAccountsWithState,
} = authSlice.actions
export const authReducer = authSlice.reducer
