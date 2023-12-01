import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {useEffect} from "react";


const CustomTimePicker=({handleTimeSelect})=> {
    const [value, setValue] = React.useState(
        dayjs()
    );
    useEffect(()=>{
        handleTimeSelect?.(dayjs(value).format('H:mm:ss'))
    },[value])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomStackFullWidth>
                <MobileTimePicker
                    fullWidth
                    label="Delivery time"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField  {...params} />}
                />
            </CustomStackFullWidth>
        </LocalizationProvider>
    );
}
export default CustomTimePicker