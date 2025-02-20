import { format } from "@formkit/tempo"

const date = new Date()

export const FullDate = () => {
    return format(date, "full")
}