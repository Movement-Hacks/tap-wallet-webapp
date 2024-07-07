
export const truncateString = (
    string?: string,
    start: number = 4,
    end: number = 2
): string => {
    if (!string) return ""
    if (string.length <= start + end) return string
    const beginning = string.slice(0, start)
    const ending = end !== 0 ? string.slice(-end) : ""
    return `${beginning}...${ending}`
}
