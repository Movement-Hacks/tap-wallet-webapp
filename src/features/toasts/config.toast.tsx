import React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"
export const TOAST_DURATION = 10000
export const TOAST_ERROR_COLOR = "#F31260" //red
export const TOAST_SUCCESS_COLOR = "#34d399" //teal

export const toastSuccess = (message: string | JSX.Element) => {
    const id = uuidv4()
    toast.success(
        <div className="flex gap-2 items-center">
            {message}
            <Link
                onPress={() => {
                    toast.dismiss(id)
                }}
            >
                <XMarkIcon className="w-5 h-5" />
            </Link>
        </div>,
        {
            id,
            duration: TOAST_DURATION,
            iconTheme: {
                primary: TOAST_SUCCESS_COLOR,
                secondary: "#fff",
            },
        }
    )
}

export const toastError = (message: string | JSX.Element) => {
    const id = uuidv4()
    toast.error(
        <div className="flex gap-2 items-center">
            {message}
            <Link
                color="danger"
                onPress={() => {
                    toast.dismiss(id)
                }}
            >
                <XMarkIcon className="w-5 h-5" />
            </Link>
        </div>,
        {
            id,
            duration: TOAST_DURATION,
            iconTheme: {
                primary: TOAST_ERROR_COLOR,
                secondary: "#fff",
            },
        }
    )
}
