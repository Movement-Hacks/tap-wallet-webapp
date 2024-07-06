import React, { useCallback, useEffect } from "react"
import {
    setIsFetchingBalance,
    updateBalances,
    useAppDispatch,
    useAppSelector,
} from "../../../../redux"
import { User } from "@nextui-org/react"
import { computeDenomination } from "../../../../common"
import { getAptos } from "../../../../features"

export const TokensTab = () => {
    const tokens = useAppSelector((state) => state.homeReducer.tokens)

    const keylessAccount = useAppSelector(
        (state) => state.authReducer.keylessAccount
    )
    const isKeyless = useAppSelector((state) => state.authReducer.isKeyless)
    const network = useAppSelector((state) => state.configReducer.network)

    const dispatch = useAppDispatch()
    const refreshTokensAndNftsKey = useAppSelector(
        (state) => state.homeReducer.keys.refreshTokensAndNftsKey
    )

    const getAddress = useCallback(() => {
        if (isKeyless) {
            if (!keylessAccount) return "0x"
            return keylessAccount.accountAddress.toString()
        }
        return "0x"
    }, [isKeyless, keylessAccount])

    useEffect(() => {
        const handleEffect = async () => {
            dispatch(
                setIsFetchingBalance({
                    isFetchingBalance: true,
                })
            )
            const tokenMap: Record<string, number> = {}
            const promises: Array<Promise<void>> = []
            for (const { key, coinType } of tokens) {
                const promise = async () => {
                    const balance = await getAptos(network).getAccountCoinAmount({
                        accountAddress: getAddress(),
                        coinType,
                    })
                    tokenMap[key] = balance
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
        <div>
            {tokens.map(({ key, name, symbol, imageUrl, balance }) => (
                <div key={key}>
                    <User
                        avatarProps={{
                            src: imageUrl,
                            classNames: {
                                base: "bg-inherit",
                            },
                        }}
                        name={<div className="text-sm">{name}</div>}
                        description={`${computeDenomination(balance)} ${symbol}`}
                    />
                </div>
            ))}
        </div>
    )
}
