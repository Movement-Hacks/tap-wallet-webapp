import React, { useCallback, useEffect } from "react"
import {
    setIsFetchingBalance,
    updateBalances,
    useAppDispatch,
    useAppSelector,
} from "../../../../redux"
import { Image, Tooltip } from "@nextui-org/react"
import { getAptos } from "../../../../features"
import { load } from "../../../../services"
import { computeDenomination } from "../../../../common"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"

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

    const getAddress = useCallback(() => {
        if (isKeyless) {
            if (!keylessAccount) return "0x"
            return keylessAccount.accountAddress.toString()
        } else {
            if (!account) return "0x"
            return account.accountAddress.toString()
        }
    }, [isKeyless, keylessAccount, account])

    useEffect(() => {
        if (getAddress() === "0x") return
        const handleEffect = async () => {
            dispatch(
                setIsFetchingBalance({
                    isFetchingBalance: true,
                })
            )
            const address = getAddress()
            const tokenMap: Record<string, number> = {}
            const promises: Array<Promise<void>> = []
            for (const { key, coinType } of tokens) {
                const promise = async () => {
                    let balance = 0
                    try {
                        balance = await getAptos(network).getAccountCoinAmount({
                            accountAddress: address,
                            coinType
                        })
                    } catch(ex) {
                        console.log(ex)
                    } finally {
                        if (key === "tAptos") {
                            let offchainBalance = 0
                            try {
                                const { balance } = await load({
                                    input: {
                                        address
                                    },
                                    schema: {
                                        balance: true
                                    }
                                })
                                offchainBalance = balance ?? 0
                            } catch (ex) {
                                console.log(ex)
                            } finally {
                                balance += offchainBalance ?? 0
                            }
                        }
                        tokenMap[key] = balance
                    }
                }
                promises.push(promise())
            }
            await Promise.all(promises)

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
    }, [refreshTokensAndNftsKey, dispatch, tokens, getAddress])

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
