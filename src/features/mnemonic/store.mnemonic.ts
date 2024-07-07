import { decode, decrypt, encode, encrypt } from "../utils"

export interface EncryptedMnemonic {
  iv: string;
  encryptedData: string;
}

export const ENCRYPTED_MNEMONIC = "encrypted-mnemonic"

export interface StoreMnemonicParams {
  mnemonic: string;
  password: string;
}

export const storeMnemonic = ({ mnemonic, password }: StoreMnemonicParams) => {
    const { data, iv } = encrypt({
        data: mnemonic,
        key: password,
    })
    localStorage.setItem(ENCRYPTED_MNEMONIC, encode({ encryptedData: data, iv }))
}

export const loadMnemonic = (password: string) => {
    const encryptedMnemonic = localStorage.getItem(ENCRYPTED_MNEMONIC)
    if (!encryptedMnemonic) throw new Error("Encrypted mnemonic not found.")
    const { encryptedData, iv } = decode<EncryptedMnemonic>(encryptedMnemonic)
    return decrypt({
        key: password,
        encryptedData,
        iv,
    })
}

export const encryptedMnemonicExists = () => {
    return !!localStorage.getItem(ENCRYPTED_MNEMONIC)
}
