export function useLocalStorage(key, data) {
    if (localStorage.getItem('expiration')) {
        localStorage.removeItem('expiration');
    }
    if (key === 'expiration'){
        const expiration = Date.now() + (12 * 60 * 60 * 1000);
        localStorage.setItem(key, expiration);
    } else {
        localStorage.setItem(key, data);
    }
}