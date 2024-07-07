import React, { ReactNode, createContext, useMemo } from "react"
import { Form, Formik, FormikProps } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { connect, load, useAppDispatch, useAppSelector } from "../../redux"
import {
    getNextAccountIndex,
    storeMnemonic,
    createAccountFromMnemonic,
} from "../../features"

export interface FormikValue {
  password: string;
}

interface CreatePasswordPageContextValue {
  formik: FormikProps<FormikValue>;
}

const initialValues: FormikValue = {
    password: "",
}

export const CreatePasswordPageContext =
  createContext<CreatePasswordPageContextValue | null>(null)

const WrappedCreatePasswordPageProvider = (props: {
  formik: FormikProps<FormikValue>;
  children: ReactNode;
}) => {
    const { children, formik } = props
    const createPasswordPageContextValue: CreatePasswordPageContextValue =
    useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <CreatePasswordPageContext.Provider value={createPasswordPageContextValue}>
            <Form
                className="w-full"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
            >
                {children}
            </Form>
        </CreatePasswordPageContext.Provider>
    )
}

export const CreatePasswordPageProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const mnemonic = useAppSelector(
        (state) => state.authReducer.mnemonic
    )

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                password: Yup.string().required("Password is required"),
            })}
            onSubmit={async ({ password }) => {
                if (!mnemonic) return
                storeMnemonic({
                    mnemonic,
                    password,
                })
                const accountIndex = getNextAccountIndex()
                const account = createAccountFromMnemonic(mnemonic, accountIndex)
                dispatch(connect(account))
                dispatch(load())
                navigate("/home")
            }}
        >
            {(formik) => (
                <WrappedCreatePasswordPageProvider formik={formik}>
                    {children}
                </WrappedCreatePasswordPageProvider>
            )}
        </Formik>
    )
}
