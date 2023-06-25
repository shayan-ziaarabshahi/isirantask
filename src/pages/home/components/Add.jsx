import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Modal from "./Modal";
import TextInputForm from "controls/text/index"
import DatePickerInputForm from "controls/datePicker";
import FormBodyContainer from "./FormBodyContainer";
import FormFooterContainer from "./FormFooterContainer";
import FormHeader from "./FormHeader";
import { formTextFieldsData } from "data/pages/home/index"
import useRequest from "hooks/useRequest";
import tableSchema from "formSchema/table";
import useToggle from "hooks/useToggle";


export default function Add() {
    const usersSelector = useSelector(state => state.usersSlice)
    const dispatch = useDispatch()

    const { status: showAddUserModal, toggleStatus: setShowAddUserModal } = useToggle()
    const [currentDate, setCurrentDate] = useState()

    const formValidationSchema = yup.object().shape({
        ...tableSchema
    });

    const methods = useForm({
        resolver: yupResolver(formValidationSchema),
    });

    const [request] = useRequest()
    const handleAddUser = (sendPayload) => {
        const onSuccess = (receivedData) => {
            toast("با موفقیت ثبت شد.");
            dispatch(setUsersAction({ users: [...usersSelector.users, receivedData.newUser] }))
        }

        request("POST", '/user', sendPayload, onSuccess)
        setShowAddUserModal();
    }

    return (
        <>
            <IconButton
                variant="contained"
                className=""
                onClick={() => setShowAddUserModal()}
            >
                <AddIcon />
            </IconButton>
            <Modal showModal={showAddUserModal}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleAddUser)} noValidate>
                        <FormHeader setShow={setShowAddUserModal} />
                        <FormBodyContainer>
                            {
                                formTextFieldsData.map(i => (
                                    <Box key={i.name} className="mb-4">
                                        <TextInputForm
                                            name={i.name}
                                            label={i.label}
                                        />
                                    </Box>
                                ))
                            }
                            <Box className="mb-4">
                                <DatePickerInputForm
                                    label="تاریخ تولد"
                                    name="birthday"
                                    currentDate={currentDate}
                                    setCurrentDate={setCurrentDate}
                                />
                            </Box>
                        </FormBodyContainer>
                        <FormFooterContainer>
                            <IconButton
                                variant="contained"
                                color="success"
                                type="submit"
                                className=""
                            >
                                <SaveIcon />
                            </IconButton>
                        </FormFooterContainer>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}