import React from "react"
import { Link } from "@nextui-org/react"
import { useAppSelector } from "../../redux"
import { truncateString } from "../../common"

export const HomePage = () => {
    const accountAddress = useAppSelector(state => state.authReducer.accountAddress)
    return <div className="fit-container p-6">
        <Link href="" showAnchorIcon isExternal>{truncateString(accountAddress?.toString())}</Link>
    </div>
}
