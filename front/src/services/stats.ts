import { getBase } from './core'


export async function getStats() {
    return await getBase('stats', {})
}