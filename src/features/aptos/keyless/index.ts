import { EphemeralKeyPair, Network } from "@aptos-labs/ts-sdk"
import { getLocalEphemeralKeyPair, storeEphemeralKeyPair } from "./store.keyless"
import { OpenIdProvider, providerMap } from "./constants.keyless"
import { getNonceFromJwt, parseJwtFromUrl } from "./jwt.keyless"
import { getAptos } from "../constants.aptos"

export const beginKeyless = (
    provider: OpenIdProvider = OpenIdProvider.Google
) => {
    const ephemeralKeyPair = EphemeralKeyPair.generate()
    storeEphemeralKeyPair(ephemeralKeyPair)

    const { getUrl } = providerMap[provider]
    const url = getUrl(ephemeralKeyPair.nonce)
    window.location.href = url
}

export const getKeylessAccount = async (network: Network = Network.DEVNET) => {
    const url = window.location.href
    const jwt = parseJwtFromUrl(url) 
    if (!jwt) throw new Error("Jwt not found.")
    const nonce = getNonceFromJwt(jwt)
    const ephemeralKeyPair = getLocalEphemeralKeyPair(nonce)
    if (!ephemeralKeyPair) throw new Error("Ephemeral key not found.")

    const aptos = getAptos(network)
    return await aptos.deriveKeylessAccount({
        jwt,
        ephemeralKeyPair,
    })
}
