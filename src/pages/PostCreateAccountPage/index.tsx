import React from "react"
import { useAppSelector } from "../../redux"
import { Button, Snippet } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

export const PostCreateAccountPage = () => {
    const mnemonic = useAppSelector(
        (state) => state.authReducer.mnemonic
    )
    const navigate = useNavigate()

    return (
        <div className="fit-container p-6 place-items-center grid">
            <div className="grid gap-12">
                <Snippet
                    hideSymbol
                    classNames={{ pre: "text-justify !whitespace-pre-line" }}
                    className="w-full"
                >
                    {mnemonic}
                </Snippet>
                <Button
                    color="primary"
                    className="w-full"
                    onPress={() => {
                        navigate("/create-password")
                    }}
                >
          Continue
                </Button>
            </div>
        </div>
    )
}
