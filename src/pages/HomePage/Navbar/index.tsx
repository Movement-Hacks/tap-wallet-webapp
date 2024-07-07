import React from "react"
import {
    Navbar as NextUINavbar,
    Link,
    NavbarContent,
    NavbarMenuToggle,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react"
import { setAuthenticated, setIsMenuOpen, setLock, useAppDispatch, useAppSelector } from "../../../redux"
import { ChangeNetworkSelect } from "./ChangeNetworkSelect"
export const Navbar = () => {
    const isMenuOpen = useAppSelector((state) => state.homeReducer.isMenuOpen)
    const dispatch = useAppDispatch()
    
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ]

    return (
        <NextUINavbar
            classNames={{ wrapper: "max-w-full" }}
            onMenuOpenChange={() =>
                dispatch(
                    setIsMenuOpen({
                        isMenuOpen: !isMenuOpen,
                    })
                )
            }
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ChangeNetworkSelect />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <Link as={"button"} onPress={() => {dispatch(setLock({
                    lock: true
                }))}} color="danger" size="sm">Log</Link>
                <Link as={"button"} onPress={() => {dispatch(setAuthenticated({
                    authenticated: false
                }))}} color="danger" size="sm">Sign Out</Link>
            </NavbarMenu>
        </NextUINavbar>
    )
}
