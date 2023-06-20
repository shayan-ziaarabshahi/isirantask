//needs another package in background 

import * as React from 'react';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useTheme from '@mui/system/useTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function AdapterJalali({
  label,
  currentDate,
  setCurrentDate,
  error,
  helperText,
  register,
  setValue
}) {

  const existingTheme = useTheme();

  const theme = React.useMemo(
    () => createTheme({ direction: 'rtl' }, existingTheme),
    [existingTheme],
  );

  React.useEffect(() => {
    setValue(currentDate || new Date())
  }, [currentDate, setValue])

  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <DatePicker
            label={label}
            onChange={date => { setCurrentDate(date) }}
            value={new Date(currentDate ? currentDate : null)}
            error={error}
            helperText={helperText}
            register
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}

