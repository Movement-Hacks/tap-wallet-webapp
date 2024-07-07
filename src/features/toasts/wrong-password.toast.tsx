import React from "react"
import { toastError } from "./config.toast"

export const toastWrongPassword = () => {
    toastError(<div className="text-sm">Wrong password. Please try again.</div>)
}