import React, { useEffect, useRef } from "react"
import {
    load,
    setAuthenticated,
    setLock,
    useAppDispatch,
    useAppSelector,
} from "../redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { encryptedMnemonicExists, getAuthenticated } from "../features"

export const RootLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const authenticated = useAppSelector(
        (state) => state.authReducer.authenticated
    )
    const lock = useAppSelector((state) => state.authReducer.lock)
    const location = useLocation()

    const componentDidMount = useRef(false)

    useEffect(() => {
        try {
            if (authenticated) return

            if (getAuthenticated()) {
                dispatch(
                    setAuthenticated({
                        authenticated: true,
                    })
                )
            }
            if (encryptedMnemonicExists()) {
                dispatch(
                    setLock({
                        lock: true,
                    })
                )
            }
        } finally {
            componentDidMount.current = true
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(load())
    }, [dispatch])

    useEffect(() => {
        if (!componentDidMount.current) return
        if (!authenticated && location.pathname !== "auth") {
            navigate("/auth")
            return
        }
        if (lock && location.pathname !== "enter-password") {
            navigate("/enter-password")
            return
        }
    }, [navigate, authenticated, lock])

    return <Outlet />
}
