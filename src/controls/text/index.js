import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";


function FormInput(props) {

    const { control, formState: { errors } } = useFormContext();
    const { name, label } = props;

    return (
        <Controller
            name={name}
            label={label}
            control={control}
            render={({ field }) => <TextField
                label={label}
                type="text"
                error={errors[name] ? true : false}
                helperText={errors[name] ? errors[name]?.message : ""}
                {...field}
            />}
        />
    );
}

export default FormInput;