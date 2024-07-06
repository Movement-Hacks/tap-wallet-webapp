import {
    Ed25519Account,
    Account as AptosAccount
} from "@aptos-labs/ts-sdk"
import { decode, encode } from "../encode-decode.aptos"

export const ACCOUNTS_WITH_STATE = "accounts-with-state"

export type Account = {
    account: Ed25519Account,
    name?: string,
}
export type Accounts = Record<number, Account>;
export interface AccountState {
  activeIndex?: number;
}

export interface AccountsWithState {
  accounts: Accounts;
  state: AccountState;
}

export const createAccountFromMnemonic = (mnemonic: string, index: number) => {
    const account = AptosAccount.fromDerivationPath({
        path: `m/44'/637'/0'/0'/${index}'`,
        mnemonic,
    })

    storeAccount(index, account)
    return account
}

export const getNextAccountIndex = () => {
    const accountsWithState = getAccountsWithState()
    if (!accountsWithState) return 0
    const { accounts } = accountsWithState
    if (!accounts) return 0

    const maxIndex = Number.parseInt(
        Object.keys(accounts).reduce((prev, next) =>
            Number.parseInt(next) > Number.parseInt(prev) ? next : prev
        )
    )
    return maxIndex + 1
}

export const storeAccount = (index: number, account: Ed25519Account) => {
    let accountsWithState = getAccountsWithState()

    if (!accountsWithState) {
        accountsWithState = {
            accounts: [],
            state: {},
        }
    }
    accountsWithState.accounts[index] = {
        account
    }
    accountsWithState.state.activeIndex = index
    setAccountsWithState(accountsWithState)
}

export const changeActiveAccount = (index: number) => {
    const accountsWithState = getAccountsWithState()
    if (!accountsWithState) return
    accountsWithState.state.activeIndex = index
    setAccountsWithState(accountsWithState)
}

export const getAccountsWithState = () => {
    const accountsWithState = localStorage.getItem(ACCOUNTS_WITH_STATE)
    return accountsWithState
        ? decode<AccountsWithState>(accountsWithState)
        : null
}

export const setAccountsWithState = (accountsWithState: AccountsWithState) => {
    localStorage.setItem(ACCOUNTS_WITH_STATE, encode(accountsWithState))
}
