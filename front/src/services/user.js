import {getBase, postBase} from "./core";


export async function getLogin() {
    return await getBase('login')
}


export async function login(username, password) {
    return await postBase('login', {username, password})
}


export async function register(username, password, confirm_password) {
    return await postBase('register', {username, password, confirm_password})
}


export async function logout() {
    return await postBase('logout')
}
