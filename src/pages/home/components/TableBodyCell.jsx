import React from 'react'
import { TableCell } from '@mui/material'


function TableBodyCell({ children }) {
    return (
        <TableCell className="border border-gray-300">
            {children}
        </TableCell>
    )
}

export default TableBodyCell