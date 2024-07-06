import React from "react"
import { store } from "./redux"
import { Provider as ReduxProvider } from "react-redux"
import { Link, NextUIProvider } from "@nextui-org/react"
import { RouterProvider } from "react-router-dom"
import { router } from "./route"
import { Buffer } from "buffer"
import { InitProvider } from "./hooks"
import toast, { Toaster } from "react-hot-toast"
import { Network } from "@aptos-labs/ts-sdk"
import { truncateString } from "./common"
import { ConfirmTransactionModal } from "./components"
import { HexType, buildExplorerUrl } from "./features"
window.Buffer = window.Buffer || Buffer

export interface ToastTransactionParams {
  isSuccess: boolean;
  transactionHash?: string;
  network?: Network;
}

export const toastTransaction = ({
    isSuccess,
    transactionHash,
    network
}: ToastTransactionParams) => {
    if (isSuccess) {
        toast.success(
            <div className="flex gap-2">
                <div className="text-sm">Txn:</div>
                <Link
                    size="sm"
                    showAnchorIcon
                    isExternal
                    href={buildExplorerUrl({
                        hex: transactionHash ?? "",
                        type: HexType.Transaction,
                        network: network ?? Network.DEVNET
                    })}
                >
                    {truncateString(transactionHash)}
                </Link>
        ,
            </div>,
            {
                duration: 10000,
            }
        )
    } else {
        toast.error("")
    }
}

export const App = () => {
    return (
        <ReduxProvider store={store}>
            <NextUIProvider>
                <div className="container">
                    <InitProvider>
                        <RouterProvider router={router} />
                        <Toaster />
                        <ConfirmTransactionModal />
                    </InitProvider>
                </div>
            </NextUIProvider>
        </ReduxProvider>
    )
}
