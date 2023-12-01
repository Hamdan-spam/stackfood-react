import React, {useState} from 'react';
import {Grid} from "@mui/material";
import CustomTimePicker from "../../time-picker/CustomTimePicker";
import AddTime from "./AddTime";
import {Scrollbar} from "../../Scrollbar";
import {monthlyDays, type, weekDays} from "./data";
import CustomSelect from "../../select/customSelect";
import {ACTIONS} from "../states";
import CustomMobileDateRangePicker from "../../custom-date-range-picker/CustomMobileDateRangePicker";
import moment from "moment";
import {toast} from "react-hot-toast";


const Form = props => {
    const {t, subscriptionDispatch, subscriptionStates} = props
    const handleSelect = (value) => {
        subscriptionDispatch({type: ACTIONS.setSubscriptionType, payload: value})
    }
    const handleDateRange = (value)=>{
        const isSame = moment(value[0],'yyyy/MM/DD HH:mm' ).isSame(moment(value[1],'yyyy/MM/DD HH:mm' ))
        if(isSame){
            toast.error(t('Start date and end date can not be same for subscription orders.'))
        }
        else{
            subscriptionDispatch({type:ACTIONS.setStartDate, payload:moment(value[0]?.$d).format('yyyy/MM/DD HH:mm')})
            subscriptionDispatch({type:ACTIONS.setEndDate, payload:moment(value[1]?.$d).format('yyyy/MM/DD HH:mm')})
        }

    }
    const handleDaysTime = (value)=>{
        const days = []
        value?.forEach(item=>{
            if(item?.time!==''){
                days.push({day:item?.value, time:item?.time})
            }
        })
        subscriptionDispatch({type:ACTIONS.setSubscriptionDays, payload:days})
    }
    const handleTime = (value)=>{
        const days = [{day:`${moment().day()}`, time:value}]
        subscriptionDispatch({type:ACTIONS.setSubscriptionDays, payload:days})
    }
    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CustomMobileDateRangePicker handleValue={handleDateRange} diffStartEnd/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomSelect inputLabel={t('Subscription Type')} renderData={type} handleValue={handleSelect}/>
            </Grid>
            {
                subscriptionStates.type === type[0]?.value && <Grid item xs={12} sm={6}>
                    <CustomTimePicker handleTimeSelect={handleTime}/>
                </Grid>
            }
            {
                subscriptionStates.type === type[1]?.value && <Grid item xs={12}>
                    <Scrollbar style={{maxWidth: '100%'}}>
                        <AddTime data={weekDays} handleDaysTime={handleDaysTime} t={t}/>
                    </Scrollbar>
                </Grid>
            }
            {
                subscriptionStates.type === type[2]?.value && <Grid item xs={12}>
                    <Scrollbar style={{maxWidth: '100%'}}>
                        <AddTime data={monthlyDays} handleDaysTime={handleDaysTime} t={t}/>
                    </Scrollbar>
                </Grid>
            }
        </Grid>

    );
};

Form.propTypes = {};

export default Form;