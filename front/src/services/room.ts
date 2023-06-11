import { getBase, postBase } from './core'


export async function list(){
    return await getBase('room/list', {})
}


export async function create(){
    return await postBase('room', {})
}


export async function getRoom(uuid: string){
    return await getBase('room', { uuid })
}


export async function close(uuid: string){
    return await postBase('room/close', { uuid })
}
