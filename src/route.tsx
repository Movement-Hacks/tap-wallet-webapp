import React from "react"
import { createBrowserRouter } from "react-router-dom"
import { AuthPage } from "./pages"
import { GoogleOAuth2CallbackPage } from "./pages/GoogleOAuth2CallbackPage"
import { HomePage } from "./pages/HomePage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthPage/>,
    },
    {
        path: "/google-oath2-callback",
        element: <GoogleOAuth2CallbackPage/>,
    },
    {
        path: "/home",
        element: <HomePage/>,
    },
])