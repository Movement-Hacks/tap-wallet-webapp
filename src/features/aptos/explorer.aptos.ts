import { Network } from "@aptos-labs/ts-sdk"

const explorerUrl = "https://explorer.aptoslabs.com"

export enum HexType {
    Transaction,
    Account
}

export interface BuildExplorerUrlParams {
    type: HexType,
    hex: string,
    network: Network
}
export const buildExplorerUrl = ({type, hex, network}: BuildExplorerUrlParams) => {
    const path = type === HexType.Transaction ? "txn/" : "account/"

    const url = new URL(`${explorerUrl}/${path}`)
    
    url.pathname += hex
    switch (network) {
    case Network.DEVNET:
        url.searchParams.set("network", "devnet")
        break
    case Network.TESTNET:
        url.searchParams.set("network", "testnet")
        break
    case Network.MAINNET:
        url.searchParams.set("network", "mainnet")
        break
    default:
        break
    }

    return url.toString()
}
