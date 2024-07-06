import React from "react"
import {
    onConfirmTransactionModalClose,
    onConfirmTransactionModalOpenChange,
    setIsConfirmTransactionModalSubmitting,
    useAppDispatch,
    useAppSelector,
} from "../../redux"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Code,
    Snippet,
} from "@nextui-org/react"
import { getAptos } from "../../features"
import { toastTransaction } from "../../App"

export const ConfirmTransactionModal = () => {
    const isOpen = useAppSelector(
        (state) => state.modalsReducer.confirmTransactionModal.isOpen
    )
    const isSubmitting = useAppSelector(
        (state) => state.modalsReducer.confirmTransactionModal.isSubmitting
    )
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const signedTransaction = useAppSelector(
        (state) => state.modalsReducer.confirmTransactionModal.signedTransaction
    )
    const network = useAppSelector((state) => state.configReducer.network)

    const { functionName, payload, signature, transaction, maxGas } = {
        ...signedTransaction,
    }
    const dispatch = useAppDispatch()

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={() => dispatch(onConfirmTransactionModalOpenChange())}
        >
            <ModalContent>
                <ModalHeader className="text-2xl font-bold p-6 pb-0">
          Submit Transaction
                </ModalHeader>
                <ModalBody className="p-6 grid gap-4">
                    <div className="grid gap-1.5">
                        <div className="text-sm">Function </div>
                        <Code> {functionName}</Code>
                    </div>
                    <div className="grid gap-1.5">
                        <div className="text-sm">Payload </div>
                        <Snippet
                            hideSymbol
                            codeString={payload}
                            classNames={{
                                pre: "!break-all !whitespace-pre-line line-clamp-3 !line-clamp-3",
                            }}
                        >
                            {payload}
                        </Snippet>
                    </div>
                    <div className="grid gap-1.5">
                        <div className="text-sm">Signature </div>
                        <Snippet
                            hideSymbol
                            codeString={signature}
                            classNames={{
                                pre: "!break-all !whitespace-pre-line !line-clamp-3",
                            }}
                        >
                            {signature}
                        </Snippet>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">Max gas </div>
                        <div className="text-sm font-semibold"> {maxGas} APT</div>
                    </div>
                </ModalBody>
                <ModalFooter className="p-6 pt-0 gap-2">
                    {isSubmitting ? (
                        <Button fullWidth isDisabled isLoading>
              Submitting...
                        </Button>
                    ) : (
                        <>
                            <Button
                                color="primary"
                                onPress={() => dispatch(onConfirmTransactionModalClose())}
                                variant="bordered"
                                fullWidth
                            >
                Cancel
                            </Button>
                            <Button
                                onPress={async () => {
                                    const signer = isKeyless ? keylessAccount : keylessAccount
                                    if (!signer) return
                                    if (!transaction) return

                                    try {
                                        dispatch(
                                            setIsConfirmTransactionModalSubmitting({
                                                isSubmitting: true,
                                            })
                                        )
                                        const aptos = getAptos(network)
                                        const { hash: transactionHash } =
                      await aptos.signAndSubmitTransaction({
                          transaction,
                          signer,
                      })
                                        await aptos.waitForTransaction({
                                            transactionHash,
                                        })
                                        toastTransaction({
                                            isSuccess: true,
                                            network,
                                            transactionHash,
                                        })
                                    } catch (ex) {
                                        toastTransaction({
                                            isSuccess: false,
                                            network,
                                        })
                                    } finally {
                                        dispatch(
                                            setIsConfirmTransactionModalSubmitting({
                                                isSubmitting: false,
                                            })
                                        )
                                        dispatch(onConfirmTransactionModalClose())
                                    }
                                }}
                                color="primary"
                                fullWidth
                            >
                Submit
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
