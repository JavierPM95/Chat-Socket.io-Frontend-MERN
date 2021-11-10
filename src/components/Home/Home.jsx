import React, { useContext, useEffect, useState } from 'react'

// Components
import NavHome from './NavHome';

// Context
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ChatContext } from '../../context/Chat/ChatContext';
import { UserContext } from '../../context/User/UserContext';

// Material UI
import { CardHeader, Avatar } from '@mui/material'

// styles
import muiFunc from '../../styles/materialUI';

const Home = () => {
    const { chatList, getChat, setActualChat } = useContext(ChatContext)
    const { actualUser, userList, getUsers, addUser, updateActualUser } = useContext(UserContext)
    let history = useHistory();

    // Requests
    const getChats = async (userId) => {
        await getChat(userId);
    }

    // States
    const initialUserData = [{
        _id: null,
        avatar: null,
        name: { _id: null, user: ''},
        lastMessage: { _id: null, message: null }
    }]

    const [userData, setUserData] = useState(initialUserData);
    const [chatsUpdated, setChatsUpdated] = useState(false)


    const updateUserDataState = () => {
        if (chatList[0]._id !== null) {
            chatList.forEach((chat, i) => {
                const { _id, users, lastMessage } = chat;
                const name = users.find(user => user._id !== actualUser._id);
                const avatar = name.user.substring(0, 1);
                if (i === 0) setUserData([{
                    _id, avatar, name, lastMessage
                }])
                else setUserData([...userData, {
                    _id, avatar, name, lastMessage
                }])
            })
        }
    }

    // Buscar chats
    useEffect(() => {
        getUsers()
        getChats(actualUser._id).then(() => setChatsUpdated(true))
        
    }, [])

    // Actualizar componentes
    useEffect(() => {
        updateUserDataState()
    }, [chatsUpdated, actualUser])

    //Handle
    const userClicked = (e) => {
        const chatId = e.currentTarget.getAttribute("data-chatid")
        setActualChat(chatId)
        history.push('/chat')
    }

    return (
        <>
            <div>
                <NavHome />
                {
                    userData.map((user, i) => (
                        <CardHeader
                            key={user._id}
                            avatar={
                                <Avatar aria-label={user.name.user} sx={{ bgcolor: muiFunc.stringToColor(user.name.user) }}>
                                    {user.avatar}
                                </Avatar>
                            }
                            title={user.name.user}
                            subheader={user.lastMessage.message}
                            data-chatid={user._id}
                            onClick={(e) => userClicked(e)}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Home
