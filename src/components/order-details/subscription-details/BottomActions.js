import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CustomPaperBigCard} from "../../../styled-components/CustomStyles.style";
import {Button, Grid} from "@mui/material";
import {PrimaryButton} from "../../products-page/FoodOrRestaurant";
import CustomModal from "../../custom-modal/CustomModal";
import Logs from "./Logs";
import ModalView from "./ModalView";
import {useCancelSubscription} from "../../../hooks/react-query/subscription/useCancelSubscription";
import {toast} from "react-hot-toast";
import {onErrorResponse} from "../../ErrorResponse";
import moment from "moment";

const BottomActions = props => {
    const {t, subscriptionId,refetchAll, minDate, maxDate} = props
    const [openPause, setOpenPause] = useState(false)
    const [openCancel, setOpenCancel] = useState(false)
    const params ={}
    const {mutate} = useCancelSubscription()

    const handleSuccessCancelClick = (value)=>{
        if(Array.isArray(value)){
            //for pause subscription
            const handleSuccess = ()=>{
                toast.success(t('This Subscription order paused successfully.'))
                refetchAll?.()
            }
            if(value?.length!==0){
                params.subscriptionId = subscriptionId
                params.status='paused'
                params.startDate=value[0]
                params.endDate=value[1]

                mutate(params,{
                    onSuccess: handleSuccess,
                    onError:onErrorResponse,
                })
                setOpenPause(false)
            }
            else{
                toast.error(t('Start date and end date can not be empty.'),{
                    style:{
                        textTransform:'none'
                    }
                })
            }

        }
        else{
            //for cancel subscription
            const handleSuccess = ()=>{
                toast.success(t('This Subscription order cancelled successfully'))
                refetchAll?.()
            }
            params.subscriptionId = subscriptionId
            params.status='canceled'
            params.note=value.customer_note
            params.reason=value.customer_reason
            mutate(params,{
                onSuccess:handleSuccess,
                onError:onErrorResponse,
            })
            setOpenCancel(false)
        }
    }
    return (
        <CustomPaperBigCard sx={{mt:'1rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <PrimaryButton
                        variant="contained"
                        sx={{width: '100%'}}
                        onClick={()=>setOpenPause(true)}
                    >
                        {t('Pause Subscription')}
                    </PrimaryButton>
                </Grid>
                <Grid  item xs={12} sm={6}>
                    <Button
                        onClick={()=>setOpenCancel(true)}
                        variant="outlined"
                        sx={{
                            width: '100%',
                            color: (theme) =>
                                theme.palette.primary.main,
                        }}
                    >
                        {t('Cancel Subscription')}
                    </Button>
                </Grid>
            </Grid>
            <CustomModal openModal={openPause}
                                setModalOpen={setOpenPause}>
           <ModalView title='Are you sure to pause subscription?' minDate={minDate} maxDate={maxDate} t={t} handleCancel={()=>setOpenPause(false)} handleSuccess={handleSuccessCancelClick}/>

        </CustomModal>
            <CustomModal openModal={openCancel}
                         setModalOpen={setOpenCancel}>
                <ModalView title='Are you sure to cancel subscription?' t={t} handleCancel={()=>setOpenCancel(false)} handleSuccess={handleSuccessCancelClick}/>
            </CustomModal>

        </CustomPaperBigCard>
    );
};

BottomActions.propTypes = {
    
};

export default BottomActions;