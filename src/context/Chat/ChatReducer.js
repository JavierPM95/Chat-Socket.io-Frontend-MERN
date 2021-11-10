import { GET_CHAT, SET_CHAT } from '../types'


const chatReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CHAT:
            return { ...state, chatList: payload }
        case SET_CHAT:
            return { ...state, actualChat: payload }
        default:
            return state;
    }
}

export default chatReducer;