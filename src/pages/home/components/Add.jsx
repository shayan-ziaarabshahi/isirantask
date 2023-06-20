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
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Modal from "./Modal";
import TextInputForm from "controls/text/index"



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

    const methods = useForm({
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
            <Modal showModal={showAddUserModal}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleAddUser)} noValidate>
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
                                        register={{ ...methods.register("birthday") }}
                                        error={!!methods.errors.birthday}
                                        helperText={methods.errors.birthday?.message}
                                        setValue={(date) => methods.setValue("birthday", date)}
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
                                className=""
                            >
                                <SaveIcon />
                            </IconButton>
                        </Box>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
