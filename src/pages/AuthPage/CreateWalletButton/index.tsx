import React from "react"
import { Button } from "@nextui-org/react"
import { connect, setMnemonic, useAppDispatch } from "../../../redux"
import { useNavigate } from "react-router-dom"
import { generateMnemonic } from "bip39"
import {
    createAccountFromMnemonic,
    getNextAccountIndex,
} from "../../../features"

export const CreateWalletButton = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Button
            onPress={() => {
                const mnemonic = generateMnemonic(256)
                const nextIndex = getNextAccountIndex()
                const account = createAccountFromMnemonic(mnemonic, nextIndex)

                dispatch(
                    setMnemonic({
                        mnemonic,
                    })
                )
                dispatch(
                    connect({
                        account,
                    })
                )

                navigate("/post-create-account")
            }}
            fullWidth
            variant="flat"
        >
      Create Wallet
        </Button>
    )
}
