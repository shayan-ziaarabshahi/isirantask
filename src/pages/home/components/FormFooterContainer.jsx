import { Box } from '@mui/material'
import React from 'react'


function FormFooterContainer({ children }) {

    return (
        <Box className="p-4 mt-auto flex justify-center">
            {children}
        </Box>
    )
}

export default FormFooterContainer