import ACTIONS from './actions';
import React, { useContext, useReducer } from 'react';

const initialState = {
    active: false,
    agentTyping: false,
    userTyping: false,
    messages: []
};

export const chatAdmReducer = (state, action) => {

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
        let userTyping = state.userTyping;
        if (action.user === 'other') {
            userTyping = false;
        }
        const messagesCopy = [ ...state.messages ];
        messagesCopy.push({
            type: action.user,
            msg: action.msg
        });
        return {
            ...state,
            userTyping: userTyping,
            messages: messagesCopy
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

    if (action.type === ACTIONS.SET_ACTIVE) {
        return {
            ...state,
            active: action.isActive
        };
    }

    if (action.type === ACTIONS.CLEAR_MESSAGES) {
        return {
            ...state,
            messages: []
        };
    }

    if (action.type === ACTIONS.DEACTIVATE_SESSION) {
        return initialState;
    }

    else return state;
    
};

const ChatAdmContext = React.createContext();

export const useChatAdm = () => {
    return useContext(ChatAdmContext);
};

export const ChatAdmProvider = ({ children }) => {
    const [ chat, dispatch ] = useReducer(chatAdmReducer, initialState);

    return (
        <ChatAdmContext.Provider value={{ chat: chat, dispatch: dispatch }} >
                { children }
        </ChatAdmContext.Provider>
    );
};