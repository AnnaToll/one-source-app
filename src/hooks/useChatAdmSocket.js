import { useEffect } from 'react';
import ACTIONS from '../reducer/actions';
import { useChatAdm } from '../reducer/chatAdmReducer';


const useChatAdmSocket = (socket) => {

    const { dispatch } = useChatAdm();

    const disconnect = () => {
        socket.emit('disconnect-chat');
        dispatch({
            type: ACTIONS.SET_ACTIVE,
            isActive: false
        });
    };

    const activate = () => {
        dispatch({
            type: ACTIONS.SET_ACTIVE,
            isActive: true
        });
    };

    const submitMessage = (msg) => {
        socket.emit('message-adm', msg);
        dispatch({
            type: ACTIONS.APPEND,
            user: 'self',
            msg: msg
        });
    };

    const nextUser = () => {
        socket.emit('next-user');
        dispatch({ type: ACTIONS.CLEAR_MESSAGES });
    };

    const submitTyping = (isTyping) => {
        socket.emit('typing-adm', isTyping);
        dispatch({
            type: ACTIONS.AGENT_TYPING,
            isTyping: isTyping
        });
    };

    const socketCleanUp = () => {
        socket.off('admin-connected');
        socket.off('message');
        socket.off('typing');
        socket.off('typing');
    };

    useEffect(() => {
        if (sessionStorage.getItem('support-key')) {
            socket.emit('check-admin-connection', parseInt(sessionStorage.getItem('support-key')));
            socket.on('admin-connected', isConnected => {
                dispatch({
                    type: ACTIONS.SET_ACTIVE,
                    isActive: isConnected
                });
            });
        }

        socket.on('message', msg => {
            dispatch({
                type: ACTIONS.APPEND,
                user: 'other',
                msg: msg
            });
        });

        socket.on('typing', isTyping => {
            dispatch({
                type: ACTIONS.USER_TYPING,
                isTyping: isTyping
            });
        });

    }, []);

    return [ activate, submitMessage, nextUser, submitTyping, disconnect, socketCleanUp ];
};

export default useChatAdmSocket;
