import { Skeleton } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
        </>
    )
}

export default Loading
