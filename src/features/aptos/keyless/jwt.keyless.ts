import { jwtDecode } from "jwt-decode"

export const parseJwtFromUrl = (url: string): string | null => {
    const urlObject = new URL(url)
    const fragment = urlObject.hash.substring(1)
    const params = new URLSearchParams(fragment)
    return params.get("id_token")
}

export const getNonceFromJwt = (jwt: string) : string => {
    const { nonce } = jwtDecode<{ nonce: string }>(jwt)
    return nonce
}