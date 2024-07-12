import React from "react"
import {
    Button,
    Snippet,
    Card,
    CardBody,
    Tooltip,
    Spacer,
} from "@nextui-org/react"
import { useAppSelector } from "../../../redux"
import { truncateString } from "../../../common"
import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Gamepad2Icon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ProfileCard = () => {
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const account = useAppSelector(
        (state) => state.authReducer.account
    )
    const name = useAppSelector(
        (state) => state.authReducer.name
    )
    const navigate = useNavigate()

    const getAddress = () => {
        if (isKeyless) {
            if (!keylessAccount) return "0x"
            return keylessAccount?.accountAddress.toString()
        } else {
            if (!account) return "0x"
            return account?.accountAddress.toString()
        }
    }

    return (
        <Card shadow="none" className="bg-primary/10">
            <CardBody className="p-4">
                <div>
                    <Tooltip content={name}>
                        <div className="font-bold text-2xl">{truncateString(name, 16, 0)}</div>
                    </Tooltip> 
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
                        <Button isIconOnly onPress={() => navigate("/play")} color="primary" variant="flat">
                            <Gamepad2Icon strokeWidth={3/2} className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                </div>
            </CardBody>
        </Card>
    )
}
