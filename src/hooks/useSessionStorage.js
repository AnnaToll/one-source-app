export function useSessionStorage(key, data) {
    if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
      }
      sessionStorage.setItem(key, data);

}