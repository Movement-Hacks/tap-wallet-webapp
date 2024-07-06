import { EphemeralKeyPair } from "@aptos-labs/ts-sdk"

const EphemeralKeyPairEncoding = {
    decode: (e: { data: Uint8Array }) => EphemeralKeyPair.fromBytes(e.data),
    encode: (e: EphemeralKeyPair) => ({
        __type: "EphemeralKeyPair",
        data: e.bcsToBytes(),
    }),
}

export const encode = (
    data: unknown
): string =>
    JSON.stringify(data, (_, e) => {
        if (typeof e === "bigint") return { __type: "bigint", value: e.toString() }
        if (e instanceof Uint8Array)
            return { __type: "Uint8Array", value: Array.from(e) }
        if (e instanceof EphemeralKeyPair)
            return EphemeralKeyPairEncoding.encode(e)
        return e
    })

export const decode = <EncodedData> (
    data: string
): EncodedData =>
        JSON.parse(data, (_, e) => {
            if (e && e.__type === "bigint") return BigInt(e.value)
            if (e && e.__type === "Uint8Array") return new Uint8Array(e.value)
            if (e && e.__type === "EphemeralKeyPair")
                return EphemeralKeyPairEncoding.decode(e)
            return e
        })
