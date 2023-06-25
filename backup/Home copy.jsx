import PN from "persian-number";
import momentJalaali from "moment-jalaali";
import { useSelector } from "react-redux";
import { Box, Stack, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { tableHeadData } from "data/pages/home/index"
import Add from "./components/Add";
import Update from "./components/Update"
import Delete from "./components/Delete"
import Get from "./components/Get";


export default function Home() {

  const usersSelector = useSelector((state) => state.usersSlice);

  return (
    <>
      <Get />
      <Box className="">
        <Box className="p-4">
          <Add />
        </Box>
        <Box className="p-4 overflow-auto">
          <Table className="border-collapse w-full">
            <TableHead className="bg-slate-500">
              <TableRow>
                {tableHeadData.map(i => (
                  <TableCell key={i.id} className="border border-gray-300">
                    <span className="text-white font-bold whitespace-nowrap">
                      {i.title}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <tbody>
              {usersSelector.users.map((user) => (
                <TableRow>
                  <TableCell className="border border-gray-300">
                    <Typography>
                      {user.username}
                    </Typography>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Typography>
                      {user.role}
                    </Typography>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Typography>
                      {user.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Typography>
                      {user.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Typography>
                      {PN.convertEnToPe(
                        momentJalaali(user.birthday).format("jYYYY/jM/jD")
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Stack direction="row" spacing={2}>
                      <Delete user={user} />
                      <Update user={user} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box >
    </>
  );
}