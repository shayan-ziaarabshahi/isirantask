import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsersAction } from "redux/slices/usersSlice";
import { Box, IconButton } from "@mui/material";
import Modal from "./Modal";
import EditIcon from '@mui/icons-material/Edit';
import TextInputForm from "controls/text/index"
import DatePickerInputForm from "controls/datePicker";
import FormBodyContainer from "./FormBodyContainer";
import FormHeader from "./FormHeader";
import { formTextFieldsData } from "data/pages/home/index"
import useRequest from "hooks/useRequest";
import FormFooterContainer from "./FormFooterContainer";
import tableSchema from "formSchema/table";
import useToggle from "hooks/useToggle";


export default function Update({ user }) {
    const usersSelector = useSelector(state => state.usersSlice)
    const dispatch = useDispatch()

    const { status: showUpdateUserModal, toggleStatus: setShowUpdateUserModal } = useToggle()
    const [currentDate, setCurrentDate] = useState();

    const formValidationSchema = yup.object().shape({
        ...tableSchema,
        userId: yup.string().required("این کادر الزامی است."),
    });

    const methods = useForm({
        resolver: yupResolver(formValidationSchema),
    });

    const handleUpdateUserButtonClick = (user) => {
        setShowUpdateUserModal();
        methods.setValue("userId", user._id);
        methods.setValue("username", user.username);
        methods.setValue("firstName", user.firstName);
        methods.setValue("lastName", user.lastName);
        setCurrentDate(new Date(user.birthday));
    };

    const [request] = useRequest()
    const handleUpdateUser = (sendPayload) => {
        const onSuccess = (receivedData) => {
            const updatedList = usersSelector.users.map((user) => {
                if (user._id === sendPayload.userId) {
                    return receivedData
                } else {
                    return user;
                }
            });
            dispatch(setUsersAction({ users: updatedList }))
            toast("با موفقیت اصلاح شد.");
        }
        request("PUT", '/user', sendPayload, onSuccess)
        setShowUpdateUserModal();
    }


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
                        <FormHeader setShow={setShowUpdateUserModal} />
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
                            >
                                <EditIcon />
                            </IconButton>
                        </FormFooterContainer>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
