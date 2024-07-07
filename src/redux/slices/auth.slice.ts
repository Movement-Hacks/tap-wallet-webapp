import { Ed25519Account, KeylessAccount } from "@aptos-labs/ts-sdk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Accounts, getAccounts, getActiveAccountIndex, } from "../../features"

interface AuthState {
  authenticated: boolean;
  isKeyless: boolean;
  keylessAccount?: KeylessAccount;
  account?: Ed25519Account;
  password?: string
  name: string,
  accounts: Accounts,
  activeAccountIndex?: number
}

const initialState: AuthState = {
    authenticated: false,
    isKeyless: false,
    accounts: {},
    name: ""
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
        connect: (state, action: PayloadAction<{ name: string, account: Ed25519Account }>) => {
            state.account = action.payload.account
            state.isKeyless = false
            state.authenticated = true
            state.name = action.payload.name
        },
        disconnect: (state) => {
            state.authenticated = false
        },
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
        },
        load: (state) => {
            state.accounts = getAccounts()
            state.activeAccountIndex = getActiveAccountIndex()
        }
    },
})

export const {
    connectKeyless,
    disconnect,
    connect,
    load,
    setPassword
} = authSlice.actions
export const authReducer = authSlice.reducer
