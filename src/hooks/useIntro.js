import React, { useState, useContext } from 'react';

const IntroContext = React.createContext();

export const IntroProvider = ({ children }) => {
    const [ hidden, setHidden ] = useState(false);
    return (
        <IntroContext.Provider value={[ hidden, setHidden ]}>
            { children }
        </IntroContext.Provider>
    );
};

const useIntro = () => {
    const [ hidden, setHidden ] = useContext(IntroContext);

    const handleClick = () => {
        setHidden(true);
    };

    const showIntro = () => {
        setHidden(false);
    };

    return { hidden, handleClick, showIntro };


};

export default useIntro;