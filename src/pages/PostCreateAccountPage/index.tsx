import React from "react"
import { loadAccountsWithState, useAppDispatch, useAppSelector } from "../../redux"
import { Button, Snippet } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { getNextAccountIndex, storeAccount } from "../../features"

export const PostCreateAccountPage = () => {
    const account = useAppSelector((state) => state.authReducer.account)
    const mnemonic = useAppSelector(
        (state) => state.postCreateAccountReducer.mnemonic
    )
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <div className="fit-container p-6 place-items-center grid">
            <div className="grid gap-12">
                <Snippet hideSymbol classNames={{pre: "text-justify !whitespace-pre-line"}} className="w-full">
                    {mnemonic}
                </Snippet>
                <Button color="primary" className="w-full" onPress={() => {
                    const nextIndex = getNextAccountIndex()
                    if (!account) return
                    storeAccount(nextIndex, account)
                    dispatch(loadAccountsWithState())
                    navigate("/home")
                }}> Continue </Button>
            </div>       
        </div>
    )
}
