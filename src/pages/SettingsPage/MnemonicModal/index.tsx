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
    onMnemonicModalOpenChange,
    useAppDispatch,
    useAppSelector,
} from "../../../redux"
import { DownloadIcon } from "lucide-react"
import { downloadJson } from "../../../common"

export const MnemonicModal = () => {
    const isOpen = useAppSelector(
        (state) => state.modalsReducer.mnemonicModal.isOpen
    )
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const dispatch = useAppDispatch()

    return (
        <>
            <Modal
                onOpenChange={() => dispatch(onMnemonicModalOpenChange())}
                isOpen={isOpen}
            >
                <ModalContent>
                    <ModalHeader className="text-2xl font-bold p-6 pb-0">
            Mnemonic
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <Snippet
                            hideSymbol
                            classNames={{ pre: "text-justify !whitespace-pre-line" }}
                            className="w-full"
                        >
                            {mnemonic}
                        </Snippet>
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <Button
                            onPress={() =>
                                downloadJson(
                                    {
                                        mnemonic,
                                    },
                                    "mnemonic"
                                )
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
