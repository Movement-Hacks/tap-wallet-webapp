import React from "react"
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarItem,
    Link
} from "@nextui-org/react"
import { ChangeNetworkSelect } from "./ChangeNetworkSelect"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <NextUINavbar
            classNames={{ wrapper: "max-w-full" }}
        >
            <NavbarContent>
                <Link
                    color="foreground"
                    as="button"
                    onPress={() => {
                        navigate("/settings")
                    }}
                >
                    <Bars3Icon className="w-8 h-8" />
                </Link>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ChangeNetworkSelect />
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    )
}
