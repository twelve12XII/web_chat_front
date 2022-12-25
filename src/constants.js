import {getAuthHeader} from "./Auth";

export const serverUrl = 'http://localhost:12975';

export const postRequest = async<T>(url: string, object: any = null, auth: boolean = true) => {
    if(auth){
        auth = getAuthHeader();
    }
    return await fetch(serverUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            ...(auth !== null && auth !== false && ({
                Authorization: 'Basic ' + auth
            }))
        },
        ...(object !== null && ({
            body: JSON.stringify(object)
        }))
    }).catch(e => {
        console.log(e)
        throw e
    })
}
export const getRequest = async<T>(url: string, auth: boolean = true) => {
    if(auth){
        auth = getAuthHeader();
    }
    fetch(serverUrl + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            ...(auth !== null && ({
                Authorization: 'Basic ' + auth
            }))
        }
    })
}