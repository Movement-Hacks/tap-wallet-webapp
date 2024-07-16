import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { APTOS_COIN } from "@aptos-labs/ts-sdk"
import { CoinType } from "../../features"

export enum AssetsTab {
  Tokens = "tokens",
  NFTs = "nfts",
}

export interface Token {
  key: string;
  name: string;
  symbol: string;
  imageUrl: string;
  coinType: CoinType;
  balance: number;
}

interface HomeState {
  isMenuOpen: boolean;
  assetsTab: AssetsTab;
  tokens: Array<Token>;
  keys: {
    refreshTokensAndNftsKey?: string;
  };
  isFetchingBalance: boolean;
}

const initialState: HomeState = {
    isMenuOpen: false,
    assetsTab: AssetsTab.Tokens,
    tokens: [
        {
            key: "aptos",
            name: "Aptos",
            symbol: "APT",
            coinType: APTOS_COIN,
            imageUrl: "/icons/aptos.svg",
            balance: 0,
        },
        {
            key: "tAptos",
            name: "tAptos",
            symbol: "tAPT",
            coinType: "0x0::example::example",
            imageUrl: "/icons/taptos.png",
            balance: 0,
        },
    ],
    keys: {},
    isFetchingBalance: false,
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setIsMenuOpen: (state, action: PayloadAction<{ isMenuOpen: boolean }>) => {
            state.isMenuOpen = action.payload.isMenuOpen
        },
        setassetsTab: (state, action: PayloadAction<{ assetsTab: AssetsTab }>) => {
            state.assetsTab = action.payload.assetsTab
        },
        updateBalances: (
            state,
            action: PayloadAction<{ tokenMap: Record<string, number> }>
        ) => {
            const tokenKeys = Object.keys(action.payload.tokenMap)
            for (const key of tokenKeys) {
                const foundToken = state.tokens.find((token) => token.key === key)
                if (!foundToken) {
                    throw new Error(`Token with key ${key} not found.`)
                }
                foundToken.balance = action.payload.tokenMap[key]
            }
        },
        refreshTokensAndNfts: (state) => {
            state.keys.refreshTokensAndNftsKey = uuidv4()
        },
        setIsFetchingBalance: (
            state,
            action: PayloadAction<{ isFetchingBalance: boolean }>
        ) => {
            state.isFetchingBalance = action.payload.isFetchingBalance
        }
    },
})

export const {
    setIsMenuOpen,
    setassetsTab,
    updateBalances,
    refreshTokensAndNfts,
    setIsFetchingBalance
} = homeSlice.actions
export const homeReducer = homeSlice.reducer
