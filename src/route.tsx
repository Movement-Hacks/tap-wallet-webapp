import React from "react"
import { createBrowserRouter } from "react-router-dom"
import {
    AuthPage,
    GoogleCallbackPage,
    HomePage,
    PostCreateAccountPage,
    ImportWalletPage,
    TransferPage,
    EnterPasswordPage,
    CreatePasswordPage,
    SettingsPage,
} from "./pages"
import { RootLayout } from "./layouts"
import { AddAccountPage } from "./pages/AddAccountPage"

export const router = createBrowserRouter([
    {   
        element: <RootLayout/>,
        children: [
            {
                path: "/auth",
                element: <AuthPage />,
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
                path: "/add-account",
                element: <AddAccountPage/>,
            },
            {
                path: "/settings",
                element: <SettingsPage/>,
            },
            {
                path: "*"
            }
        ]
    },
    {
        path: "/google-callback",
        element: <GoogleCallbackPage />,
    }
]
)
