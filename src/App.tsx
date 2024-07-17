import React from "react"
import { store } from "./redux"
import { Provider as ReduxProvider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider } from "react-router-dom"
import { router } from "./route"
import { Buffer } from "buffer"
import { Toaster } from "react-hot-toast"
import { ConfirmTransactionModal } from "./components"
window.Buffer = window.Buffer || Buffer

export const App = () => {
    return (
        <ReduxProvider store={store}>
            <NextUIProvider>
                <div className="container bg-background text-foreground dark">
                    <RouterProvider router={router}  />
                    <Toaster />
                    <ConfirmTransactionModal />
                </div>
            </NextUIProvider>
        </ReduxProvider>
    )
}
