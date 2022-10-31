import ACTIONS from './actions';
import React, { useContext, useReducer } from 'react';

const initialState = {
    user: null,
    chatActive: null,
    sessionActive: false,
    inQueue: false,
    agentTyping: false,
    userTyping: false,
    messages: []
};


export const chatReducer = (state, action) => {

    if (action.type === ACTIONS.SET_CHAT_ONLINE) {
        return {
            ...state,
            chatActive: action.payload
        };
    }

    if (action.type === ACTIONS.ACTIVATE_SESSION) {
        return {
            ...state,
            sessionActive: true,
            user: action.payload
        };
    }

    if (action.type === ACTIONS.HANDLE_QUEUE) {
        return {
            ...state,
            inQueue: action.payload.queue,
            messages: [{
                type: 'other',
                msg: action.payload.msg 
            }]
        };
    }

    if (action.type === ACTIONS.AGENT_TYPING) {
        return {
            ...state,
            agentTyping: action.isTyping
        };
    }

    if (action.type === ACTIONS.USER_TYPING) {
        return {
            ...state,
            userTyping: action.isTyping
        };
    }

    if (action.type === ACTIONS.DEACTIVATE_SESSION) {
        return initialState;
    }

    if (action.type === ACTIONS.REPLACE) {
        return {
            ...state,
            messages: [{
                type: 'other',
                msg: action.msg 
            }]
        };
    }

    if (action.type === ACTIONS.APPEND) {
        let agentTyping = state.agentTyping;
        if (action.user === 'other') {
            agentTyping = false;
        }
        const messagesCopy = [ ...state.messages ];
        messagesCopy.push({
            type: action.user,
            msg: action.msg
        });
        return {
            ...state,
            agentTyping: agentTyping,
            messages: messagesCopy
        };
    } 

    else return state;

};

export const ChatContext = React.createContext();

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
    const [ chat, dispatch ] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{ chat: chat, dispatch: dispatch }} >
                { children }
        </ChatContext.Provider>
    );
};
