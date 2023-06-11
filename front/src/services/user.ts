import { getBase, postBase } from './core'


export async function getLogin() {
    return await getBase('login', {})
}


export async function login(username: string, password: string) {
    return await postBase('login', { username, password })
}


export async function register(username: string, password: string, confirm_password: string) {
    return await postBase('register', { username, password, confirm_password })
}


export async function logout() {
    return await postBase('logout', {})
}
