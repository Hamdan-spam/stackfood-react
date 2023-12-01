import React from 'react'
import { DeliveryCaption } from '../CheckOut.style'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { Box } from '@mui/system'
import { Stack, Typography } from '@mui/material'
import CustomImageContainer from '../../CustomImageContainer'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Form from './Form'
import { orderTypes } from './data'
import { ACTIONS } from '../states'

const OrderType = (props) => {
    const {
        t,
        subscriptionStates,
        subscriptionDispatch,
        setDeliveryTip,
        setPaymenMethod,
        setPaymentMethodDetails,
        setUsePartialPayment,
        setSwitchToWallet,
    } = props

    const handleClick = (item) => {
        if (item?.name === 'Subscription Order') {
            setDeliveryTip(0)
            setPaymentMethodDetails({ name: '', image: '' })
            setPaymenMethod('')
            setUsePartialPayment(false)
            setSwitchToWallet(false)
        }
        subscriptionDispatch({
            type: ACTIONS.setSubscriptionOrder,
            payload: item?.value,
        })
    }
    return (
        <CustomStackFullWidth>
            <DeliveryCaption id="demo-row-radio-buttons-group-label">
                {t('Order Type')}
            </DeliveryCaption>
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                flexWrap="wrap"
                gap="15px"
            >
                {orderTypes?.map((item) => (
                    <Box
                        onClick={() => handleClick(item)}
                        key={item.value}
                        sx={{
                            border: '1px solid',
                            borderColor: (theme) =>
                                subscriptionStates.order === item?.value
                                    ? theme.palette.primary.main
                                    : theme.palette.neutral[400],
                            borderRadius: '4px',
                            padding: '10px 15px',
                            boxShadow: (theme) =>
                                `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
                            cursor: 'pointer',
                            position: 'relative',
                            width: '220px',
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CustomImageContainer
                                src={item?.img.src}
                                alt={item?.name}
                                width="30px"
                                height="30px"
                                objectFit="contained"
                            />
                            <Stack>
                                <Typography>{t(item?.name)}</Typography>
                                <Typography variant="subtitle2">
                                    {t('Place an order and enjoy')}
                                </Typography>
                            </Stack>
                        </Stack>
                        {subscriptionStates.order === item?.value && (
                            <CheckCircleIcon
                                sx={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    color: 'primary.main',
                                }}
                            />
                        )}
                    </Box>
                ))}
            </CustomStackFullWidth>
            <CustomStackFullWidth mt="1.5rem">
                {subscriptionStates.order === orderTypes[1]?.value && (
                    <Form
                        t={t}
                        subscriptionStates={subscriptionStates}
                        subscriptionDispatch={subscriptionDispatch}
                    />
                )}
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

OrderType.propTypes = {}

export default OrderType
