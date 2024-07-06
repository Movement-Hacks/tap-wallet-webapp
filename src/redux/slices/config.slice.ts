import { Network } from "@aptos-labs/ts-sdk"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ConfigState {
  darkMode: boolean,
  network: Network
}

const initialState: ConfigState = {
    darkMode: false,
    network: Network.DEVNET
}

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setDarkMode: (
            state,
            action: PayloadAction<{ darkMode: boolean }>
        ) => {
            state.darkMode = action.payload.darkMode
        },
        setNetwork: (state, action: PayloadAction<{ network: Network }>) => {
            state.network = action.payload.network
        },
    },
})

export const { setDarkMode, setNetwork } =
configSlice.actions
export const configReducer = configSlice.reducer
