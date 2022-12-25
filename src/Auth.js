export const getAuthHeader = () => {
    return localStorage.getItem('auth')
}

export const getUsername = () => {
    return atob(localStorage.getItem('auth')).split(':')[0];
}
export const setAuthHeader = (username: string, password: string) => {
    return localStorage.setItem('auth', btoa(username + ":" + password))
}