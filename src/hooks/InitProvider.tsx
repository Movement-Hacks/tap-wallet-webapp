import React, { PropsWithChildren, useEffect } from "react"
import { loadAccountsWithState, useAppDispatch } from "../redux"

export const InitProvider = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(loadAccountsWithState())
    }, [dispatch])

    return <> {children} </>
}
