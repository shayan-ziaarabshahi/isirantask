import PN from "persian-number";
import momentJalaali from "moment-jalaali";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";
import { tableHeadData } from "data/pages/home/index"
import Add from "./components/Add";
import Update from "./components/Update"
import Delete from "./components/Delete"
import Table from "./components/Table"
import TableHead from "./components/TableHead"
import TableRow from "./components/TableRow"
import TableHeadCell from "./components/TableHeadCell"
import TableBodyCell from "./components/TableBodyCell"
import TableBodyTextCell from "./components/TableBodyTextCell"
import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { setUsersAction } from "redux/slices/usersSlice";



export default function Home() {

  const usersSelector = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();

  const [request] = useRequest();
  
  useEffect(() => {
    const onSuccess = (receivedData) => {
      dispatch(setUsersAction({ users: receivedData }))
    }
    request("GET", '/users', null, onSuccess)
  }, [dispatch, request])


  return (
    <>
      <Box className="">
        <Box className="p-4">
          <Add />
        </Box>
        <Box className="p-4 overflow-auto">
          <Table>
            <TableHead>
              <TableRow>
                {tableHeadData.map(i => (
                  <TableHeadCell key={i.id}>
                    {i.title}
                  </TableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <tbody>
              {usersSelector.users.map((user) => (
                <TableRow key={user._id}>
                  <TableBodyTextCell >
                    {user.username}
                  </TableBodyTextCell>
                  <TableBodyTextCell>
                    {user.role}
                  </TableBodyTextCell>
                  <TableBodyTextCell>
                    {user.firstName}
                  </TableBodyTextCell>
                  <TableBodyTextCell>
                    {user.lastName}
                  </TableBodyTextCell>
                  <TableBodyTextCell>
                    {PN.convertEnToPe(
                      momentJalaali(user.birthday).format("jYYYY/jM/jD")
                    )}
                  </TableBodyTextCell>
                  <TableBodyCell>
                    <Stack direction="row" spacing={2}>
                      <Delete user={user} />
                      <Update user={user} />
                    </Stack>
                  </TableBodyCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box >
    </>
  );
}