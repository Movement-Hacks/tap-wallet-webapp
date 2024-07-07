import { configureStore } from "@reduxjs/toolkit"
import {
    authReducer,
    configReducer,
    googleOAuth2CallbackReducer,
    homeReducer,
    modalsReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        authReducer,
        googleOAuth2CallbackReducer,
        homeReducer,
        configReducer,
        modalsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
