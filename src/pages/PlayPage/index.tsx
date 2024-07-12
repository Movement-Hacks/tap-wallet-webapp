import React, { useEffect, useState } from "react"
import { Unity, useUnityContext } from "react-unity-webgl"

export const PlayPage = () => {
    const path = "unity/Build"
    const name = "unity"

    const { unityProvider } = useUnityContext({
        loaderUrl: `${path}/${name}.loader.js`,
        dataUrl: `${path}/${name}.data`,
        frameworkUrl: `${path}/${name}.framework.js`,
        codeUrl: `${path}/${name}.wasm`,
    })

    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    )
      
    useEffect(() => {
        const updateDevicePixelRatio = function () {
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

    return (
        <>
            <div className="h-screen w-screen">
                <Unity
                    matchWebGLToCanvasSize
                    unityProvider={unityProvider}
                    style={{ width: "100%", height: "100%" }}
                    devicePixelRatio={devicePixelRatio}
                />
            </div>
        </>
    )
}
