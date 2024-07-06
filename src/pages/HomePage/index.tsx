import React from "react"
import { Navbar } from "./Navbar"
import { ProfileCard } from "./ProfileCard"
import { Spacer } from "@nextui-org/react"
import { AssetsSection } from "./AssetsSection"

export const HomePage = () => {
    return <div className="fit-container">
        <Navbar/>
        <div className="p-6">
            <ProfileCard/>
            <Spacer y={6}/>
            <AssetsSection/>
        </div>
    </div>
}
