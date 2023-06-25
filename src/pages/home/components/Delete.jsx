import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useRequest from 'hooks/useRequest';


export default function Delete({ user }) {
  const usersSelector = useSelector(state => state.usersSlice)
  const dispatch = useDispatch()

  const [request] = useRequest()
  const handleDeleteUser = (id) => {
    console.log(id)
    const onSuccess = () => {
      toast("با موفقیت حذف شد.");
      dispatch(setUsersAction({ users: usersSelector.users.filter((i) => i._id !== id) }));
    }
    request("DELETE", `/user?id=${id}`, null, onSuccess)
  }


  return (
    <IconButton
      variant="contained"
      color="error"
      onClick={() => handleDeleteUser(user._id)}
    >
      <DeleteOutlineIcon />
    </IconButton>
  )
}