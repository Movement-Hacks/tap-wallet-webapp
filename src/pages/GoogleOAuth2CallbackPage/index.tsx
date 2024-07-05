import React, { useEffect } from "react"
import {
    connectKeyless,
    setIsValidated,
    setIsValidating,
    useAppDispatch,
    useAppSelector,
} from "../../redux"
import { Spinner } from "@nextui-org/react"
import { getKeylessAccount } from "../../features"
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

export const GoogleOAuth2CallbackPage = () => {
    const isValidating = useAppSelector(
        (state) => state.googleOAuth2CallbackReducer.isValidating
    )
    const isValidated = useAppSelector(
        (state) => state.googleOAuth2CallbackReducer.isValidated
    )

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleEffect = async () => {
            try {
                const keylessAccount = await getKeylessAccount()
                dispatch(
                    connectKeyless({
                        keylessAccount,
                    })
                )
                dispatch(
                    setIsValidated({
                        isValidated: true,
                    })
                )
            } catch (ex) {
                dispatch(
                    setIsValidated({
                        isValidated: false,
                    })
                )
            } finally {
                dispatch(
                    setIsValidating({
                        isValidating: false,
                    })
                )
            }
            
        }
        handleEffect()
    }, [dispatch])

    useEffect(() => {
        if (!isValidated) return 
        navigate("/home")
    }, [isValidated, navigate])

    return (
        <div className="fit-container grid place-items-center p-6">
            {isValidating ? (
                <Spinner label="Validating..." />
            ) : (
                isValidated ? (
                    <div className="grid place-items-center gap-1">
                        <CheckCircleIcon className="text-primary w-10 h-10"/>
                        <div className="text-sm">Validated. Redirecting ...</div>
                    </div>
                ) : (
                    <div className="grid place-items-center gap-1">
                        <ExclamationCircleIcon className="text-primary w-10 h-10"/>
                        <div className="text-sm">Invalidated. Please try again.</div>
                    </div>
                )
            )     
            }
        </div>
    )
}
