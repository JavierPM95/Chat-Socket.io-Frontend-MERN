import { GET_MESSAGES, ADD_MESSAGES, UPDATE_MESSAGE } from '../types'


const messageReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MESSAGES:
            return { ...state, messageList: payload }
        case ADD_MESSAGES:
            return {
                ...state,
                messageList: [
                    ...state.messageList,
                    {
                        _id: payload._id,
                        user: payload.user,
                        chat: payload.chat,
                        message: payload.message,
                    }
                ]
            }
        case UPDATE_MESSAGE:
            const { _id, user, chat, message } = payload;
            return { ...state, messageList: [...state.messageList, { _id, user, chat, message }] }
        default:
            return state;
    }
}

export default messageReducer;