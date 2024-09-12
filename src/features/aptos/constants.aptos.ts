import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import axios from "axios"

export const getAptos = (network: Network = Network.TESTNET) =>
    new Aptos(new AptosConfig({ network}))

export type CoinType = `${string}::${string}::${string}`
export type AddressType = `0x${string}`

export const getMovementAptosBalance = async (network: Network = Network.TESTNET, accountAddress: string) => {
    let url: string 
    switch (network) {
    case Network.TESTNET: {
        url = "https://aptos.testnet.suzuka.movementlabs.xyz/v1"
        break
    }
    case Network.DEVNET: {
        url = "https://aptos.devnet.suzuka.movementlabs.xyz/v1"
        break
    }
    case Network.MAINNET: {
        url = ""
        break
    }
    default : throw new Error(`Network not supported: ${network}`)
    } 
    const { data } = await axios.get(`${url}/accounts/${accountAddress}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`)
    return Number(data.data.coin.value)
}   