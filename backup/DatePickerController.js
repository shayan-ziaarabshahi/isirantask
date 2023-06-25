import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider, useTheme } from "@emotion/react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { createTheme } from "@mui/material";


function DatePickerInputForm(props) {

    const { control, setValue, formState: { errors } } = useFormContext();
    const { name, label, setCurrentDate, currentDate } = props;

    const existingTheme = useTheme();

    const theme = React.useMemo(
        () => createTheme({ direction: 'rtl' }, existingTheme),
        [existingTheme],
    );

    React.useEffect(() => {
        //setValue(currentDate || new Date())
    }, [currentDate, setValue])

    return (
        <ThemeProvider theme={theme}>
            <div dir="rtl">
                <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                    <Controller
                        name={name}
                        label={label}
                        control={control}
                        render={({ field }) => <DatePicker
                            label={label}
                            onChange={date => { setCurrentDate(date) }}
                            value={new Date(currentDate ? currentDate : null)}
                            error={errors[name] ? true : false}
                            helperText={errors[name] ? errors[name]?.message : ""}
                            {...field}
                        />}
                    />
                </LocalizationProvider>
            </div>
        </ThemeProvider>

    );
}

export default DatePickerInputForm;


