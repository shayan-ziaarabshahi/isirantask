import React from 'react'
import { Table } from '@mui/material'


function CustomTable({ children }) {
    return (
        <Table className="border-collapse w-full">
            {children}
        </Table>
    )
}

export default CustomTable