import axios from "axios";
import Qs from 'qs';


export function configureAxios () {
    axios.defaults.paramsSerializer = params => Qs.stringify(params, {arrayFormat: 'repeat'});
    axios.defaults.headers.common['accept'] = 'application/json';
}


export async function getBase(section, params) {
    try {
        return [true, (await axios.get(`/api/${section}/`, {params})).data];
    } catch (exception) {
        if (exception.response.status === 400)
            return [false, exception.response.data];

        return [false, 'Серверная ошибка'];
    }
}


export async function postBase(section, params) {
    let url = `/api/${section}/`;

    try {
        return [true, (await axios.post(url, params)).data];
    } catch (exception) {
        if (exception.response.status === 400)
            return [false, exception.response.data];

        return [false, {global: 'Серверная ошибка'}];
    }
}


/**
 * @param cases {{success: function, error: function}}
 * @returns {(function([*, *]): (*|undefined))|*}
 */
export function serviceInterface(cases) {
    return ([status, data]) => {
        if (status && cases.success)
            return cases.success(data);

        if (cases.error)
            cases.error(data);
    };
}
