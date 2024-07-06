import React, { useContext } from "react"
import { Button, Spacer, Textarea } from "@nextui-org/react"
import {
    ImportWalletPageProvider,
    ImportWalletPageContext,
} from "./ImportWalletPageProvider"

const WrappedImportWalletPage = () => {
    const { formik } = useContext(ImportWalletPageContext)!

    return (
        <>
            <Textarea
                id="mnemonic"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mnemonic}
                isRequired
                placeholder="A rat in the house may eat the ice cream"
                labelPlacement="outside"
                label="Mnemonic"
                isInvalid={!!(formik.touched.mnemonic && formik.errors.mnemonic)}
                errorMessage={formik.touched.mnemonic && formik.errors.mnemonic}
            />
            <Spacer y={12} />
            <Button color="primary" fullWidth type="submit">
        Continue
            </Button>
        </>
    )
}

export const ImportWalletPage = () => {
    return (
        <div className="fit-container p-6 place-items-center grid">
            <ImportWalletPageProvider>
                <WrappedImportWalletPage />
            </ImportWalletPageProvider>
        </div>
    )
}
