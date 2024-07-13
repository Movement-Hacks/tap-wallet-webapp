import { useContext, useEffect } from "react"
import { PlayPageContext } from "../PlayPageProvider"
import useSWR from "swr"
import { useAppSelector } from "../../../redux"
import { load } from "../../../services"

export const useLoad = () => {
    const { unityContext } = useContext(PlayPageContext)!
    const { sendMessage } = unityContext
    
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const account = useAppSelector((state) => state.authReducer.account)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const _account = isKeyless ? keylessAccount : account
    const address = _account?.accountAddress.toString() ?? ""

    const { data } = useSWR("LOAD", async () => {
        return await load({
            input: {
                address
            },
            schema: {
                totalBonus: true,
                balance: true,
            }
        })
    })

    console.log(data)

    useEffect(() => {
        if (!data) return
        sendMessage("Session", "Load", JSON.stringify({
            address,
            balance: data.balance,
            totalBonus: data.totalBonus
        }))
    }, [data, sendMessage])
}