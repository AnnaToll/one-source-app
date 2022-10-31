import { useContext } from 'react';
import { LoginDisplayContext } from '../providers/LoginProvider';

export function useLoginDisplay() {
    
    const { loginDisplay, setLoginDisplay } = useContext(LoginDisplayContext);

    const toggleLoginDisplay = () => {
      loginDisplay === 'hidden' ? setLoginDisplay('flex') : setLoginDisplay('hidden');
    };
    return [ loginDisplay, toggleLoginDisplay];
};