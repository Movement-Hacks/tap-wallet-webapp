import React, { useContext } from "react"
import { Button, Input, Spacer } from "@nextui-org/react"
import {
    AddAccountPageProvider,
    AddAccountPageContext,
} from "./AddAccountPageProvider"
import { useNavigate } from "react-router-dom"

const WrappedAddAccountPage = () => {
    const { formik } = useContext(AddAccountPageContext)!
    const navigate = useNavigate()

    return (
        <>
            <Input
                id="accountIndex"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.accountIndex.toString()}
                isRequired
                placeholder="69"
                labelPlacement="outside"
                label="Account Index"
                isInvalid={
                    !!(formik.touched.accountIndex && formik.errors.accountIndex)
                }
                errorMessage={formik.touched.accountIndex && formik.errors.accountIndex}
            />
            <Spacer y={4}/>
            <Input
                id="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                isRequired
                placeholder="StarCi handsome"
                labelPlacement="outside"
                label="Name"
                isInvalid={
                    !!(formik.touched.name && formik.errors.name)
                }
                errorMessage={formik.touched.name && formik.errors.name}
            />
            <Spacer y={12} />
            <div className="grid gap-2">
                <Button color="primary" fullWidth type="submit">
          Continue
                </Button>
                <Button
                    variant="bordered"
                    onPress={() => navigate("/home")}
                    color="primary"
                    fullWidth
                    type="submit"
                >
          Cancel
                </Button>
            </div>
        </>
    )
}

export const AddAccountPage = () => {
    return (
        <div className="fit-container p-6 place-items-center grid">
            <AddAccountPageProvider>
                <WrappedAddAccountPage />
            </AddAccountPageProvider>
        </div>
    )
}
