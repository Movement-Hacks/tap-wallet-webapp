import React, { ReactNode, createContext, useMemo } from "react"
import { Form, Formik, FormikProps } from "formik"
import * as Yup from "yup"
import {
    loadMnemonic,
    retrieveAccountFromMnemonic,
    toastWrongPassword,
} from "../../features"
import { connect, useAppDispatch } from "../../redux"
import { useNavigate } from "react-router-dom"

export interface FormikValue {
  password: string;
}

interface EnterPasswordPageContextValue {
  formik: FormikProps<FormikValue>;
}

const initialValues: FormikValue = {
    password: "",
}

export const EnterPasswordPageContext =
  createContext<EnterPasswordPageContextValue | null>(null)

const WrappedEnterPasswordPageProvider = (props: {
  formik: FormikProps<FormikValue>;
  children: ReactNode;
}) => {
    const { children, formik } = props
    const enterPasswordPageContextValue: EnterPasswordPageContextValue = useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <EnterPasswordPageContext.Provider value={enterPasswordPageContextValue}>
            <Form
                className="w-full"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
            >
                {children}
            </Form>
        </EnterPasswordPageContext.Provider>
    )
}

export const EnterPasswordPageProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                password: Yup.string().required("Password is required"),
            })}
            onSubmit={async ({ password }) => {
                try {
                    const mnemonic = loadMnemonic(password)
                    const account = retrieveAccountFromMnemonic(mnemonic)
                    dispatch(connect(account))
                    navigate("/home")
                } catch (ex) {
                    toastWrongPassword()
                }
            }}
        >
            {(formik) => (
                <WrappedEnterPasswordPageProvider formik={formik}>
                    {children}
                </WrappedEnterPasswordPageProvider>
            )}
        </Formik>
    )
}
