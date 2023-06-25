import * as yup from "yup";

const tableSchema = {
    username: yup.string().required("این کادر الزامی است."),
    firstName: yup.string().required("این کادر الزامی است."),
    lastName: yup.string().required("این کادر الزامی است."),
    birthday: yup.string().required("این کادر الزامی است."),
}

export default tableSchema