import storageKeys from './storageKeys';
class Auth {
    static getSessionStorage(key) {
        return sessionStorage.getItem(storageKeys[key]);
    }
    static setSessionStorage(key, token) {
        sessionStorage.setItem(storageKeys[key],
            typeof token === 'object' ? JSON.stringify(token) : token);
    }
    static removeSessionStorage(key) {
        sessionStorage.removeItem(storageKeys[key]);
    }
    static getLocalStorage(key) {
        return localStorage[storageKeys[key]];
    }
    static setLocalStorage(key, value) {
        localStorage.setItem(storageKeys[key], value);
    }
    static removeLocalStorage(key) {
        localStorage.removeItem(storageKeys[key]);
    }
}

export default Auth;
