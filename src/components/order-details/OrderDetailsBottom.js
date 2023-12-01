import React, { useEffect, useState } from 'react'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import { CustomButton } from '../custom-cards/CustomCards.style'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { useMutation } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import CustomDialogConfirm from '../custom-dialog/confirm/CustomDialogConfirm'
import { onErrorResponse } from '../ErrorResponse'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import CustomModal from '../custom-modal/CustomModal'
import CancelOrder from './CancelOrder'
import { useGetOrderCancelReason } from '../../hooks/react-query/config/order-cancel/useGetCanelReasons'
import DigitalPaymentManage from './DigitalPaymentManage'
import { getGuestId } from "../checkout-page/functions/getGuestUserId";

const OrderDetailsBottom = ({
    id,
    refetchOrderDetails,
    refetchTrackData,
    trackData,
}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalForPayment, setModalOpenForPayment] = useState()
    const [cancelReason, setCancelReason] = useState(null)
    const { t } = useTranslation()
    const theme = useTheme()
    const { data: cancelReasonsData, refetch } = useGetOrderCancelReason()
    useEffect(() => {
        refetch()
    }, [])
    const { mutate: orderCancelMutation, isLoading: orderLoading } =
        useMutation('order-cancel', OrderApi.CancelOrder)
    const handleTrackOrderClick = () => {
        Router.push(`/tracking/${id}`)
    }

    const handleOnSuccess = () => {
        if (!cancelReason) {
            toast.error('Please select a cancellation reason')
        } else {
            const handleSuccess = (response) => {
                //toast.success(response.data.message)
                refetchOrderDetails()
                refetchTrackData()
                setOpenModal(false)
            }
            const formData = {
                guest_id:getGuestId(),
                order_id: id,
                reason: cancelReason,
                _method: 'put',
            }
            orderCancelMutation(formData, {
                onSuccess: handleSuccess,
                onError: onErrorResponse,
            })
        }
    }

    return (
        <>
            <CustomPaperBigCard>
                <Grid container spacing={3}>
                    {trackData &&
                    trackData?.data?.order_status === 'confirmed' ? (
                        <Grid item xs={12} md={12}>
                            <CustomButton
                                variant="contained"
                                onClick={handleTrackOrderClick}
                            >
                                <Typography variant="h5">
                                    {t('Track Order')}
                                </Typography>
                            </CustomButton>
                        </Grid>
                    ) : (
                        <Grid item xs={12} md={6}>
                            <CustomButton
                                variant="contained"
                                onClick={handleTrackOrderClick}
                            >
                                <Typography variant="h5">
                                    {t('Track Order')}
                                </Typography>
                            </CustomButton>
                        </Grid>
                    )}
                    {trackData &&
                    trackData?.data?.order_status === 'pending' &&
                    trackData?.data?.payment_method === 'digital_payment' &&
                    trackData?.data?.payment_status === 'unpaid' ? (
                        <Grid item xs={12} md={6}>
                            <CustomButton
                                variant="outlined"
                                onClick={() => setModalOpenForPayment(true)}
                            >
                                <Typography
                                    variant="h5"
                                    color={theme.palette.primary.main}
                                >
                                    {t(
                                        'Switch to Cash on Delivery or Cancel the order'
                                    )}
                                </Typography>
                            </CustomButton>
                        </Grid>
                    ) : (
                        trackData?.data?.order_status !== 'confirmed' && (
                            <Grid item xs={12} md={6}>
                                <CustomButton
                                    variant="outlined"
                                    onClick={() => setOpenModal(true)}
                                >
                                    <Typography
                                        variant="h5"
                                        color={theme.palette.primary.main}
                                    >
                                        {t('Cancel Order')}
                                    </Typography>
                                </CustomButton>
                            </Grid>
                        )
                    )}
                </Grid>
            </CustomPaperBigCard>
            <CustomModal
                //dialogTexts="Are you sure you want to cancel this order?"
                openModal={openModal}
                setModalOpen={setOpenModal}

                // onSuccess={handleOnSuccess}
            >
                <CancelOrder
                    cancelReason={cancelReason}
                    setCancelReason={setCancelReason}
                    cancelReasonsData={cancelReasonsData}
                    setModalOpen={setOpenModal}
                    handleOnSuccess={handleOnSuccess}
                    orderLoading={orderLoading}
                />
            </CustomModal>
            <CustomModal
                openModal={openModalForPayment}
                setModalOpen={setModalOpenForPayment}
            >
                <DigitalPaymentManage
                    setModalOpenForPayment={setModalOpenForPayment}
                    setModalOpen={setOpenModal}
                    refetchOrderDetails={refetchOrderDetails}
                    refetchTrackData={refetchTrackData}
                    id={trackData?.data?.id}
                />
            </CustomModal>
        </>
    )
}

export default OrderDetailsBottom
