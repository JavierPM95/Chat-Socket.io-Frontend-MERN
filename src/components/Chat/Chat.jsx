import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Avatar, Box, Button, Card, CardContent, CardHeader, Grid, TextField, Toolbar, Typography } from '@mui/material'
import muiFunc from '../../styles/materialUI'
import { MessageContext } from '../../context/Message/MessageContext'
import { ChatContext } from '../../context/Chat/ChatContext'
import { UserContext } from '../../context/User/UserContext';

// Socket
import socket from '../../utils/socket.io'

const Chat = () => {
    const { actualChat } = useContext(ChatContext)
    const { messageList, getMessages, addMessages, updatedMessages } = useContext(MessageContext)
    const { actualUser, userList, getUsers, addUser, updateActualUser } = useContext(UserContext)

    // Socket
    socket.on('client_newMessage', (socket) => {
        updatedMessages(socket)
    })

    const initialChatState = {
        _id: null,
        avatar: '',
        name: { _id: null, user: '' },
        lastMessage: { _id: null, message: '' }
    }

    const [messageUpdated, setMessageUpdated] = useState(false)
    const [chatData, setChatData] = useState(initialChatState)
    const [chatInputValue, setChatInputValue] = useState('')


    useEffect(() => {
        getMessages(actualChat._id)
        setMessageUpdated(true)
    }, [])


    useEffect(() => {
        if (messageUpdated) updateUserChat()
    }, [messageUpdated])


    const updateUserChat = () => {
        if (actualChat._id !== null) {
            const { _id, users, lastMessage } = actualChat;
            const name = users.find(user => user.user !== actualUser.user);
            const avatar = name.user.substring(0, 1);
            setChatData({ _id, avatar, name, lastMessage })
        }
    }

    const sendMessage = async () => {
        const dataToSend = {
            user: actualUser._id,
            chat: chatData._id,
            message: chatInputValue,
        }
        await addMessages(dataToSend)
        setChatInputValue('')
    }

    const handleInputChat = (e) => setChatInputValue(e.target.value)

    return (
        <>
            <header>
                <AppBar position='sticky'>
                    <Toolbar>
                        <CardHeader
                            key={chatData._id}
                            avatar={
                                <Avatar
                                    aria-label={chatData.name.user}
                                    sx={{ bgcolor: muiFunc.stringToColor(chatData.name.user) }}>
                                    {chatData.avatar}
                                </Avatar>
                            }
                            title={chatData.name.user}
                            subheader={'en linea'}
                            data-chatid={chatData._id}
                        />
                    </Toolbar>
                </AppBar>
            </header>
            <section>
                {
                    (messageList[0]._id)
                        ?
                        messageList.map(message => (
                            (message.user.user === 'Javier')
                                ?
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="end"
                                    justify="center"
                                >
                                    <Grid item xs={3} >
                                        <Card key={message._id} sx={{ maxWidth: 275, marginY: '1rem' }}>
                                            <CardContent>
                                                <Typography variant="body2"
                                                    sx={{ color: muiFunc.stringToColor(chatData.name.user) }}>
                                                    {message.user.user}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {message.message}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                :
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="start"
                                    justify="center"
                                >
                                    <Grid item xs={3} >
                                        <Card key={message._id} sx={{ maxWidth: 275, marginY: '1rem' }}>
                                            <CardContent>
                                                <Typography variant="body2"
                                                    sx={{ color: muiFunc.stringToColor(chatData.name.user) }}>
                                                    {message.user.user}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {message.message}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                        ))
                        :
                        null
                }
            </section>
            <footer>
                <Grid
                    container
                    spacing={0}
                >
                    <Grid item xs={10} alignItems="start" justify="center" >
                        <TextField
                            sx={{ minWidth: 500 }}
                            id="filled-textarea"
                            placeholder="Comentar..."
                            multiline
                            variant="filled"
                            value={chatInputValue}
                            onChange={(e) => handleInputChat(e)}
                        />
                    </Grid>
                    <Grid item xs={2} alignItems="end" justify="center" >
                        <Button style={{ padding: '1rem 1rem', }} variant="contained" size='large' onClick={(e) => sendMessage(e)} >Enviar</Button>
                    </Grid>
                </Grid>
            </footer>
        </>
    )
}

export default Chat
