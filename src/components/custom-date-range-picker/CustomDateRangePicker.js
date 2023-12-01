import React, { useState } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {Grid, Stack, TextField} from '@mui/material'
import {DesktopDatePicker, MobileDateRangePicker} from '@mui/lab'
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {Box} from "@mui/system";

const CustomDateRangePicker = (props) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [value, setValue] = useState([null, null]);

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }
    const handleEndDateChange = (date) => {
        setEndDate(date)
    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <CustomStackFullWidth>
                            <DesktopDatePicker
                                label={'From'}
                                value={startDate}
                                minDate={new Date('2023-01-01')}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </CustomStackFullWidth>
                       </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomStackFullWidth>
                            <DesktopDatePicker
                                label={'To'}
                                value={endDate}
                                minDate={new Date('2023-01-01')}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </CustomStackFullWidth>
                    </Grid>

                </Grid>
                <CustomStackFullWidth>


                </CustomStackFullWidth>
            </LocalizationProvider>
        </div>
    )
}

export default CustomDateRangePicker
