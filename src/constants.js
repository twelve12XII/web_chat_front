import {getAuthHeader} from "./Auth";

export const serverUrl = 'http://localhost:8081';
export const postRequestWithFile = async<T>(url: string, object: any = null, auth: boolean = true) => {
    if(auth){
        auth = getAuthHeader();
    }
    console.log(object)
    const formdata = new FormData();
    // formdata.append("bucket", "ROADMAP");
    formdata.append("file", object, "[PROXY]");
    return await fetch(serverUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=something',
            ...(auth !== null && auth !== false && ({
                Authorization: 'Basic ' + auth
            }))
        },
        ...(object !== null && ({body: formdata})),
        // redirect: 'follow'
    }).then(response => response.text())
        .then(result => console.log(result))
        .catch(e => {
        console.log(e)
        throw e
    })
}
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