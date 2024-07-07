import toast from "react-hot-toast"

export const TOAST_DURATION = 10000
export const TOAST_ERROR_COLOR = "#F31260" //red
export const TOAST_SUCCESS_COLOR = "FBBF24" //amber

export const toastSuccess = (message: string | JSX.Element) =>
    toast.success(message, {
        duration: TOAST_DURATION,
        style: {
            color: TOAST_SUCCESS_COLOR,
        },
    })

export const toastError = (message: string | JSX.Element) =>
    toast.error(message, {
        duration: TOAST_DURATION,
        style: {
            color: TOAST_ERROR_COLOR,
        },
    })
