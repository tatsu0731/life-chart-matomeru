import { format } from "@formkit/tempo"

const date = new Date()

export const FullDate = () => {
    return format(date, "full")
}

export const DashDate = () => {
    return format(date, "YYYY-MM-DD", "ja")
}