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
        setValue(name, currentDate || new Date())
    }, [currentDate, setValue, name])

    return (
        <ThemeProvider theme={theme}>
            <div dir="rtl">
                <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                    <Controller
                        name={name}
                        label={label}
                        control={control}
                        render={({ field }) => <DatePicker
                            {...field}
                            label={label}
                            value={currentDate || new Date()}
                            onChange={(date) => {
                                setCurrentDate(date)
                            }}
                            slotProps={{
                                textField: {
                                    helperText: errors[name]?.message,
                                },
                            }}
                        />}
                    />
                </LocalizationProvider>
            </div>
        </ThemeProvider>
    );
}

export default DatePickerInputForm;