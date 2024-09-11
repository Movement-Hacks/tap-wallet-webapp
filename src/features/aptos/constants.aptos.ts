import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"

export const getAptos = (network: Network = Network.DEVNET) =>
    new Aptos(new AptosConfig({ network : Network.TESTNET }))

export type CoinType = `${string}::${string}::${string}`
export type AddressType = `0x${string}`
