import { configureStore } from "@reduxjs/toolkit"
import { authReducer, googleOAuth2CallbackReducer } from "./slices"

export const store = configureStore({
    reducer: { authReducer, googleOAuth2CallbackReducer },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
