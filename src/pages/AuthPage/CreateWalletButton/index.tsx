import React from "react"
import { Button } from "@nextui-org/react"
import { setMnemonic, useAppDispatch } from "../../../redux"
import { useNavigate } from "react-router-dom"
import { generateMnemonic } from "bip39"

export const CreateWalletButton = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Button
            onPress={() => {
                const mnemonic = generateMnemonic(256)
                dispatch(
                    setMnemonic({
                        mnemonic,
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
