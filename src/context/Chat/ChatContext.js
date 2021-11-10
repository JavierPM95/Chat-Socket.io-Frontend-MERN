import React, { createContext, useReducer } from 'react'
import httpRequest from '../../utils/axios'
import chatReducer from './ChatReducer'

// States
const initialState = {
    chatList: [{
        _id: null,
        users: [{
            _id: null,
            name: null
        }],
        lastMessage: {
            _id: null,
            message: null
        }
    }],
    actualChat: {
        _id: null,
        users: [{
            _id: null,
            name: null
        }],
        lastMessage: {
            _id: null,
            message: null
        }
    }
}


// Create Context
const ChatContext = createContext(initialState);

// Actions & Provider
const ChatProvider = ({ children }) => {

    const [state, dispatch] = useReducer(chatReducer, initialState)
    const getChat = async (userId) => {
        try {
            const { data } = await httpRequest.get(`chat/${userId}`)
            if (!data.status) throw new Error(data.message);
            dispatch({
                type: 'GET_CHAT',
                payload: data.content
            })
        } catch (error) {
            console.error(error)
        }
    }

    const setActualChat = (chatId) => {
        const selected = state.chatList.find(chat => chat._id === chatId)

        dispatch({
            type: 'SET_CHAT',
            payload: selected
        })
    }

    return (
        <ChatContext.Provider
            value={{
                ...state,
                getChat,
                setActualChat
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}



export { ChatContext, ChatProvider }
