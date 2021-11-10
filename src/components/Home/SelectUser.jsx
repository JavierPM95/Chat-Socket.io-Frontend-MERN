import React, { useContext, useState } from 'react'

// Material UI
import { Avatar, Backdrop, CardContent, CardHeader, Fade, IconButton, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Menu } from '@mui/icons-material'

// Context
import { UserContext } from '../../context/User/UserContext';
import muiFunc from '../../styles/materialUI';

const SelectUser = () => {
    const { actualUser, userList, getUsers, addUser, updateActualUser } = useContext(UserContext)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fff',
        boxShadow: 24,
        borderRadius: '1rem',
        p: 4,
    };

    const [toogleModal, setToogleModal] = useState(false);

    const handleToogleModal = () => setToogleModal(!toogleModal);

    const userSelected = (e) => {
        const userSelected = JSON.parse(e.currentTarget.dataset.userselected)
        updateActualUser(userSelected)
        handleToogleModal();
    }

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleToogleModal}
            >
                <Menu />
            </IconButton>
            {
                (!userList[0]._id)
                    ?
                    null
                    :
                    <div>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={toogleModal}
                            onClose={handleToogleModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={toogleModal}>
                                <Box sx={style}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <span aria-label='user'>🙇‍♂️</span> Hi {actualUser.user}! choose an user
                                    </Typography>
                                    {
                                        userList.map(user => (
                                            <IconButton
                                                size="large"
                                                edge="center"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{ mr: 2 }}
                                                data-userselected={JSON.stringify(user)}
                                                onClick={(e) => userSelected(e)}
                                            >
                                                <CardHeader
                                                    key={user._id}
                                                    avatar={
                                                        <Avatar aria-label={user.user} sx={{ bgcolor: muiFunc.stringToColor(user.user) }}>
                                                            {user.user.substring(0, 1)}
                                                        </Avatar>
                                                    }
                                                    title={user.user}
                                                />
                                            </IconButton>
                                        ))
                                    }
                                </Box>
                            </Fade>
                        </Modal>
                    </div>
            }
        </>
    )
}

export default SelectUser
