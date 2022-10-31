import { AuthContext } from '../providers/LoginProvider';
import { useContext } from 'react';

export function useAuthorized() {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    return [ loggedIn, setLoggedIn ];
}
