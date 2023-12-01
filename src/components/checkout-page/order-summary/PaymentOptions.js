import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Stack, Typography } from '@mui/material'
import {
    PaymentButton,
    PaymentOptionGrid,
    PymentTitle,
} from '../CheckOut.style'
import cash from '../../../../public/static/buttonImg/cashonbtn.png'
import digital from '../../../../public/static/buttonImg/digitalbtn.png'
import wallet from '../../../../public/static/buttonImg/walletbtn.png'
import { useTranslation } from 'react-i18next'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import {
    CustomCheckBoxStack,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import placeholder from '../../../../public/static/no-image-found.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import CustomDivider from '../../CustomDivider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CustomModal from '../../custom-modal/CustomModal'
import AllPaymentMethod from '../AllPaymentMethod'
import OfflinePayment from '../assets/OfflinePayment'
import { useDispatch, useSelector } from "react-redux";
import { setOfflineInfoStep, setOfflineMethod } from '../../../redux/slices/OfflinePayment'

const PaymentOptions = (props) => {
    const theme = useTheme()
    const {
        global,
        paymenMethod,
        setPaymenMethod,
        subscriptionStates,
        usePartialPayment,
        selected,
        setSelected,
        paymentMethodDetails,
        setPaymentMethodDetails,
        setSwitchToWallet,
        offlinePaymentOptions,
    } = props
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false)
    const { offLineWithPartial } = useSelector((state) => state.offlinePayment);
    const [isCheckedOffline, setIsCheckedOffline] = useState(selected?.method === "offline_payment" ? true : false);
    const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
    useEffect(() => {
        if (offlineInfoStep === 2) {
            dispatch(setOfflineInfoStep(1))
        }
    }, [])
    useEffect(() => {
        if (!selected?.method) {
            setIsCheckedOffline(false)
        }
    }, [selected])


    const imageUrl = global?.base_urls?.gateway_image_url
    const getPaymentMethod = (item) => {
        setSelected(item)
    }

    const handleClick = () => {
        setOpenModal(true)
    }
    const handleSubmit = () => {
        if (selected?.name === 'wallet') {
            setPaymenMethod(selected?.name)
            setPaymentMethodDetails(selected)
            setOpenModal(false)
            setSwitchToWallet(true)
            dispatch(setOfflineInfoStep(0))
            setIsCheckedOffline(false)
        } else if (selected?.method === "offline_payment") {
            setPaymenMethod(selected);
            setPaymentMethodDetails(selected);
            dispatch(setOfflineMethod(selected))
            setOpenModal(false);
            setSwitchToWallet(false);
            dispatch(setOfflineInfoStep(1));
            setIsCheckedOffline(true);
        } else {
            setPaymenMethod(selected?.name)
            setPaymentMethodDetails(selected)
            setOpenModal(false)
            setSwitchToWallet(false)
            dispatch(setOfflineInfoStep(0))
            setIsCheckedOffline(false)
        }
    }

    return (
        <CustomPaperBigCard nopadding="true">
            <Grid container>
                <Grid item xs={12} md={12}>
                    <CustomStackFullWidth
                        justifyContent="space-between"
                        direction="row"
                        padding="19px 16px 3px 16px"
                    >
                        <PymentTitle>{t('Payment Options')}</PymentTitle>
                        <BorderColorOutlinedIcon
                            onClick={handleClick}
                            color="primary"
                            style={{ cursor: 'pointer' }}
                        />
                    </CustomStackFullWidth>
                </Grid>
                <CustomDivider />
                <CustomStackFullWidth
                    direction="row"
                    padding="16px"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleClick}
                >
                    {paymentMethodDetails?.name ? (
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                        >
                            {paymentMethodDetails?.name === 'wallet' ||
                                paymentMethodDetails?.name ===
                                'cash_on_delivery' ? (
                                <CustomImageContainer
                                    maxWidth="100%"
                                    width="unset"
                                    height="32px"
                                    objectfit="contain"
                                    src={paymentMethodDetails?.image.src}
                                />
                            ) : (
                                <>
                                    {paymentMethodDetails?.method === 'offline_payment' ? (<OfflinePayment />)
                                        : (
                                            <CustomImageContainer
                                                maxWidth="100%"
                                                width="unset"
                                                height="32px"
                                                objectfit="contain"
                                                src={`${imageUrl}/${paymentMethodDetails?.image}`}
                                            />
                                        )

                                    }
                                </>
                            )
                            }
                            <Typography
                                fontSize="14px"
                                fontWeight="500"
                                color={theme.palette.primary.main}
                                textTransform="capitalize"
                            >
                                {paymentMethodDetails?.method ? `${paymentMethodDetails?.method?.replaceAll('_', ' ')} (${paymentMethodDetails?.name})` : paymentMethodDetails?.name?.replaceAll('_', ' ')}
                            </Typography>
                        </Stack>
                    ) : (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AddCircleOutlineIcon
                                style={{ width: '22px', height: '22px' }}
                                color="primary"
                            />
                            <Typography
                                fontSize="14px"
                                fontWeight="500"
                                color={theme.palette.primary.main}
                            >
                                {t('Add Payment Method')}
                            </Typography>
                        </Stack>
                    )}
                </CustomStackFullWidth>
                {openModal && (
                    <CustomModal
                        openModal={openModal}
                        handleClose={() => setOpenModal(false)}
                        setModalOpen={setOpenModal}
                        maxWidth="640px"
                        bgColor={theme.palette.customColor.ten}
                    >
                        <AllPaymentMethod
                            handleClose={() => setOpenModal(false)}
                            paymenMethod={paymenMethod}
                            usePartialPayment={usePartialPayment}
                            global={global}
                            setPaymenMethod={setPaymenMethod}
                            getPaymentMethod={getPaymentMethod}
                            setSelected={setSelected}
                            selected={selected}
                            handleSubmit={handleSubmit}
                            subscriptionStates={subscriptionStates}
                            offlinePaymentOptions={offlinePaymentOptions}
                            setIsCheckedOffline={setIsCheckedOffline}
                            isCheckedOffline={isCheckedOffline}
                            offLineWithPartial={offLineWithPartial}
                            paymentMethodDetails={paymentMethodDetails}
                        />
                    </CustomModal>
                )}
            </Grid>
        </CustomPaperBigCard>
    )
}

PaymentOptions.propTypes = {}

export default PaymentOptions
