import React, { useContext, useEffect, useState } from "react"
import { Unity } from "react-unity-webgl"
import { PlayPageContext, PlayPageProvider } from "../PlayPageProvider"
import { useListeners } from "./useListeners"

const WrappedGameCanvas = () => {
    const { unityContext } = useContext(PlayPageContext)!
    const { unityProvider } = unityContext

    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    )

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

    return <Unity className="w-full h-full" unityProvider={unityProvider} />
}

export const GameCanvas = () => {
    return (
        <PlayPageProvider>
            <WrappedGameCanvas />
        </PlayPageProvider>
    )
}
