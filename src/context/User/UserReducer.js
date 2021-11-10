import { ADD_USER, GET_USERS, UPDATE_ACTUAL_USER } from '../types'


const messageReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return { ...state, userList: payload }
        case ADD_USER:
            const { _id, user } = payload;
            return {
                ...state,
                userList: [
                    ...state.messageList, { _id, user }
                ]
            }
        case UPDATE_ACTUAL_USER:
            return { ...state, actualUser: payload }
        default:
            return state;
    }
}

export default messageReducer;