import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface GoogleOAuth2CallbackState {
  isValidating: boolean,
  isValidated: boolean
}

const initialState: GoogleOAuth2CallbackState = {
    isValidating: true,
    isValidated: false
}

export const googleOAuth2CallbackSlice = createSlice({
    name: "googleOAuth2Callback",
    initialState,
    reducers: {
        setIsValidating: (state, action: PayloadAction<{ isValidating: boolean }>) => {
            state.isValidating = action.payload.isValidating
        },
        setIsValidated: (state, action: PayloadAction<{ isValidated: boolean }>) => {
            state.isValidated = action.payload.isValidated
        },
    },
})

export const { setIsValidating, setIsValidated } = googleOAuth2CallbackSlice.actions
export const googleOAuth2CallbackReducer = googleOAuth2CallbackSlice.reducer
