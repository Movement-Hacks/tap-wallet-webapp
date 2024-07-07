import React from "react"
import {
    Navbar as NextUINavbar,
    Link,
    NavbarContent,
    NavbarMenuToggle,
    NavbarItem,
    NavbarMenu,
    Spacer,
} from "@nextui-org/react"
import { setAuthenticated, setIsMenuOpen, setLock, useAppDispatch, useAppSelector } from "../../../redux"
import { ChangeNetworkSelect } from "./ChangeNetworkSelect"
import { SwitchAccountSelect } from "./SwitchAccountSelect"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
export const Navbar = () => {
    const isMenuOpen = useAppSelector((state) => state.homeReducer.isMenuOpen)
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
                <div>
                    {
                        !isKeyless ? <SwitchAccountSelect/> : null
                    }
                    <Spacer y={4}/>
                    <Link as="button" onPress={() => navigate("/add-account")}>
                        <div className="flex items-center gap-2">
                            <PlusIcon className="w-5 h-5"/>
                            <div className="text-sm">Add Account</div>
                        </div>
                    </Link>
                </div> 
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
