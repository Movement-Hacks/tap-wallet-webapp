import { configureStore } from "@reduxjs/toolkit"
import {
    authReducer,
    configReducer,
    googleOAuth2CallbackReducer,
    homeReducer,
    postCreateAccountReducer,
    modalsReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        authReducer,
        googleOAuth2CallbackReducer,
        postCreateAccountReducer,
        homeReducer,
        configReducer,
        modalsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
