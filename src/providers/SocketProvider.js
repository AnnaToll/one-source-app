import React from 'react';
import { connect, io } from 'socket.io-client';

export const socketUser = io.connect(process.env.REACT_APP_API_ADDRESS);
export const socketAdm = io.connect(process.env.REACT_APP_API_ADDRESS);
export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socketUser: socketUser, socketAdm: socketAdm }}>
            { children }
        </SocketContext.Provider>
    );
};