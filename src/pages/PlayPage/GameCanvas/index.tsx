import React, { useContext, useEffect, useState } from "react"
import { Unity } from "react-unity-webgl"
import { PlayPageContext, PlayPageProvider } from "../PlayPageProvider"
import { useListeners } from "./useListeners"
import { useLoad } from "./useLoad"
import { SWRConfig } from "swr"
import { Spinner } from "@nextui-org/react"

const WrappedGameCanvas = () => {
    const { unityContext } = useContext(PlayPageContext)!
    const { unityProvider, isLoaded } = unityContext

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
    }, [devicePixelRatio])

    return (
        <div className="w-full h-full relative">
            {!isLoaded ? (
                <div className="w-full h-full absolute grid place-items-center">
                    <Spinner size="lg" label="Game loading..." />
                </div>
            ) : null}

            <Unity
                style={{
                    width: "100%",
                    height: "100%",
                }}
                unityProvider={unityProvider}
                devicePixelRatio={devicePixelRatio}
            />
        </div>
    )
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
