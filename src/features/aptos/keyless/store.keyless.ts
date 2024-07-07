import { EphemeralKeyPair } from "@aptos-labs/ts-sdk"
import { decode, encode } from "../../utils"

export const EPHEMERAL_KEY_PAIRS_KEY = "ephemeral-key-pairs"
export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

export const storeEphemeralKeyPair = (
    ephemeralKeyPair: EphemeralKeyPair
): void => {
    const accounts = getLocalEphemeralKeyPairs()

    accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair
    localStorage.setItem(
        EPHEMERAL_KEY_PAIRS_KEY,
        encode(accounts)
    )
}

export const getLocalEphemeralKeyPair = (
    nonce: string
): EphemeralKeyPair | null => {
    const keyPairs = getLocalEphemeralKeyPairs()

    const ephemeralKeyPair = keyPairs[nonce]
    if (!ephemeralKeyPair) return null

    return validateEphemeralKeyPair(nonce, ephemeralKeyPair)
}

export const validateEphemeralKeyPair = (
    nonce: string,
    ephemeralKeyPair: EphemeralKeyPair
): EphemeralKeyPair | null => {
    if (
        nonce === ephemeralKeyPair.nonce &&
    ephemeralKeyPair.expiryDateSecs > BigInt(Math.floor(Date.now() / 1000))
    ) {
        return ephemeralKeyPair
    }
    removeEphemeralKeyPair(nonce)
    return null
}

export const removeEphemeralKeyPair = (nonce: string): void => {
    const keyPairs = getLocalEphemeralKeyPairs()
    delete keyPairs[nonce]
    localStorage.setItem(
        EPHEMERAL_KEY_PAIRS_KEY,
        encode(keyPairs)
    )
}

export const getLocalEphemeralKeyPairs = (): StoredEphemeralKeyPairs => {
    const rawEphemeralKeyPairs = localStorage.getItem(EPHEMERAL_KEY_PAIRS_KEY)
    return rawEphemeralKeyPairs
        ? decode<StoredEphemeralKeyPairs>(rawEphemeralKeyPairs)
        : {}
}

