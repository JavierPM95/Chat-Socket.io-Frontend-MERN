import React, { createContext, useReducer } from 'react'
import httpRequest from '../../utils/axios'
import userReducer from './UserReducer'

// States
const initialState = {
    userList: [{
        _id: null,
        user: null
    }],
    actualUser: {
        _id: '61722ab54add8aad7d11fa74',
        user: 'Javier'
    }
}

// Create Context
const UserContext = createContext(initialState);

// Actions & Provider
const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, initialState)

    const getUsers = async () => {
        try {
            const { data } = await httpRequest.get(`user`)
            if (!data.status) throw new Error(data.message);
            dispatch({
                type: 'GET_USERS',
                payload: data.content
            })
        } catch (error) {
            console.error(error)
        }
    }

    const addUser = async (dataToSend) => {
        try {
            const { data } = await httpRequest.post(`user`, dataToSend)
            if (!data.status) throw new Error(data.message);
            dispatch({
                type: 'ADD_USER',
                payload: data.content
            })
        } catch (error) {
            console.error(error)
        }
    }

    const updateActualUser = (user) => {
        dispatch({
            type: 'UPDATE_ACTUAL_USER',
            payload: user
        })
    }

    return (
        <UserContext.Provider
            value={{
                ...state,
                getUsers,
                addUser,
                updateActualUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}



export { UserContext, UserProvider }
