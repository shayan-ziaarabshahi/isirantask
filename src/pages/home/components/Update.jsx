import { useState } from "react";
import axiosDefaultInstance from 'axiosApi/defaultInstance';
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import TextInputForm from "controls/text/index"


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

    const methods = useForm({
        resolver: yupResolver(formValidationSchema),
    });

    const handleUpdateUserButtonClick = (user) => {
        setShowUpdateUserModal(true);
        methods.setValue("userId", user._id);
        methods.setValue("username", user.username);
        methods.setValue("firstName", user.firstName);
        methods.setValue("lastName", user.lastName);
        methods.setValue("birthday", user.birthday);
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
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleUpdateUser)} noValidate>
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
                                    <TextInputForm
                                        name="username"
                                        label="نام کاربری"
                                    />
                                </Box>
                                <Box className="mb-4">
                                    <TextInputForm
                                        name="firstName"
                                        label="نام"
                                    />
                                </Box>
                                <Box className="mb-4">
                                    <TextInputForm
                                        name="lastName"
                                        label="نام خانوادگی"
                                    />
                                </Box>
                                <Box className="mb-4">
                                    {/* <MaterialDatePicker
                                        label="تاریخ تولد"
                                        register={{ ...register("birthday") }}
                                        error={!!errors.birthday}
                                        helperText={errors.birthday?.message}
                                        setValue={(date) => setValue("birthday", date)}
                                        currentDate={currentDate}
                                        setCurrentDate={setCurrentDate}
                                    /> */}
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
                </FormProvider>
            </Modal>
        </>
    )
}
