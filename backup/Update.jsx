import { useState } from "react";
import axiosDefaultInstance from 'axiosApi/defaultInstance';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import MaterialDatePicker from "shared_components/MaterialDatePicker.jsx"
/* icons */
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';




export default function Update({ user }) {
    const usersSelector = useSelector(state => state.usersSlice)
    const dispatch = useDispatch()

    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [currentDate, setCurrentDate] = useState();

    const formValidationSchema = yup.object().shape({
        username: yup.string().required("این کادر الزامی است."),
        firstName: yup.string().required("این کادر الزامی است."),
        lastName: yup.string().required("این کادر الزامی است."),
        birthday: yup.string().required("این کادر الزامی است."),
        userId: yup.string().required("این کادر الزامی است."),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(formValidationSchema),
    });

    const handleUpdateUserButtonClick = (user) => {
        setShowUpdateUserModal(true);
        setValue("userId", user._id);
        setValue("username", user.username);
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("birthday", user.birthday);
        setCurrentDate(user.birthday);
    };

    const handleUpdateUser = async (data) => {
        try {
            const res = await axiosDefaultInstance({
                method: "PUT",
                url: `/user`,
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

    return (
        <>
            <IconButton
                variant="contained"
                color="warning"
                onClick={() => handleUpdateUserButtonClick(user)}
            >
                <EditIcon />
            </IconButton>

            {/* update user modal */}
            {
                showUpdateUserModal ? (
                    <>
                        <Box className="fixed top-0 left-0 flex justify-center items-center bg-black w-full h-full opacity-50"></Box>
                        <Box className="fixed top-8 left-4 w-[calc(100%-2rem)] bg-white z-10 rounded-lg">
                            <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
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
                                                {...register("username")}
                                            />

                                        </Box>
                                        <Box className="mb-4">
                                            <TextField
                                                label="نام"
                                                type="text"
                                                {...register("firstName")}
                                            />
                                        </Box>
                                        <Box className="mb-4">
                                            <TextField
                                                label="نام خانوادگی"
                                                type="text"
                                                {...register("lastName")}
                                            />
                                        </Box>
                                        <Box className="mb-4">
                                            <MaterialDatePicker
                                                label="تاریخ تولد"
                                                currentDate={currentDate}
                                                setCurrentDate={setCurrentDate}
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
        </>
    )
}
