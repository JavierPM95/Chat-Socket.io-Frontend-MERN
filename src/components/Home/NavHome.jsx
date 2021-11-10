import { AppBar, IconButton, Toolbar, Typography, } from '@mui/material'
import { Add, Menu } from '@mui/icons-material'
import { Box } from '@mui/system'
import React from 'react'
import SelectUser from './SelectUser'

const NavHome = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <SelectUser />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <span aria-label='Smartphone' >🌀</span> MechaGram
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="add user"
                            sx={{ mr: 2 }}

                        >
                            <Add />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavHome
