import React from "react"
import { Divider, Image } from "@nextui-org/react"
import { ContinueWithGoogleButton } from "./ContinueWithGoogleButton"
import { CreateWalletButton } from "./CreateWalletButton"
import { ImportWalletButton } from "./ImportWalletButton"

export const AuthPage = () => {
    return (
        <div className="fit-container grid place-items-center p-6">
            <div className="grid gap-12 w-full">
                <Image src="/icons/logo.svg" alt="logo"/>
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <CreateWalletButton/>
                        <ImportWalletButton/>
                    </div> 
                    <div className="flex items-center gap-1">
                        <Divider className="flex-1"/>
                        <div className="text-sm text-divider"> OR </div>
                        <Divider className="flex-1"/>
                    </div>
                    <ContinueWithGoogleButton/>
                </div>
            </div>                      
        </div>
    )
}
