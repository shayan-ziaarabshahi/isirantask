import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import PN from "persian-number";
import momentJalaali from "moment-jalaali";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { Box, IconButton, Stack, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import MaterialDatePicker from "shared_components/MaterialDatePicker.jsx"
import { tableHeadData } from "data/pages/home/index"
/* icons */
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';


function Home() {

  const usersSelector = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();

  /* get users */
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users`,
        });
        dispatch(setUsersAction({ users: res.data }))
      } catch (err) {
        console.log(err);
      }
    };
    getUsers()
  }, [dispatch]);


  /* add user */
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  const formValidationSchema = yup.object().shape({
    username: yup.string().required("این کادر الزامی است."),
    firstName: yup.string().required("این کادر الزامی است."),
    lastName: yup.string().required("این کادر الزامی است."),
    birthday: yup.string().required("این کادر الزامی است."),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(formValidationSchema),
  });

  const handleAddUser = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/api/user`,
        data,
      });
      toast("با موفقیت ثبت شد.");
      dispatch(setUsersAction({ users: [...usersSelector.users, res.data.newUser] }))
    } catch (err) {
      console.log(err);
    }
    setShowAddUserModal(false);
  };


  /* update user */
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [currentDate2, setCurrentDate2] = useState();

  const formValidationSchema2 = yup.object().shape({
    username: yup.string().required("این کادر الزامی است."),
    firstName: yup.string().required("این کادر الزامی است."),
    lastName: yup.string().required("این کادر الزامی است."),
    birthday: yup.string().required("این کادر الزامی است."),
    userId: yup.string().required("این کادر الزامی است."),
  });

  const {
    handleSubmit: handleSubmit2,
    register: register2,
    formState: { errors: errors2 },
    setValue: setValue2,
  } = useForm({
    resolver: yupResolver(formValidationSchema2),
  });

  const handleUpdateUserButtonClick = (user) => {
    setShowUpdateUserModal(true);
    setValue2("userId", user._id);
    setValue2("username", user.username);
    setValue2("firstName", user.firstName);
    setValue2("lastName", user.lastName);
    setValue2("birthday", user.birthday);
    setCurrentDate2(user.birthday);
  };

  const handleUpdateUser = async (data) => {
    try {
      const res = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/api/user`,
        data,
      });
      toast("با موفقیت اصلاح شد.");
      let updatedList = usersSelector.users.map((user) => {
        if (user._id === data.userId) {
          return res.data;
        } else {
          return user;
        }
      });
      console.log(updatedList);
      dispatch(setUsersAction({ users: updatedList }))
    } catch (err) {
      console.log(err);
    }
    setShowUpdateUserModal(false);
  };


  /* delete user */
  const handleDeleteUser = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/api/user?id=${id}`,
      });
      toast("با موفقیت حذف شد.");
      dispatch(setUsersAction({ users: usersSelector.users.filter((i) => i._id !== id) }));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Box className="">
      <Box className="p-4">
        <IconButton
          variant="contained"
          className=""
          onClick={() => setShowAddUserModal(true)}
        >
          <AddIcon />
        </IconButton>
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
                    <IconButton
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      color="warning"
                      onClick={() => handleUpdateUserButtonClick(user)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Box>


      {/* add user modal */}
      {
        showAddUserModal ? (
          <>
            <Box
              className="fixed top-0 left-0 flex justify-center items-center bg-black w-full h-full opacity-50"
            ></Box>
            <Box className="fixed top-8 left-4 w-[calc(100%-2rem)] bg-white z-10 rounded-lg">
              <form onSubmit={handleSubmit(handleAddUser)} noValidate>
                <Box className="p-4">
                  <Typography
                    className="cursor-pointer"
                    onClick={() => setShowAddUserModal(false)}
                  >
                    <CloseIcon />
                  </Typography>
                </Box>
                <Box className="p-4">
                  <Box className="flex justify-center flex-wrap gap-4">
                    <Box className="mb-4">
                      <TextField
                        label="نام کاربری"
                        type="text"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                      />

                    </Box>
                    <Box className="mb-4">
                      <TextField
                        label="نام"
                        type="text"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    </Box>
                    <Box className="mb-4">
                      <TextField
                        label="نام خانوادگی"
                        type="text"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    </Box>
                    <Box className="mb-4">
                      <MaterialDatePicker
                        label="تاریخ تولد"
                        register={{ ...register("birthday") }}
                        error={!!errors.birthday}
                        helperText={errors.birthday?.message}
                        setValue={(date) => setValue("birthday", date)}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="p-4 mt-auto flex justify-center">
                  <IconButton
                    variant="contained"
                    color="success"
                    type="submit"
                    className=""
                  >
                    <SaveIcon />
                  </IconButton>
                </Box>
              </form>
            </Box>
          </>
        ) : (
          ""
        )
      }

      {/* update user modal */}
      {
        showUpdateUserModal ? (
          <>
            <Box className="fixed top-0 left-0 flex justify-center items-center bg-black w-full h-full opacity-50"></Box>
            <Box className="fixed top-8 left-4 w-[calc(100%-2rem)] bg-white z-10 rounded-lg">
              <form onSubmit={handleSubmit2(handleUpdateUser)} noValidate>
                <Box className="p-4">
                  <Typography
                    className="cursor-pointer"
                    onClick={() => setShowUpdateUserModal(false)}
                  >
                    <CloseIcon />
                  </Typography>
                </Box>
                <Box className="p-4">
                  <Box className="flex justify-center flex-wrap gap-4">
                    <Box className="mb-4">
                      <TextField
                        label="نام کاربری"
                        type="text"
                        {...register2("username")}
                      />

                    </Box>
                    <Box className="mb-4">
                      <TextField
                        label="نام"
                        type="text"
                        {...register2("firstName")}
                      />
                    </Box>
                    <Box className="mb-4">
                      <TextField
                        label="نام خانوادگی"
                        type="text"
                        {...register2("lastName")}
                      />
                    </Box>
                    <Box className="mb-4">
                      <MaterialDatePicker
                        label="تاریخ تولد"
                        currentDate={currentDate2}
                        register={{ ...register2("birthday") }}
                        error={!!errors2.birthday}
                        helperText={errors2.birthday?.message}
                        setValue={(date) => setValue2("birthday", date)}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="p-4 mt-auto flex justify-center">
                  <IconButton
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </form>
            </Box>
          </>
        ) : (
          ""
        )
      }
    </Box >
  );
}

export default Home;