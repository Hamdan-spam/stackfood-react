import React from 'react'
import { alpha, Button, Grid, Stack, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import Link from 'next/link'

import {
    ButtonTypography,
    DateTypography,
    OrderAmountTypography,
    OrderBox,
    OrderIdTypography,
    PendingButton,
    SuccessButton,
    TrackButton,
    TrackhButton,
} from './OrderHistory.style'
import { getAmount, getDateFormat } from '../../utils/customFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import CustomImageContainer from '../CustomImageContainer'
import { Box } from '@mui/system'
import {
    setDeliveryManInfoByDispatch,
    setOrderDetailsByDispatch,
} from '../../redux/slices/searchFilter'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import startReview from '../../../public/static/star-review.png'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
const OrderCard = ({ order, index, isXs, offset, limit }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantImage = global?.base_urls?.restaurant_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const dispatch = useDispatch()
    const handleClick = () => {
        if (order?.delivery_man) {
            dispatch(setDeliveryManInfoByDispatch(order?.delivery_man))
        }
        router.push(`/order-history/${order?.id}`)
    }
    const serialNumber = (offset - 1) * limit + index + 1
    const handleClickTrackOrder = () => {
        if (order?.delivery_man) {
            dispatch(setDeliveryManInfoByDispatch(order?.delivery_man))
        }
        router.push(`/tracking/${order?.id}`)
    }
    const handleRateButtonClick = () => {
        router.push(`/rate-and-review/${order?.id}`)
    }
    const deliveredInformation = () => (
        <>
            <Button
                onClick={() => handleRateButtonClick()}
                variant="outlined"
                sx={{
                    backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.2),
                    p: {
                        xs: '5px',
                        sm: '5px',
                        md: '6px',
                    },
                }}
            >
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                >
                    <CustomImageContainer
                        src={startReview.src}
                        width="25px"
                        height="25px"
                    />
                    <CustomColouredTypography color="primary">
                        {t('Give Review')}
                    </CustomColouredTypography>
                </Stack>
            </Button>
        </>
    )
    const notDeliveredInformation = () => (
        <CustomStackFullWidth
            spacing={1}
            alignItems={{ xs: 'flex-end', md: 'center' }}
        >
            {order?.order_status !== 'delivered' &&
                order?.order_status !== 'failed' &&
                order?.order_status !== 'canceled' &&
                order?.order_status !== 'refund_requested' &&
                order?.order_status !== 'refunded' && (
                    <Stack flexWrap="wrap">
                        <TrackButton
                            size="small"
                            onClick={() => handleClickTrackOrder()}
                        >
                            <LocalShippingIcon sx={{ fontSize: '14px' }} />
                            {t('Track Order')}
                        </TrackButton>
                    </Stack>
                )}
        </CustomStackFullWidth>
    )
    const themeColor = theme.palette.success.main
    return (
        <>
            <Card
                padding="1rem"
                sx={{
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? (theme) => theme.palette.cardBackground1
                            : (theme) => theme.palette.neutral[200],
                    padding: '1rem',
                    width: '100%',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                }}
            >
                <Grid container alignItems="center" spacing={1}>
                    {!isXSmall && (
                        <Grid item xs={2} sm={1} md={1} textAlign="center">
                            {serialNumber}
                        </Grid>
                    )}

                    <Grid item xs={10} sm={5} md={5}>
                        <CustomStackFullWidth
                            direction="row"
                            spacing={2}
                            onClick={handleClick}
                        >
                            <CustomImageContainer
                                src={`${restaurantImage}/${order?.restaurant?.logo}`}
                                width="60px"
                                height="60px"
                                borderRadius="5px"
                                objectFit="cover"
                            />
                            <Stack>
                                <Typography fontSize="14px" fontWeight="600">
                                    {order?.restaurant?.name}
                                </Typography>
                                <CustomColouredTypography
                                    fontSize="12px"
                                    fontWeight="400"
                                    sx={{
                                        textTransform: ' capitalize',
                                        color:
                                            order?.order_status ===
                                                'delivered' && themeColor,
                                    }}
                                >
                                    {order?.order_status === 'failed'
                                        ? t('Payment Failed')
                                        : t(order?.order_status).replaceAll(
                                              '_',
                                              ' '
                                          )}
                                </CustomColouredTypography>
                                <Typography
                                    fontSize="12px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[400]}
                                >
                                    {order?.order_status == 'delivered' ? (
                                        <CustomFormatedDateTime
                                            date={order?.delivered}
                                        />
                                    ) : (
                                        <CustomFormatedDateTime
                                            date={order?.created_at}
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={4} sm={3} md={3}>
                        <Typography
                            fontSize="16px"
                            fontWeight="500"
                            textAlign={isXSmall ? 'left' : 'center'}
                        >
                            {getAmount(
                                order?.order_amount,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={3} md={3} align="right">
                        {order?.order_status == 'delivered'
                            ? deliveredInformation()
                            : notDeliveredInformation()}
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default OrderCard
