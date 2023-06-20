import { Box } from '@mui/material'
import React from 'react'


function Modal({children, showModal}) {
    return (
        <>
            {
                showModal ? (
                    <>
                        <Box className="fixed top-0 left-0 flex justify-center items-center bg-black w-full h-full opacity-50"></Box>
                        <Box className="fixed top-8 left-4 w-[calc(100%-2rem)] bg-white z-10 rounded-lg">
                            {children}
                        </Box>
                    </>
                ) : (
                    ""
                )
            }
        </>
    )
}

export default Modal