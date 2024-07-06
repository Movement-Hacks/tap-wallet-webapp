import { Button, Tab, Tabs } from "@nextui-org/react"
import React from "react"
import {
    AssetsTab,
    refreshTokensAndNfts,
    setassetsTab,
    useAppDispatch,
    useAppSelector,
} from "../../../redux"
import { TokensTab } from "./TokensTab"
import { MoreHorizontalIcon, RefreshCcwIcon } from "lucide-react"
export const AssetsSection = () => {
    const assetsTab = useAppSelector((state) => state.homeReducer.assetsTab)
    const dispatch = useAppDispatch()

    const contentMap : Record<AssetsTab, JSX.Element> = {
        [AssetsTab.Tokens]: <TokensTab/>,
        [AssetsTab.NFTs]: <div/>
    }

    return (
        <div className="grid gap-6">
            <div className="w-full flex justify-between items-center">
                <Tabs
                    variant="underlined"
                    classNames={{
                        cursor: "p-0 w-full",
                        panel: "p-0 pt-4",
                    }}
                    color="primary"
                    aria-label="Options"
                    selectedKey={assetsTab}
                    onSelectionChange={(assetsTab) =>
                        dispatch(
                            setassetsTab({
                                assetsTab: assetsTab.toString() as unknown as AssetsTab,
                            })
                        )
                    }
                >
                    <Tab key="tokens" title="Tokens" />
                    <Tab key="nfts" title="NFTs" />
                </Tabs>
                <div className="gap-4">
                    <Button onPress={
                        () => {
                            dispatch(
                                refreshTokensAndNfts()
                            )
                        }
                    } isIconOnly variant="light" color="primary">
                        <RefreshCcwIcon className="w-5 h-5" strokeWidth={3 / 2} />
                    </Button>
                    <Button isIconOnly variant="light" color="primary">
                        <MoreHorizontalIcon className="w-5 h-5" strokeWidth={3 / 2} />
                    </Button>
                </div>
            </div>
            {contentMap[assetsTab]}
        </div>
    )
}
