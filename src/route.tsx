import React from "react"
import { createBrowserRouter } from "react-router-dom"
import {
    AuthPage,
    GoogleOAuth2CallbackPage,
    HomePage,
    PostCreateAccountPage,
    ImportWalletPage,
    TransferPage,
    EnterPasswordPage,
    CreatePasswordPage,
} from "./pages"
import { RootLayout } from "./layouts"

export const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path: "/auth",
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
            {
                path: "/create-password",
                element: <CreatePasswordPage />,
            },
            {
                path: "/enter-password",
                element: <EnterPasswordPage />,
            },
            {
                path: "*",
                element: <div>Not found</div>,
            },
        ]
    }
]
)
