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
        </>
    )
}
