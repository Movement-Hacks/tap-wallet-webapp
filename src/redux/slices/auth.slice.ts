import { Ed25519Account, KeylessAccount } from "@aptos-labs/ts-sdk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import {
    Accounts,
    getAccounts,
    getActiveAccountIndex,
    setAuthenticated as setStorageAuthenticated,
} from "../../features"

interface AuthState {
  authenticated: boolean;
  isKeyless: boolean;
  keylessAccount?: KeylessAccount;
  account?: Ed25519Account;
  password?: string;
  name: string;
  accounts: Accounts;
  activeAccountIndex?: number;
  mnemonic?: string;
  lock: boolean;
}

const initialState: AuthState = {
    authenticated: false,
    isKeyless: false,
    accounts: {},
    name: "",
    lock: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        connectKeyless: (
            state,
            action: PayloadAction<{ name: string; account: KeylessAccount }>
        ) => {
            state.keylessAccount = action.payload.account
            state.isKeyless = true
            state.authenticated = true
            state.name = action.payload.name
            state.lock = false
            setStorageAuthenticated(true)
        },
        connect: (
            state,
            action: PayloadAction<{ name: string; account: Ed25519Account }>
        ) => {
            state.account = action.payload.account
            state.isKeyless = false
            state.authenticated = true
            state.name = action.payload.name
            state.lock = false
            setStorageAuthenticated(true)
        },
        disconnect: (state) => {
            state.authenticated = false
            setStorageAuthenticated(false)
        },
        setPassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
        },
        setAuthenticated: (
            state,
            action: PayloadAction<{ authenticated: boolean }>
        ) => {
            state.authenticated = action.payload.authenticated
        },
        load: (state) => {
            state.accounts = getAccounts()
            state.activeAccountIndex = getActiveAccountIndex()
        },
        setLock: (state, action: PayloadAction<{ lock: boolean }>) => {
            state.lock = action.payload.lock
        },
        setActiveAccountIndex: (
            state,
            action: PayloadAction<{ activeAccountIndex: number }>
        ) => {
            state.activeAccountIndex = action.payload.activeAccountIndex
        },
        updateAccount: (
            state,
            action: PayloadAction<{
        account: Ed25519Account;
        accountIndex: number;
        name: string;
      }>
        ) => {
            state.account = action.payload.account
            state.name = action.payload.name
            state.activeAccountIndex = action.payload.accountIndex
        },
        setMnemonic: (state, action: PayloadAction<{ mnemonic: string }>) => {
            state.mnemonic = action.payload.mnemonic
        },
    },
})

export const {
    connectKeyless,
    disconnect,
    connect,
    load,
    setPassword,
    setLock,
    setAuthenticated,
    setActiveAccountIndex,
    setMnemonic,
    updateAccount,
} = authSlice.actions
export const authReducer = authSlice.reducer
