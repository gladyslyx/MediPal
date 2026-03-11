export function setAccessToken(token) {
    localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function clearAccessToken() {
    localStorage.removeItem('accessToken');
}

export function getNewAccessToken() {
}