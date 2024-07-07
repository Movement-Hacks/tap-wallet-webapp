import { Select, SelectItem } from "@nextui-org/react"
import React from "react"
import { setNetwork, useAppDispatch, useAppSelector } from "../../../../redux"
import { Network } from "@aptos-labs/ts-sdk"
interface Item {
    key: Network;
    name: string;
  }

export const ChangeNetworkSelect = () => {
    const network = useAppSelector((state) => state.configReducer.network)
    const dispatch = useAppDispatch()

    const items: Array<Item> = [
        {
            key: Network.DEVNET,
            name: "Devnet",
        },
        {
            key: Network.TESTNET,
            name: "Testnet",
        },
        {
            key: Network.MAINNET,
            name: "Mainnet",
        },
    ]
    return (
        <Select
            className="w-[110px]"
            items={items}
            label=""
            selectedKeys={[network]}
            onSelectionChange={(selection) => {
                if (!selection) return
                if (selection === "all") return
                const networkKey = Array.from(selection.keys())[0]?.toString() as unknown as Network
                if (!networkKey) return
                dispatch(setNetwork({
                    network: networkKey
                }))
            }}
            multiple={false}
            labelPlacement="outside"
        >
            {({ key, name }) => (
                <SelectItem
                    key={key}
                >
                    {name}
                </SelectItem>
            )}
        </Select>
    )
}
