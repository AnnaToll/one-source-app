import { useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuthorized } from './useAuthorized';

export function useJWT() {

    const [ , setLoggedIn ] = useAuthorized(); 

    const getNewToken = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/refresh`, { credentials: 'include' });
        const data = await response.json();
        if (sessionStorage.getItem('accessToken')) {
          sessionStorage.removeItem('accessToken');
        }
        if (response.status === 200) {
          sessionStorage.setItem('accessToken', data.accessToken);
          setLoggedIn(true);
        } else {
          if (localStorage.getItem('expiration')) {
            localStorage.removeItem('expiration');
          }
          setLoggedIn(false);
        }
      };
    
      const checkExpiration = async () => {
        if (localStorage.getItem('expiration')) {
          const now = Date.now();
          if (now < localStorage.getItem('expiration')) {
            if (sessionStorage.getItem('accessToken')) {
              const token = jwt_decode(sessionStorage.getItem('accessToken'));
              if (now < token.exp * 1000) {
                setLoggedIn(true);
              } else {
                await getNewToken();
              }
            } else {
              await getNewToken();
            }
          }
        }
      };
    
      const checkExpirationTimeout = useCallback(() => {
        setTimeout(() => {
          checkExpiration();
          checkExpirationTimeout();
        }, 60 * 60 * 1000);
      });
      
      return [ checkExpiration, checkExpirationTimeout ];
    
}