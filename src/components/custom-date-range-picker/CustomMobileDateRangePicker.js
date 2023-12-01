import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {Box, Grid, TextField} from "@mui/material";
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import moment from "moment";


const CustomMobileDateRangePicker = props => {
    const { handleValue, minDate, maxDate, diffStartEnd} = props
    const [value, setValue] = useState([null, null]);
    useEffect(()=>{
        if(value[0]!== null && value[1]!== null){
            handleValue?.(value)
        }

    },[value])
    const handleDateComponent = ()=>{
        if(minDate && maxDate){
            return <MobileDateRangePicker
                value={value}
                minDate={moment(minDate).toDate()}
                maxDate={moment(maxDate).toDate()}
                onChange={(newValue) => {
                    if(diffStartEnd){
                        if(value[0]!==value[1]){
                            setValue(newValue);
                        }
                    }
                    else{
                        setValue(newValue);
                    }

                }}
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={3}>
                        <Grid item xs={6}><TextField fullWidth {...startProps} /></Grid>
                        <Grid item xs={6}> <TextField fullWidth {...endProps} /></Grid>
                    </Grid>
                )}
            />
        }
        else{
            return <MobileDateRangePicker
                disablePast
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={3}>
                        <Grid item xs={6}><TextField fullWidth {...startProps} /></Grid>
                        <Grid item xs={6}> <TextField fullWidth {...endProps} /></Grid>
                    </Grid>
                )}
            />
        }

    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {handleDateComponent()}
            </LocalizationProvider>

        </div>
    );
};

CustomMobileDateRangePicker.propTypes = {

};

export default CustomMobileDateRangePicker;