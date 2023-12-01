import React, {useEffect, useState} from 'react';
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {CustomTypography} from "../../custom-tables/Tables.style";
import {Box, Button, Grid, Stack, styled, Typography} from "@mui/material";
import {FormatedDateWithTimeAnotherType, getDateFormatAnotherWay} from "../../../utils/customFunctions";
import CustomModal from "../../custom-modal/CustomModal";
import Logs from "./Logs";
import {useGeLogs} from "../../../hooks/react-query/subscription/useGeLogs";
import SubscriptionSchedules from "./SubscriptionSchedules";

const StatusColor = styled(Box)(({theme, status}) => ({
    backgroundColor: status === 'active' ? theme.palette.success.main : theme.palette.error.main,
    height: '10px',
    width: '10px',
    borderRadius: '50%'

}))

const SubscriptionDetails = props => {
    const {
        subscriptionData,
        t,
        subscriptionSchedules,
        orderId,
        paymentMethod,
        subscriptionCancelled,
        subscriptionCancellationReason,
        subscriptionCancellationNote,
        subscriptionOrderNote

    } = props
    const [openDeliveryLog, setOpenDeliveryLog] = useState(false)
    const [openPauseLog, setOpenPauseLog] = useState(false)
    const [deliveryOffset, setDeliveryOffset] = useState(1)
    const [pauseOffset, setPauseOffset] = useState(1)
    const {refetch, data, isRefetching} = useGeLogs('delivery-log', deliveryOffset, subscriptionData?.id)
    const {
        refetch: pauseLogRefetch, data: pauseLogData, isRefetching: isPauseRefetching
    } = useGeLogs('pause-log', pauseOffset, subscriptionData?.id)
    useEffect(() => {
        openDeliveryLog && refetch()

    }, [openDeliveryLog, deliveryOffset])
    useEffect(() => {
        openPauseLog && pauseLogRefetch()
    }, [openPauseLog, pauseOffset])
    return (<CustomStackFullWidth sx={{
        mb: '1rem', background: theme => theme.palette.neutral[200], borderRadius: '14px', padding: '20px'
    }}>
        <Grid container spacing={2}>
            <Grid item xs={12} align='center'>
                <CustomTypography variant="h4">
                    {t('Subscription Details')}
                </CustomTypography>
            </Grid>
            <Grid item xs={12}>
                <CustomStackFullWidth spacing={1}>
                    <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                          flexWrap='wrap'>
                        <Typography variant="h5">
                            {t('Payment method')}
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: '700',
                                color: (theme) => theme.palette.primary.main,
                                textTransform: 'capitalize',
                            }}
                            align="left"
                        >
                            {paymentMethod && t(paymentMethod).replaceAll('_', ' ')}
                        </Typography>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                          flexWrap='wrap'>
                        <Typography variant="h5">
                            {t('Subscription status:')}
                        </Typography>
                        <Stack direction='row' alignItems='center' spacing={.5}>
                            <StatusColor status={subscriptionData?.status}/>
                            <Typography variant="h5">
                                {subscriptionData?.status}
                            </Typography>
                        </Stack>
                    </CustomStackFullWidth>
                    {subscriptionCancelled &&
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                              gap='8px'
                                              flexWrap='wrap'>
                            <Typography variant="h5">
                                {t('Subscription cancelled by:')}
                            </Typography>
                            <Stack direction='row' alignItems='center' spacing={.5}>
                                <Typography variant="h5">
                                    {subscriptionCancelled}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>}
                    {subscriptionCancellationReason &&
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                              gap='8px'
                                              flexWrap='wrap'>
                            <Typography variant="h5">
                                {t('Cancellation reason:')}
                            </Typography>
                            <Stack direction='row' alignItems='center' spacing={.5}>
                                <Typography variant="h5" color='red'>
                                    {subscriptionCancellationReason}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>}
                    {
                        subscriptionCancellationNote && <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                                                              gap='8px'
                                                                              flexWrap='wrap'>
                            <Typography variant="h5">
                                {t('Cancellation note:')}
                            </Typography>
                            <Stack direction='row' alignItems='center' spacing={.5}>
                                <Typography variant="h5" >
                                    {subscriptionCancellationNote}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                    }
                    {
                        subscriptionOrderNote && <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                                                              gap='8px'
                                                                              flexWrap='wrap'>
                            <Typography variant="h5">
                                {t('Order note:')}
                            </Typography>
                            <Stack direction='row' alignItems='center' spacing={.5}>
                                <Typography variant="h5" >
                                    {subscriptionOrderNote}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                    }
                    <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                          flexWrap='wrap'>
                        <Typography variant="h5">
                            {t('Order id:')}
                        </Typography>
                        <Typography variant="h5">
                            {`#${orderId}`}
                        </Typography>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                          flexWrap='wrap'>
                        <Typography variant="h5">
                            {t('Created at:')}
                        </Typography>
                        <Typography variant="h5">
                            {FormatedDateWithTimeAnotherType(subscriptionData?.created_at)}
                        </Typography>
                    </CustomStackFullWidth>


                    <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                          flexWrap='wrap'>
                        <Typography variant="h5">
                            {t('Subscription date:')}
                        </Typography>
                        <Typography
                            variant="h5">{getDateFormatAnotherWay(subscriptionData?.start_at)} - {getDateFormatAnotherWay(subscriptionData?.end_at)}
                        </Typography>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                          flexWrap='wrap'>
                        <Typography variant="h5">
                            {t('Subscription type:')}
                        </Typography>
                        <Typography variant="h5" textTransform='capitalize'>{subscriptionData?.type}
                        </Typography>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth spacing={1}>
                        <Typography variant="h5">
                            {t('Subscription Schedule:')}
                        </Typography>
                        <SubscriptionSchedules subscriptionSchedules={subscriptionSchedules} t={t}/>

                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button onClick={() => setOpenDeliveryLog(true)} fullWidth variant='outlined'
                        sx={{color: 'primary.main'}}>
                    {t('Delivery Log')}
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button onClick={() => setOpenPauseLog(true)} fullWidth variant='outlined' sx={{color: 'primary.main'}}>
                    {t('Pause Log')}
                </Button>
            </Grid>
        </Grid>
        <CustomModal openModal={openDeliveryLog}
                     setModalOpen={setOpenDeliveryLog}>
            <Logs title='Delivery Log' t={t} logs={data} offset={deliveryOffset} setOffset={setDeliveryOffset}
                  isRefetching={isRefetching}/>

        </CustomModal>
        <CustomModal openModal={openPauseLog}
                     setModalOpen={setOpenPauseLog}>
            <Logs title='Pause Log' t={t} logs={pauseLogData} offset={pauseOffset} setOffset={setPauseOffset}
                  isRefetching={isPauseRefetching}/>
        </CustomModal>
    </CustomStackFullWidth>);
};

SubscriptionDetails.propTypes = {};

export default SubscriptionDetails;