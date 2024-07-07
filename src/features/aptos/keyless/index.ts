import { EphemeralKeyPair, Network } from "@aptos-labs/ts-sdk"
import { getLocalEphemeralKeyPair, storeEphemeralKeyPair } from "./store.keyless"
import { OpenIdProvider, providerMap } from "./constants.keyless"
import { getDecodedJwtPayload, parseJwtFromUrl } from "./jwt.keyless"
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
    const { email, nonce } = getDecodedJwtPayload(jwt)
    const ephemeralKeyPair = getLocalEphemeralKeyPair(nonce)
    if (!ephemeralKeyPair) throw new Error("Ephemeral key not found.")

    const aptos = getAptos(network)
    const account = await aptos.deriveKeylessAccount({
        jwt,
        ephemeralKeyPair,
    })
    return {
        account,
        name: email
    }
}
