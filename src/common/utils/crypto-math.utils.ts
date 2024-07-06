import numeral from "numeral"

export const computePercentage = (
    numerator: number,
    denominator: number,
    fractionDigits: number = 2
): number => {
    const fixed = ((numerator * 100) / denominator).toFixed(fractionDigits)
    return Number.parseFloat(fixed)
}

export const computeDenomination = (
    amount: number,
    decimals = 8,
    fractionDigits: number = 5
) => {
    const decimalMultiplier = 10 ** fractionDigits
    const divisor = 10 ** decimals
    const result = amount * decimalMultiplier / divisor
    return numeral(result / decimalMultiplier).format("0.0a")
}

export const computeRaw = (amount: number, decimals = 8): number => {
    const mutiplier = 10 ** decimals
    return Number.parseInt((amount * mutiplier).toFixed())
}
