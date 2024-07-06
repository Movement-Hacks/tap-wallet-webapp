import React, { useContext } from "react"
import { useAppSelector } from "../../redux"
import {
    Input,
    Select,
    SelectItem,
    Image,
    Button,
    Spacer,
} from "@nextui-org/react"
import {
    TransferModalContext,
    TransferModalProvider,
} from "./TransferModalProvider"
import { useNavigate } from "react-router-dom"

const WrappedTransferPage = () => {
    const tokens = useAppSelector((state) => state.homeReducer.tokens)
    const { formik } = useContext(TransferModalContext)!

    const navigate = useNavigate()

    return (
        <div className="p-6 justify-between flex flex-col h-screen">
            <div>
                <div className="text-2xl font-bold">Transfer</div>
                <Spacer y={6} />
                <div className="gap-4 grid">
                    <Input
                        id="recipientAddress"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.recipientAddress}
                        isRequired
                        placeholder="0xc0ffee"
                        labelPlacement="outside"
                        label="Recipient Address"
                        isInvalid={
                            !!(
                                formik.touched.recipientAddress &&
                formik.errors.recipientAddress
                            )
                        }
                        errorMessage={
                            formik.touched.recipientAddress && formik.errors.recipientAddress
                        }
                    />
                    <Input
                        id="transferAmount"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.transferAmount.toString()}
                        isRequired
                        placeholder="0"
                        labelPlacement="outside"
                        label="Transfer Amount"
                        endContent={
                            <div className="text-sm text-foreground-400">
                                {
                                    tokens.find(({ key }) => key === formik.values.tokenKey)
                                        ?.symbol
                                }
                            </div>
                        }
                        isInvalid={
                            !!(formik.touched.transferAmount && formik.errors.transferAmount)
                        }
                        errorMessage={
                            formik.touched.transferAmount && formik.errors.transferAmount
                        }
                    />
                    <Select
                        items={tokens}
                        label="Token"
                        selectedKeys={[formik.values.tokenKey]}
                        onSelectionChange={(selection) => {
                            if (selection === "all") return
                            const tokenKey = Array.from(selection.keys())[0].toString()
                            formik.setFieldValue("tokenKey", tokenKey)
                        }}
                        multiple={false}
                        startContent={
                            <Image
                                removeWrapper
                                src={
                                    tokens.find(({ key }) => key === formik.values.tokenKey)
                                        ?.imageUrl
                                }
                                className="min-w-5 w-5 h-5"
                            />
                        }
                        labelPlacement="outside"
                    >
                        {({ key, name, imageUrl }) => (
                            <SelectItem
                                key={key}
                                startContent={
                                    <Image removeWrapper src={imageUrl} className="w-5 h-5" />
                                }
                            >
                                {name}
                            </SelectItem>
                        )}
                    </Select>
                </div>
            </div>
            <div className="grid gap-2">
                <Button color="primary" onPress={() => formik.submitForm()} fullWidth>
          Transfer
                </Button>
                <Button
                    color="primary"
                    variant="bordered"
                    onPress={() => navigate("/home")}
                    fullWidth
                >
          Cancel
                </Button>
            </div>
        </div>
    )
}

export const TransferPage = () => {
    return (
        <TransferModalProvider>
            <WrappedTransferPage />
        </TransferModalProvider>
    )
}
