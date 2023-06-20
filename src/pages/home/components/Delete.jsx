import axiosDefaultInstance from 'axiosApi/defaultInstance';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { IconButton } from "@mui/material";
/* icons */
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function Delete({ user }) {
    const usersSelector = useSelector(state => state.usersSlice)
    const dispatch = useDispatch()
  
    /* delete user */
    const handleDeleteUser = async (id) => {
      try {
        const res = await axiosDefaultInstance({
          method: "DELETE",
          url: `/user?id=${id}`,
        });
        toast("با موفقیت حذف شد.");
        dispatch(setUsersAction({ users: usersSelector.users.filter((i) => i._id !== id) }));
      } catch (err) {
        console.log(err);
      }
    };
  
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