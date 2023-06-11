import axios from 'axios'
import Qs from 'qs'


export function configureAxios () {
    axios.defaults.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'repeat' })
    axios.defaults.headers.common['accept'] = 'application/json'
}


export async function getBase(section: string, params: any): Promise<[false, string] | [true, any]> {
    try {
        return [true, (await axios.get(`/api/${section}/`, { params })).data]
    } catch (exception) {
        // @ts-ignore
        if (exception.response.status === 400)
            // @ts-ignore
            return [false, exception.response.data]

        return [false, 'Серверная ошибка']
    }
}


export async function postBase(section: string, params: any): Promise<[false, string] | [true, any]>  {
    const url = `/api/${section}/`

    try {
        return [true, (await axios.post(url, params)).data]
    } catch (exception) {
        // @ts-ignore
        if (exception.response.status === 400)
            // @ts-ignore
            return [false, exception.response.data]

        return [false, 'Серверная ошибка']
    }
}


/**
 * @param cases {{success: function, error: function}}
 * @returns {(function([*, *]): (*|undefined))|*}
 */
export function serviceInterface(cases: any) {
    return ([status, data]: any) => {
        if (status && cases.success)
            return cases.success(data)

        if (cases.error)
            cases.error(data)
    }
}
