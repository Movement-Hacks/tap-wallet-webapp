import { useCallback, useContext, useEffect } from "react"
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters"
import { PlayPageContext } from "../PlayPageProvider"
import { useAppSelector } from "../../../redux"

export enum GameAction {
    Save = "Save"
}
export const useListeners = () => {
    const { unityContext } = useContext(PlayPageContext)!
    const { addEventListener, removeEventListener, sendMessage } = unityContext

    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const account = useAppSelector((state) => state.authReducer.account)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )

    const handleSendPayload = useCallback(
        (action: ReactUnityEventParameter, payloadMessage: ReactUnityEventParameter) => {
            const _action = action as GameAction
            switch(_action) {
            case GameAction.Save: {
                console.log(payloadMessage)
                break
            }
            default: break
            }
        },
        [isKeyless, account, keylessAccount, sendMessage]
    )

    useEffect(() => {
        addEventListener("SendPayload", handleSendPayload)
        return () => {
            removeEventListener("SendPayload", handleSendPayload)
        }
    }, [addEventListener, removeEventListener, handleSendPayload])
}
