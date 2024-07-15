import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
} from "@nextui-org/react"
import {
    onPrivateKeyModalOpenChange,
    useAppDispatch,
    useAppSelector,
} from "../../../redux"
import { DownloadIcon } from "lucide-react"
import { downloadJson } from "../../../common"

export const PrivateKeyModal = () => {
    const isOpen = useAppSelector(
        (state) => state.modalsReducer.privateKeyModal.isOpen
    )
    const account = useAppSelector((state) => state.authReducer.account)
    const dispatch = useAppDispatch()

    const privateKey = account?.privateKey.toString()
    return (
        <>
            <Modal
                onOpenChange={() => dispatch(onPrivateKeyModalOpenChange())}
                isOpen={isOpen}
            >
                <ModalContent>
                    <ModalHeader className="text-2xl font-bold p-6 pb-0">
            Private Key
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <Snippet
                            hideSymbol
                            classNames={{
                                pre: "!break-all !whitespace-pre-line",
                            }}
                            className="w-full"
                        >
                            {privateKey}
                        </Snippet>
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <Button
                            onPress={() =>
                                downloadJson({
                                    privateKey,
                                }, "private-key")
                            }
                            startContent={
                                <DownloadIcon strokeWidth={3 / 2} className="w-5 h-5" />
                            }
                            fullWidth
                            color="primary"
                        >
              Download
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
