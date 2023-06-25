import { Box, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


function FormHeader({setShow}) {
    return (
        <Box className="p-4">
            <Typography
                className="cursor-pointer inline-block"
                onClick={() => setShow(false)}
            >
                <CloseIcon />
            </Typography>
        </Box>
    )
}

export default FormHeader