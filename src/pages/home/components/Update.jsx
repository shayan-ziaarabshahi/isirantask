import { useState } from "react";
import axiosDefaultInstance from 'axiosApi/defaultInstance';
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import MaterialDatePicker from "shared_components/MaterialDatePicker.jsx"
import Modal from "./Modal";
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
        control,
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

            <Modal showModal={showUpdateUserModal}>
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
                                <Controller
                                    name="username"
                                    label="نام کاربری"
                                    control={control}
                                    render={({ field }) => <TextField
                                        label="نام کاربری"
                                        type="text"
                                        error={!!errors.username}
                                        helperText={errors.username?.message}
                                        {...field}
                                    />}
                                />
                            </Box>
                            <Box className="mb-4">
                                <Controller
                                    name="firstName"
                                    label="نام"
                                    control={control}
                                    render={({ field }) => <TextField
                                        label="نام"
                                        type="text"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        {...field}
                                    />}
                                />
                            </Box>
                            <Box className="mb-4">
                                <Controller
                                    name="lastName"
                                    label="نام خانوادگی"
                                    control={control}
                                    render={({ field }) => <TextField
                                        label="نام خانوادگی"
                                        type="text"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        {...field}
                                    />}
                                />
                            </Box>
                            <Box className="mb-4">
                                <MaterialDatePicker
                                    label="تاریخ تولد"
                                    register={{ ...register("birthday") }}
                                    error={!!errors.birthday}
                                    helperText={errors.birthday?.message}
                                    setValue={(date) => setValue("birthday", date)}
                                    currentDate={currentDate}
                                    setCurrentDate={setCurrentDate}
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
            </Modal>
        </>
    )
}
