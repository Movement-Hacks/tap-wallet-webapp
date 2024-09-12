import React, { useEffect } from "react"
import {
    setIsFetchingBalance,
    updateBalances,
    useAppDispatch,
    useAppSelector,
} from "../../../../redux"
import { Image, Tooltip } from "@nextui-org/react"
import { getMovementAptosBalance } from "../../../../features"

import { computeDenomination, computeRaw } from "../../../../common"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { load } from "../../../../services"

export const TokensTab = () => {
    const tokens = useAppSelector((state) => state.homeReducer.tokens)
    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const account = useAppSelector((state) => state.authReducer.account)

    const network = useAppSelector((state) => state.configReducer.network)

    const dispatch = useAppDispatch()
    const refreshTokensAndNftsKey = useAppSelector(
        (state) => state.homeReducer.keys.refreshTokensAndNftsKey
    )

    const getAddress = () => {
        if (isKeyless) {
            if (!keylessAccount) return "0x"
            return keylessAccount.accountAddress.toString()
        } else {
            if (!account) return "0x"
            return account.accountAddress.toString()
        }
    }

    useEffect(() => {
        if (getAddress() === "0x") return
        const handleEffect = async () => {
            console.log("called")
            dispatch(
                setIsFetchingBalance({
                    isFetchingBalance: true,
                })
            )
            const address = getAddress()
            const tokenMap: Record<string, number> = {}
            console.log(tokens)
            for (const { key } of tokens) {
                try {
                    let balance = 0
                    if (key === "tAptos") {
                        let offchainBalance = 0
                        const { balance: _balance } = await load({
                            input: {
                                address
                            },
                            schema: {
                                balance: true
                            }
                        })
                        offchainBalance = _balance ?? 0
                        balance += computeRaw(offchainBalance)
                    } else {
                        balance = await getMovementAptosBalance(network, address)
                    }
                    tokenMap[key] = balance     
                } catch (ex) {
                    tokenMap[key] = 0
                }        
            }
            console.log("called2")
            dispatch(
                updateBalances({
                    tokenMap,
                })
            )
            dispatch(
                setIsFetchingBalance({
                    isFetchingBalance: false,
                })
            )
        }
        handleEffect()
    }, [refreshTokensAndNftsKey, dispatch, tokens, isKeyless, keylessAccount, account])

    return (
        <div className="flex flex-col gap-6">
            {tokens.map(({ key, name, symbol, imageUrl, balance }) => (
                <div key={key} className="p-4 bg-default-100 rounded-medium flex gap-4 items-center">
                    <Image src={imageUrl} removeWrapper className="w-10 h-10"/>
                    <div>
                        <div className="text-lg text-white flex gap-2 items-center"> 
                            <div>{name}</div>
                            <div>
                                {
                                    key === "tAptos" ?
                                        <Tooltip content="tAptosss"> 
                                            <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-primary"/>
                                        </Tooltip>
                                        : null
                                } </div>
                        </div>
                        <div className="text-foreground-400"> 
                            <div>{computeDenomination(balance)} {symbol} </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
