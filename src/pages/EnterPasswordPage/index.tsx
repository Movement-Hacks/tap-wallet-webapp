import React, { useContext, useState } from "react"
import { Button, Input, Spacer } from "@nextui-org/react"
import {
    EnterPasswordPageContext,
    EnterPasswordPageProvider,
} from "./EnterPasswordPageProvider"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"

const WrappedEnterPasswordPage = () => {
    const { formik } = useContext(EnterPasswordPageContext)!

    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <Input
                id="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                isRequired
                type={isVisible ? "text" : "password"}
                endContent={
                    <button onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? (
                            <EyeSlashIcon className="w-5 h-5 text-default-400" />
                        ) : (
                            <EyeIcon className="w-5 h-5 text-default-400" />
                        )}
                    </button>
                }
                placeholder="12345678"
                labelPlacement="outside"
                label="Password"
                isInvalid={!!(formik.touched.password && formik.errors.password)}
                errorMessage={formik.touched.password && formik.errors.password}
            />
            <Spacer y={12} />
            <Button color="primary" fullWidth type="submit">
        Continue
            </Button>
        </>
    )
}

export const EnterPasswordPage = () => {
    return (
        <div className="fit-container p-6 place-items-center grid">
            <EnterPasswordPageProvider>
                <WrappedEnterPasswordPage />
            </EnterPasswordPageProvider>
        </div>
    )
}
