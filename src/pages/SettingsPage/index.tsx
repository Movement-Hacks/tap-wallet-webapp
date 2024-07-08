import React from "react"
import {
    onMnemonicModalOpen,
    onPrivateKeyModalOpen,
    setAuthenticated,
    setLock,
    useAppDispatch,
    useAppSelector,
} from "../../redux"
import { SwitchAccountSelect } from "./SwitchAccountSelect"
import { Spacer, Link } from "@nextui-org/react"
import {
    ArrowLeftEndOnRectangleIcon,
    KeyIcon,
    LockClosedIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { MnemonicModal } from "./MnemonicModal"
import { PrivateKeyModal } from "./PrivateKeyModal"
import { SproutIcon } from "lucide-react"

export const SettingsPage = () => {
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return (
        <div className="fit-container p-6">
            <div>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">Settings</div>
                    <Link
                        color="foreground"
                        as="button"
                        onPress={() => {
                            navigate("/home")
                        }}
                    >
                        <XMarkIcon className="w-8 h-8" />
                    </Link>
                </div>

                <Spacer y={6} />
                {
                    <div className="grid gap-5">
                        {" "}
                        {!isKeyless ? (
                            <>
                                <div className="grid gap-4">
                                    <div className="text-xl"> Accounts </div>
                                    <div className="grid gap-4">
                                        <SwitchAccountSelect />
                                        <Link
                                            onPress={() => {
                                                navigate("/add-account")
                                            }}
                                            className="flex gap-2 items-center"
                                        >
                                            <PlusIcon className="w-5 h-5" />
                      Add Account
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="text-xl"> Security </div>
                                    <div className="grid gap-4">
                                        <Link
                                            as="button"
                                            onPress={() => {
                                                dispatch(onMnemonicModalOpen())
                                            }}
                                            className="flex gap-2 items-center"
                                        >
                                            <SproutIcon strokeWidth={3 / 2} className="w-5 h-5" />
                      Mnemonic
                                        </Link>
                                        <Link
                                            as="button"
                                            onPress={() => {
                                                dispatch(onPrivateKeyModalOpen())
                                            }}
                                            className="flex gap-2 items-center"
                                        >
                                            <KeyIcon className="w-5 h-5" />
                      Private Key
                                        </Link>
                                    </div>
                                </div>
                                <div />
                                <MnemonicModal />
                                <PrivateKeyModal />
                            </>
                        ) : (
                            <></>
                        )}
                        <div className="grid gap-4">
                            <div className="text-xl"> Other </div>
                            <div className="grid gap-4">
                                <Link
                                    as="button"
                                    color="danger"
                                    onPress={() => {
                                        dispatch(
                                            setLock({
                                                lock: true,
                                            })
                                        )
                                    }}
                                    className="flex gap-2 items-center"
                                >
                                    <LockClosedIcon className="w-5 h-5" />
                  Lock
                                </Link>
                                <Link
                                    as="button"
                                    color="danger"
                                    onPress={() => {
                                        dispatch(
                                            setAuthenticated({
                                                authenticated: false,
                                            })
                                        )
                                    }}
                                    className="flex gap-2 items-center"
                                >
                                    <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                  Sign Out
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
