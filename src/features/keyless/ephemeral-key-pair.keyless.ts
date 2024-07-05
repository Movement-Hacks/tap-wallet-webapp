import { EphemeralKeyPair } from "@aptos-labs/ts-sdk"

export const EPHEMERAL_KEY_PAIRS_KEY = "ephemeral-key-pairs"
export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

export const storeEphemeralKeyPair = (
    ephemeralKeyPair: EphemeralKeyPair
): void => {
    const accounts = getLocalEphemeralKeyPairs()

    accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair
    localStorage.setItem(
        EPHEMERAL_KEY_PAIRS_KEY,
        encodeEphemeralKeyPairs(accounts)
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
        encodeEphemeralKeyPairs(keyPairs)
    )
}

export const getLocalEphemeralKeyPairs = (): StoredEphemeralKeyPairs => {
    const rawEphemeralKeyPairs = localStorage.getItem(EPHEMERAL_KEY_PAIRS_KEY)
    return rawEphemeralKeyPairs
        ? decodeEphemeralKeyPairs(rawEphemeralKeyPairs)
        : {}
}

const EphemeralKeyPairEncoding = {
    decode: (e: { data: Uint8Array }) => EphemeralKeyPair.fromBytes(e.data),
    encode: (e: EphemeralKeyPair) => ({
        __type: "EphemeralKeyPair",
        data: e.bcsToBytes(),
    }),
}

export const encodeEphemeralKeyPairs = (
    keyPairs: StoredEphemeralKeyPairs
): string =>
    JSON.stringify(keyPairs, (_, e) => {
        if (typeof e === "bigint") return { __type: "bigint", value: e.toString() }
        if (e instanceof Uint8Array)
            return { __type: "Uint8Array", value: Array.from(e) }
        if (e instanceof EphemeralKeyPair)
            return EphemeralKeyPairEncoding.encode(e)
        return e
    })

export const decodeEphemeralKeyPairs = (
    encodedEphemeralKeyPairs: string
): StoredEphemeralKeyPairs =>
    JSON.parse(encodedEphemeralKeyPairs, (_, e) => {
        if (e && e.__type === "bigint") return BigInt(e.value)
        if (e && e.__type === "Uint8Array") return new Uint8Array(e.value)
        if (e && e.__type === "EphemeralKeyPair")
            return EphemeralKeyPairEncoding.decode(e)
        return e
    })
