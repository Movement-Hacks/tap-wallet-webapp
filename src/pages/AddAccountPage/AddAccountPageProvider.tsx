import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useMemo } from "react"
import * as Yup from "yup"
import {
    load,
    updateAccount,
    useAppDispatch,
    useAppSelector,
} from "../../redux"
import { createAccountFromMnemonic } from "../../features"
import { useNavigate } from "react-router-dom"

export interface FormikValue {
  accountIndex: number;
  name: string;
}

interface AddAccountPageContextValue {
  formik: FormikProps<FormikValue>;
}

const initialValues: FormikValue = {
    accountIndex: 0,
    name: "",
}

export const AddAccountPageContext =
  createContext<AddAccountPageContextValue | null>(null)

const WrappedAddAccountPageProvider = (props: {
  formik: FormikProps<FormikValue>;
  children: ReactNode;
}) => {
    const { children, formik } = props
    const addAccountPageContextValue: AddAccountPageContextValue = useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <AddAccountPageContext.Provider value={addAccountPageContextValue}>
            <Form
                className="w-full"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
            >
                {children}
            </Form>
        </AddAccountPageContext.Provider>
    )
}

export const AddAccountPageProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                accountIndex: Yup.number().required("Account index is required"),
                name: Yup.string().required("Name is required"),
            })}
            onSubmit={async ({ accountIndex, name }) => {
                if (!mnemonic) return
                const { account } = createAccountFromMnemonic(
                    mnemonic,
                    accountIndex,
                    name
                )
                dispatch(load())
                dispatch(updateAccount({ account, name, accountIndex }))
                navigate("/home")
            }}
        >
            {(formik) => (
                <WrappedAddAccountPageProvider formik={formik}>
                    {children}
                </WrappedAddAccountPageProvider>
            )}
        </Formik>
    )
}
