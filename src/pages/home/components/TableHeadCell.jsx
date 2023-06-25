import React from 'react'
import { TableCell, Typography } from '@mui/material'


function TableHeadCell({ children }) {
    return (
        <TableCell className="border border-gray-300">
            <Typography variants="h6" color="white">
                {children}
            </Typography>
        </TableCell>
    )
}

export default TableHeadCell