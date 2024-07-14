import { useCallback, useContext, useEffect } from "react"
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters"
import { PlayPageContext } from "../PlayPageProvider"
import { useAppSelector } from "../../../redux"
import { save } from "../../../services"

export enum GameAction {
  Save = "Save",
}
export const useListeners = () => {
    const { unityContext } = useContext(PlayPageContext)!
    const { addEventListener, removeEventListener, sendMessage } = unityContext

    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const account = useAppSelector((state) => state.authReducer.account)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )

    const _account = isKeyless ? keylessAccount : account

    const handleSendPayloadAsync = useCallback(
        async (
            action: ReactUnityEventParameter,
            payloadMessage: ReactUnityEventParameter
        ) => {
            if (!_account) return
            const _action = action as GameAction
            const _payloadMessge = payloadMessage?.toString() ?? ""
            switch (_action) {
            case GameAction.Save: {
                const publicKey = _account.publicKey.toString() ?? ""
                const signature = _account.sign(_payloadMessge).toString() ?? ""
                await save({
                    payloadMessage: _payloadMessge,
                    publicKey,
                    signature,
                })
                break
            }
            default:
                break
            }
        },
        [isKeyless, account, keylessAccount, sendMessage]
    )

    const handleSendPayload = useCallback(
        (
            action: ReactUnityEventParameter,
            payloadMessage: ReactUnityEventParameter
        ) => {
            handleSendPayloadAsync(action, payloadMessage)
        },
        [handleSendPayloadAsync]
    )

    useEffect(() => {
        addEventListener("SendPayload", handleSendPayload)
        return () => {
            removeEventListener("SendPayload", handleSendPayload)
        }
    }, [addEventListener, removeEventListener, handleSendPayload])
}
