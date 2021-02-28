
import { format } from 'date-fns'

export function formatDate(date) {
    return format(date, 'kk:mm:ss')
}
