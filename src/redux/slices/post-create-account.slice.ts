import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface PostCreateAccountState {
  mnemonic: string
}

const initialState: PostCreateAccountState = {
    mnemonic: ""
}

export const postCreateAccountSlice = createSlice({
    name: "googleOAuth2Callback",
    initialState,
    reducers: {
        setMnemonic: (state, action: PayloadAction<{ mnemonic: string }>) => {
            state.mnemonic = action.payload.mnemonic
        },
    },
})

export const { setMnemonic } = postCreateAccountSlice.actions
export const postCreateAccountReducer = postCreateAccountSlice.reducer
