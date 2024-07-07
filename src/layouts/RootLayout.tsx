import React, { useEffect } from "react"
import { useAppDispatch } from "../redux"
import { Outlet, useNavigate } from "react-router-dom"
import { encryptedMnemonicExists } from "../features"

export const RootLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (encryptedMnemonicExists()) {
            navigate("/enter-password")
        } else {
            navigate("/auth")
        }
    }, [dispatch])

    return <Outlet />
}
