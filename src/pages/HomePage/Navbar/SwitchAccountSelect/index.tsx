import React from "react"
import { Select, SelectItem } from "@nextui-org/react"
import {
    updateAccount,
    useAppDispatch,
    useAppSelector,
} from "../../../../redux"
import { truncateString } from "../../../../common"
import { retrieveAccountFromMnemonic } from "../../../../features"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

export const SwitchAccountSelect = () => {
    const accounts = useAppSelector((state) => state.authReducer.accounts)
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)

    const activeAccountIndex = useAppSelector(
        (state) => state.authReducer.activeAccountIndex
    )

    const dispatch = useAppDispatch()

    const _accounts = Object.entries(accounts).map(([accountIndex, account]) => ({
        accountIndex,
        account,
    }))
    return (
        <Select
            items={_accounts}
            label=""
            classNames={{
                trigger: "!py-3.5 min-h-fit h-fit",
            }}
            variant="bordered"
            color="primary"
            selectedKeys={[activeAccountIndex?.toString() ?? "0"]}
            onSelectionChange={(selection) => {
                if (!selection) return
                if (selection === "all") return
                const accountIndex = Number.parseInt(
                    Array.from(selection.keys())[0]?.toString()
                )
                if (Number.isNaN(accountIndex)) return

                if (!mnemonic) return
                const { account, name } = retrieveAccountFromMnemonic(
                    mnemonic,
                    accountIndex
                )
                dispatch(
                    updateAccount({
                        account,
                        accountIndex,
                        name,
                    })
                )
            }}
            multiple={false}
            labelPlacement="outside"
            renderValue={(accounts) => {
                return accounts.map((account) => (
                    <div key={account.data?.accountIndex}>
                        <div className="font-bold text-primary text-base">
                            {account.data?.account.name}
                        </div>
                        <div className="text-foreground-400 text-sm flex gap-1 items-center">
                            <div>{account.data?.accountIndex}</div>
                            <ChevronRightIcon className="w-3.5 h-3.5" />
                            <div>
                                {truncateString(account.data?.account.accountAddress, 15, 5)}
                            </div>
                        </div>
                    </div>
                ))
            }}
        >
            {({ accountIndex, account }) => (
                <SelectItem key={accountIndex} textValue={accountIndex.toString()}>
                    <div>
                        <div className="font-bold text-base">
                            {account.name} {accountIndex}{" "}
                        </div>
                        <div className="text-foreground-400 text-sm flex gap-1 items-center">
                            <div>{accountIndex}</div>
                            <ChevronRightIcon className="w-3.5 h-3.5" />
                            <div>{truncateString(account.accountAddress, 15, 5)}</div>
                        </div>
                    </div>
                </SelectItem>
            )}
        </Select>
    )
}
