import { Typography } from "@mui/material";
import TableBodyCell from "./TableBodyCell";



function TableBodyTextCell({ children }) {
    return (
        <TableBodyCell>
            <Typography>
                {children}
            </Typography>
        </TableBodyCell>
    )
}

export default TableBodyTextCell