import React, {useState} from 'react';
import {Paper} from "@mui/material";
import CustomTimePicker from "../../time-picker/CustomTimePicker";
import {DeliveryCaption} from "../CheckOut.style";
import {useTranslation} from "react-i18next";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {CustomButtonCancel, CustomButtonPrimary} from "../../../styled-components/CustomButtons.style";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const TimeChooser = props => {
    const {handleModalClose, handleSuccess} = props
    const [selectedTime, setSelectedTime] = useState()
    const {t} = useTranslation()
    const handleTimeSelect = (time) => {
        setSelectedTime(time)
    }
    return (
        <Paper sx={{width: {xs: '300px', sm: '350px'}, padding: '1rem'}}>
            <CustomStackFullWidth alignItems='center' justifyContent='center' spacing={2}>
                <AddCircleOutlineOutlinedIcon sx={{color: theme => theme.palette.primary.main, fontSize: '60px'}}/>
                <DeliveryCaption id="demo-row-radio-buttons-group-label" no_margin_top='true'>
                    {t('Add a delivery time')}
                </DeliveryCaption>
                <CustomTimePicker handleTimeSelect={handleTimeSelect}/>
                <CustomStackFullWidth direction='row' alignItems='center' spacing={2}>
                    <CustomButtonCancel onClick={() => handleModalClose()}>
                        {t('Cancel')}
                    </CustomButtonCancel>
                    <CustomButtonPrimary onClick={() => handleSuccess(selectedTime)}
                                         >
                        {t('Add')}
                    </CustomButtonPrimary>
                </CustomStackFullWidth>

            </CustomStackFullWidth>
        </Paper>
    );
};

TimeChooser.propTypes = {};

export default TimeChooser;