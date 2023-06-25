import { TableHead } from '@mui/material'
import React from 'react'


function CustomTableHead({ children }) {
    return (
        <TableHead className="bg-slate-500">
            {children}
        </TableHead>
    )
}

export default CustomTableHead