import { useEffect } from 'react';
import ACTIONS from '../reducer/actions';
import { useChat } from '../reducer/chatReducer';

const useChatSocket = (socket, setShow) => {

    const { chat, dispatch } = useChat();

    const connected = () => {
        socket.emit('online-check');
    };
    
    const activateChat = () => {
        socket.emit('chat-user-start');
        socket.on('queue-data', data => {
            dispatch({
                type: ACTIONS.HANDLE_QUEUE,
                payload: {
                    queue: true,
                    msg: data.msg
                }
            }); 
            setTimeout(() => {
                socket.emit('chat-user-start');
            }, 10000);
        });
    };

    const deactivateQueue = () => {
        socket.off('queue-data');
    };

    useEffect(() => {
        if (chat.sessionActive) {
            activateChat();
        }
    }, [chat.sessionActive]);

    useEffect(() => {

        socket.on('online-res', isConnected => {
            if (isConnected) {
                dispatch({
                    type: ACTIONS.SET_CHAT_ONLINE,
                    payload: true
                });
            }
            else {                
                dispatch({
                    type: ACTIONS.SET_CHAT_ONLINE,
                    payload: false
                });
            }
        });
    
        socket.on('welcome-msg', message => {
            dispatch({
                type: ACTIONS.HANDLE_QUEUE,
                payload: {
                    queue: false,
                    msg: message
                }
            }); 
        });
    
        socket.on('message', message => {
            dispatch({
                type: ACTIONS.APPEND,
                user: 'other',
                msg: message
            });
        });

        socket.on('typing', isTyping => {
            dispatch({
                type: ACTIONS.AGENT_TYPING,
                isTyping: isTyping
            });
        });

        socket.on('disconnect-user', () => {
            dispatch({
                type: ACTIONS.DEACTIVATE_SESSION
            });
            setShow(false);
        });

        return () => {
            socket.off('queue-data');
            socket.off('online-res');
            socket.off('welcome-msg');
            socket.off('message');
            socket.off('typing');
            socket.off('disconnect-user');
        };

    }, []);

    const submitMessage = (message) => {
        socket.emit('message-user', `${chat.user}: ${message}`);
        dispatch({
            type: ACTIONS.APPEND,
            user: 'self',
            msg: `Me: ${message}`
        });
    };

    const submitTyping = (isTyping) => {
        socket.emit('typing-user', isTyping);
        dispatch({
            type: ACTIONS.USER_TYPING,
            isTyping: isTyping
        });
    };

    return [ submitMessage, submitTyping, connected, deactivateQueue ];

};

export default useChatSocket;