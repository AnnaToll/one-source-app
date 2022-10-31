import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAuthorized } from './useAuthorized';
import { useLocalStorage } from './useLocalStorage';
import { useSessionStorage } from './useSessionStorage';
import { useLoginDisplay } from './useLoginDisplay';

export function useLogin() {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [, setLoggedIn] = useAuthorized();
    const setLocalStorage = useLocalStorage;
    const setSessionStorage = useSessionStorage;
    const [, toggleLoginDisplay] = useLoginDisplay();

    const login = (data) => {
        setError('');
        setSessionStorage('accessToken', data.accessToken); 
        setLocalStorage('expiration');
        const user = jwt_decode(data.accessToken);
        setSuccess(`Welcome ${user.name}! You are logged in.`);
        setLoggedIn(true);
        setTimeout(() => {
            toggleLoginDisplay();
            setSuccess('');
            navigate('/admin');
          }, 1300);
    };

    return [ login, success, error, setError ];
}