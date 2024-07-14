import React from "react"
import { GameCanvas } from "./GameCanvas"
import { PlayPageProvider } from "./PlayPageProvider"
const WrappedPlayPage = () => {
    return (
        <>
            <GameCanvas />
        </>
    )
}

export const PlayPage = () => {
    return (
        <PlayPageProvider>
            <WrappedPlayPage />
        </PlayPageProvider>
    )
}
