import React from "react"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

export const ImportWalletButton = () => {
    const navigate = useNavigate()
    return (
        <Button
            onPress={() => {
                navigate("/import-wallet")
            }}
            fullWidth
            variant="flat"
        >
      Import Wallet
        </Button>
    )
}
