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
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';


export default function Add() {
    const usersSelector = useSelector(state => state.usersSlice)
    const dispatch = useDispatch()

    /* add user */
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [currentDate, setCurrentDate] = useState()

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
            const res = await axiosDefaultInstance({
                method: "POST",
                url: `/user`,
                data,
            });
            toast("با موفقیت ثبت شد.");
            dispatch(setUsersAction({ users: [...usersSelector.users, res.data.newUser] }))
        } catch (err) {
            console.log(err);
        }
        setShowAddUserModal(false);
    };

    return (
        <>
            <IconButton
                variant="contained"
                className=""
                onClick={() => setShowAddUserModal(true)}
            >
                <AddIcon />
            </IconButton>
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
        </>
    )
}
