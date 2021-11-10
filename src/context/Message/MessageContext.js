import React, { createContext, useReducer } from 'react'
import httpRequest from '../../utils/axios'
import messageReducer from './MessageReducer'

// States
const initialState = {
    messageList: [{
        _id: null,
        user: null,
        chat: null,
        message: null,
    }]
}

// Create Context
const MessageContext = createContext(initialState);

// Actions & Provider
const MessageProvider = ({ children }) => {

    const [state, dispatch] = useReducer(messageReducer, initialState)

    const getMessages = async (chatId) => {
        try {
            const { data } = await httpRequest.get(`message/${chatId}`)
            if (!data.status) throw new Error(data.message);
            dispatch({
                type: 'GET_MESSAGES',
                payload: data.content
            })
        } catch (error) {
            console.error(error)
        }
    }

    const addMessages = async (dataToSend) => {
        try {
            const { data } = await httpRequest.post(`message`, dataToSend)
            if (!data.status) throw new Error(data.message);
            dispatch({
                type: 'ADD_MESSAGES',
                payload: data.content
            })
        } catch (error) {
            console.error(error)
        }
    }

    const updatedMessages = (message) => {
        dispatch({
            type: 'UPDATE_MESSAGE',
            payload: message
        })
    }

    return (
        <MessageContext.Provider
            value={{
                ...state,
                getMessages,
                addMessages,
                updatedMessages
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}



export { MessageContext, MessageProvider }
