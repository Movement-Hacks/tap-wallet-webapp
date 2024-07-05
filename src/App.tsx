import React from "react"
import { store } from "./redux"
import { Provider as ReduxProvider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider } from "react-router-dom"
import { router } from "./route"

export const App = () => {
    return (
        <ReduxProvider store={store}>
            <NextUIProvider>
                <div className="container">
                    <RouterProvider router={router} />
                </div>
            </NextUIProvider>
        </ReduxProvider>
    )
}
