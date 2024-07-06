import React from "react"
import {
    Navbar as NextUINavbar,
    Link,
    NavbarContent,
    NavbarMenuToggle,
    NavbarItem,
    Button,
    NavbarMenu,
    NavbarMenuItem,
    User,
    Avatar,
    Snippet,
} from "@nextui-org/react"
import { setIsMenuOpen, useAppDispatch, useAppSelector } from "../../../redux"
import { truncateString } from "../../../common"
import { AddressType } from "../../../features"

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

    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const accountsWithState = useAppSelector(
        (state) => state.authReducer.accountsWithState
    )

    const { accounts, state } = { ...accountsWithState }

    const getAddress = (): AddressType => {
        if (isKeyless) {
            if (!keylessAccount) return "0x"
            return keylessAccount?.accountAddress.toString()
        }
        return "0x"
    }

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
                    <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
                    </Button>
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
            </NavbarMenu>
        </NextUINavbar>
    )
}
