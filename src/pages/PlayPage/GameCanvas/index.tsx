import React, { useContext, useEffect, useState } from "react"
import { Unity } from "react-unity-webgl"
import { PlayPageContext, PlayPageProvider } from "../PlayPageProvider"
import { useListeners } from "./useListeners"
import { useLoad } from "./useLoad"
import { SWRConfig } from "swr"

const WrappedGameCanvas = () => {
    const { unityContext } = useContext(PlayPageContext)!
    const { unityProvider } = unityContext

    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    )

    useLoad()
    useListeners()

    useEffect(() => {
        const updateDevicePixelRatio = () => {
            setDevicePixelRatio(window.devicePixelRatio)
        }

        const mediaMatcher = window.matchMedia(
            `screen and (resolution: ${devicePixelRatio}dppx)`
        )
        mediaMatcher.addEventListener("change", updateDevicePixelRatio)
        return () => {
            mediaMatcher.removeEventListener("change", updateDevicePixelRatio)
        }
    },
    [devicePixelRatio]
    )

    return <Unity style={{
        width: "100%",
        height: "100%"
    }} unityProvider={unityProvider} />
}

export const GameCanvas = () => {
    return (
        <SWRConfig value={{ provider: () => new Map() }}>
            <PlayPageProvider>
                <WrappedGameCanvas />
            </PlayPageProvider>
        </SWRConfig>
      
    )
}
