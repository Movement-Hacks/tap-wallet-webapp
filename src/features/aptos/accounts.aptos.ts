import { Account as AptosAccount } from "@aptos-labs/ts-sdk"
import { decode, encode } from "../utils"
import { AddressType } from "./constants.aptos"

export const ACCOUNTS = "accounts"
export const ACTIVE_ACCOUNT_INDEX = "active-account-index"

export interface Account {
  name: string;
  accountAddress: AddressType;
}
export type Accounts = Record<number, Account>;

export const createAccountFromMnemonic = (
    mnemonic: string,
    accountIndex: number,
    name?: string
) => {
    const account = AptosAccount.fromDerivationPath({
        path: `m/44'/637'/0'/0'/${accountIndex}'`,
        mnemonic,
    })
    const _name = name ?? `Account ${accountIndex}`
    storeAccount(accountIndex, {
        accountAddress: account.accountAddress.toString(),
        name: _name,
    })
    return {
        account,
        name: _name
    }
}

export const retrieveAccountFromMnemonic = (
    mnemonic: string,
    accountIndex?: number
) => {
    const accounts = getAccounts()
    const _accountIndex = accountIndex ?? getActiveAccountIndex()
    if (_accountIndex === undefined) throw new Error("Active account index not found.")
    const { name } = accounts[_accountIndex]

    const account = AptosAccount.fromDerivationPath({
        path: `m/44'/637'/0'/0'/${_accountIndex}'`,
        mnemonic,
    })

    return {
        account,
        name
    }
}

export const getNextAccountIndex = () => {
    const accounts = getAccounts()
    if (Object.keys(accounts)) return 0

    const maxIndex = Number.parseInt(
        Object.keys(accounts).reduce((prev, next) =>
            Number.parseInt(next) > Number.parseInt(prev) ? next : prev
        )
    )
    return maxIndex + 1
}

export const storeAccount = (accountIndex: number, account: Account) => {
    const accounts = getAccounts()
    accounts[accountIndex] = account
    setAccounts(accounts)
    setActiveAccountIndex(accountIndex)
}

export const getAccounts = () => {
    const accounts = localStorage.getItem(ACCOUNTS)
    return accounts ? decode<Accounts>(accounts) : {}
}

export const setAccounts = (accounts: Accounts) => {
    localStorage.setItem(ACCOUNTS, encode(accounts))
}

export const getActiveAccountIndex = () => {
    const activeAccountIndex = localStorage.getItem(ACTIVE_ACCOUNT_INDEX)
    return activeAccountIndex ? Number.parseInt(activeAccountIndex) : undefined
}

export const setActiveAccountIndex = (activeAccountIndex: number) => {
    localStorage.setItem(ACTIVE_ACCOUNT_INDEX, activeAccountIndex.toString())
}