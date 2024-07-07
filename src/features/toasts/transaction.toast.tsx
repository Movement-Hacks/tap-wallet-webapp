import React from "react"
import { Network } from "@aptos-labs/ts-sdk"
import { HexType, buildExplorerUrl } from "../aptos"
import { Link } from "@nextui-org/react"
import { truncateString } from "../../common"
import { toastSuccess } from "./config.toast"

export interface ToastTransactionParams {
  transactionHash?: string;
  network?: Network;
}

export const toastTransaction = ({
    transactionHash,
    network,
}: ToastTransactionParams) => {
    toastSuccess(
        <div className="flex gap-2">
            <div className="text-sm">Txn:</div>
            <Link
                size="sm"
                showAnchorIcon
                isExternal
                href={buildExplorerUrl({
                    hex: transactionHash ?? "",
                    type: HexType.Transaction,
                    network: network ?? Network.DEVNET,
                })}
            >
                {truncateString(transactionHash)}
            </Link>
        </div>
    )
}
