import React from "react"
import { createBrowserRouter } from "react-router-dom"
import {
    AuthPage,
    GoogleOAuth2CallbackPage,
    HomePage,
    PostCreateAccountPage,
    ImportWalletPage,
    TransferPage
} from "./pages"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthPage />,
    },
    {
        path: "/google-oath2-callback",
        element: <GoogleOAuth2CallbackPage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/post-create-account",
        element: <PostCreateAccountPage />,
    },
    {
        path: "/import-wallet",
        element: <ImportWalletPage />,
    },
    {
        path: "/transfer",
        element: <TransferPage />,
    },
])

