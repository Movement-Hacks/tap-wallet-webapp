import React, {
    PropsWithChildren,
    createContext,
    useMemo,
} from "react"
import { useUnityContext } from "react-unity-webgl"
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook"

const UNITY_PATH = "unity/Build"
const UNITY_NAME = "unity"

export interface PlayPageContextValue {
  unityContext: UnityContextHook;
}

export const PlayPageContext = createContext<PlayPageContextValue | null>(null)

export const PlayPageProvider = ({ children }: PropsWithChildren) => {
    const unityContext = useUnityContext({
        loaderUrl: `${UNITY_PATH}/${UNITY_NAME}.loader.js`,
        dataUrl: `${UNITY_PATH}/${UNITY_NAME}.data`,
        frameworkUrl: `${UNITY_PATH}/${UNITY_NAME}.framework.js`,
        codeUrl: `${UNITY_PATH}/${UNITY_NAME}.wasm`,
    })

    const playPageContextValue = useMemo(
        () => ({
            unityContext,
        }),
        [unityContext]
    )

    return (
        <PlayPageContext.Provider value={playPageContextValue}>
            {children}
        </PlayPageContext.Provider>
    )
}
