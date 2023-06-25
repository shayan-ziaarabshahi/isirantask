import { Box } from '@mui/material'
import React from 'react'


function FormBodyContainer({ children }) {
    return (
        <Box className="p-4">
            <Box className="flex justify-center flex-wrap gap-4">
                {children}
            </Box>
        </Box>
    )
}

export default FormBodyContainer