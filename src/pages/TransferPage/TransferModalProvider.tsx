import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"
import * as Yup from "yup"
import {
    openConfirmTransactionModal,
    useAppDispatch,
    useAppSelector,
} from "../../redux"
import { getAptos } from "../../features"
import { computeDenomination, computeRaw } from "../../common"

export interface FormikValue {
  recipientAddress: string;
  transferAmount: number;
  tokenKey: string;
}

interface TransferModalContextValue {
  formik: FormikProps<FormikValue>;
}

const initialValues: FormikValue = {
    recipientAddress: "",
    transferAmount: 0,
    tokenKey: "aptos",
}

export const TransferModalContext =
  createContext<TransferModalContextValue | null>(null)

const WrappedTransferModalProvider = (props: {
  formik: FormikProps<FormikValue>;
  children: ReactNode;
}) => {
    const { children, formik } = props
    const transferModalContextValue: TransferModalContextValue = useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <TransferModalContext.Provider value={transferModalContextValue}>
            <Form
                className="w-full"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
            >
                {children}
            </Form>
        </TransferModalContext.Provider>
    )
}

export const TransferModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const network = useAppSelector((state) => state.configReducer.network)
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const tokens = useAppSelector((state) => state.homeReducer.tokens)
    const dispatch = useAppDispatch()

    const getAddress = useCallback(() => {
        if (isKeyless) {
            if (!keylessAccount) return "0x"
            return keylessAccount.accountAddress.toString()
        }
        return "0x"
    }, [isKeyless, keylessAccount])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                recipientAddress: Yup.string().required("Recipient is required"),
                transferAmount: Yup.number()
                    .min(0)
                    .required("Transfer amount is required"),
            })}
            onSubmit={async ({ recipientAddress, transferAmount, tokenKey }) => {
                const aptos = getAptos(network)
                const transaction = await aptos.transferCoinTransaction({
                    sender: getAddress(),
                    recipient: recipientAddress,
                    amount: computeRaw(transferAmount),
                    coinType: tokens.find(({ key }) => key === tokenKey)?.coinType,
                })
                const signer = isKeyless ? keylessAccount : keylessAccount
                if (!signer) return

                const functionName = "aptos_account::transfer_coins"
                const payload = transaction.rawTransaction.payload
                    .bcsToHex()
                    .toString()
                const signature = signer.signTransaction(transaction).toString()
                const maxGas = computeDenomination(
                    Number(
                        transaction.rawTransaction.gas_unit_price *
              transaction.rawTransaction.max_gas_amount
                    )
                )
                dispatch(
                    openConfirmTransactionModal({
                        signedTransaction: {
                            functionName,
                            payload,
                            signature,
                            transaction,
                            maxGas
                        },
                    })
                )
            }}
        >
            {(formik) => (
                <WrappedTransferModalProvider formik={formik}>
                    {children}
                </WrappedTransferModalProvider>
            )}
        </Formik>
    )
}
