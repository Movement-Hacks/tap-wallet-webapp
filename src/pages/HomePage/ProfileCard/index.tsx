import React from "react"
import {
    Button,
    Snippet,
    Card,
    CardBody,
    Tooltip,
    Spacer,
} from "@nextui-org/react"
import { useAppDispatch, useAppSelector } from "../../../redux"
import { truncateString } from "../../../common"
import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Gamepad2Icon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ProfileCard = () => {
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const accountsWithState = useAppSelector(
        (state) => state.authReducer.accountsWithState
    )
    const navigate = useNavigate()

    const { accounts, state } = { ...accountsWithState }

    const getAddress = () => {
        if (isKeyless) {
            return keylessAccount?.accountAddress.toString()
        }
    }

    return (
        <Card shadow="none" className="bg-primary/10">
            <CardBody className="p-4">
                <div>
                    <div className="font-bold text-2xl">STARCI</div>
                    <Snippet
                        codeString={getAddress()}
                        className="w-fit"
                        classNames={{
                            pre: "text-sm",
                            base: "bg-transparent p-0",
                            copyIcon: "!w-4 !h-4",
                        }}
                        hideSymbol
                        size="sm"
                    >
                        {truncateString(getAddress())}
                    </Snippet>
                </div>
                <Spacer y={6} />
                <div className="flex gap-4">
                    <Tooltip content="Transfer">
                        <Button
                            onPress={() => {
                                navigate("/transfer")
                            }}
                            isIconOnly
                            color="primary"
                            variant="flat"
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Swap">
                        <Button isIconOnly color="primary" variant="flat">
                            <ArrowPathIcon className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Play">
                        <Button isIconOnly color="primary" variant="flat">
                            <Gamepad2Icon strokeWidth={1.5} className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                </div>
            </CardBody>
        </Card>
    )
}
