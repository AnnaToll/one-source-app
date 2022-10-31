import React, { useState } from 'react';

export const LoginDisplayContext = React.createContext();
export const AuthContext = React.createContext();

const LoginProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [loginDisplay, setLoginDisplay] = useState('hidden');

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <LoginDisplayContext.Provider value={{ loginDisplay, setLoginDisplay }} >
                { children }
            </LoginDisplayContext.Provider>
        </AuthContext.Provider>
    );
};

export default LoginProvider;

