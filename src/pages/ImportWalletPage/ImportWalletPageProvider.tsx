import { Account } from "@aptos-labs/ts-sdk"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { connect, useAppDispatch } from "../../redux"

export interface FormikValue {
  mnemonic: string;
}

interface ImportWalletPageContextValue {
  formik: FormikProps<FormikValue>;
}

const initialValues: FormikValue = {
    mnemonic: "",
}

export const ImportWalletPageContext =
  createContext<ImportWalletPageContextValue | null>(null)

const WrappedImportWalletPageProvider = (props: {
  formik: FormikProps<FormikValue>;
  children: ReactNode;
}) => {
    const { children, formik } = props
    const importWalletPageContextValue: ImportWalletPageContextValue = useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <ImportWalletPageContext.Provider value={importWalletPageContextValue}>
            <Form
                className="w-full"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
            >
                {children}
            </Form>
        </ImportWalletPageContext.Provider>
    )
}

export const ImportWalletPageProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                mnemonic: Yup.string().required("Mnemonic is required"),
            })}
            onSubmit={async ({ mnemonic }) => {
                const account = Account.fromDerivationPath({
                    path: "m/44'/637'/0'/0'/0'",
                    mnemonic,
                })
                dispatch(
                    connect({
                        account,
                    })
                )
                navigate("/home")
            }}
        >
            {(formik) => (
                <WrappedImportWalletPageProvider formik={formik}>
                    {children}
                </WrappedImportWalletPageProvider>
            )}
        </Formik>
    )
}
