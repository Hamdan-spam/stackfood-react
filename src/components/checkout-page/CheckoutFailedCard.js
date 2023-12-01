import React from 'react'
import PropTypes from 'prop-types'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomPaperCard } from '../custom-cards/CustomCards.style'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { setClearCart } from '../../redux/slices/cart'
import {useMutation} from "react-query";
import {OrderApi} from "../../hooks/react-query/config/orderApi";
import {toast} from "react-hot-toast";
import {onErrorResponse} from "../ErrorResponse";

const CheckoutFailedCard = ({id}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleOrderFail = () => {
        dispatch(setClearCart())
        Router.push('/home')
    }
        const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
            useMutation(
                'order-payment-method-update',
                OrderApi.FailedPaymentMethodUpdate
            )

        const handleOnSuccess = () => {
            const handleSuccess = (response) => {
                toast.success(response.data.message)
                dispatch(setClearCart())
                Router.push('/home')
            }
            const formData = {
                order_id: id,
                _method: 'put',
            }
            paymentMethodUpdateMutation(formData, {
                onSuccess: handleSuccess,
                onError: onErrorResponse,
            })

        }

    return (
        <CustomPaperCard>
            <Stack
                width="100%"
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <Typography>
                    {t('Are you agree with this order fail?')}
                </Typography>
                <Button loading={orderLoading} variant="contained" fullWidth onClick={handleOnSuccess}>
                    {t('Switch to Cash On Delivery')}
                </Button>
                <Button variant="contained" fullWidth onClick={handleOrderFail}>
                    {t('Continue with Order Fail')}
                </Button>
            </Stack>
        </CustomPaperCard>
    )
}

CheckoutFailedCard.propTypes = {}

export default CheckoutFailedCard
