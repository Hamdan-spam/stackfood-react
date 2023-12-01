import React, { useEffect, useState } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import {
    getAmount,
    getCalculatedTotal,
    getCouponDiscount,
    getDeliveryFees,
    getProductDiscount,
    getSubTotalPrice,
    getTaxableTotalPrice,
    rainySeasonCharge,
    truncate,
} from '../../../utils/customFunctions'
import { CalculationGrid, TotalGrid } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setCouponType } from '../../../redux/slices/global'
import { useTheme } from '@mui/material/styles'
import CustomDivider from '../../CustomDivider'
import {
    setSubcreitionSubTottal,
    setSubscriptionSubTotal,
    setTotalAmount,
} from '../../../redux/slices/cart'
import { getSubscriptionOrderCount } from '../functions/getSubscriptionOrderCount'
import PlaceOrder from './PlaceOrder'
import HaveCoupon from '../HaveCoupon'

const OrderCalculation = (props) => {
    const {
        subscriptionStates,
        cartList,
        restaurantData,
        couponDiscount,
        taxAmount,
        distanceData,
        total_order_amount,
        global,
        orderType,
        couponInfo,
        deliveryTip,
        origin,
        destination,
        extraCharge,
        additionalCharge,
        usePartialPayment,
        walletBalance,
        totalAmount,
        placeOrder,
        orderLoading,
        offlinePaymentLoading,
        checked,
        setCouponDiscount,
        counponRemove,
        offlineFormRef,
        page,
        paymentMethodDetails,
    } = props
    const { couponType, zoneData } = useSelector(
        (state) => state.globalSettings
    )
    const { offLineWithPartial } = useSelector((state) => state.offlinePayment);
    const { token } = useSelector((state) => state.userToken)
    const tempExtraCharge = extraCharge ?? 0
    const { t } = useTranslation()
    const [freeDelivery, setFreeDelivery] = useState('false')
    const theme = useTheme()

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const languageDirection = localStorage.getItem('direction')
    const subscriptionOrderCount = getSubscriptionOrderCount(
        restaurantData?.data?.schedules,
        subscriptionStates?.type,
        subscriptionStates?.startDate,
        subscriptionStates?.endDate,
        subscriptionStates?.days
    )
    const totalPrice = getCalculatedTotal(
        cartList,
        couponDiscount,
        restaurantData,
        global,
        distanceData,
        couponType,
        orderType,
        freeDelivery,
        deliveryTip,
        zoneData,
        origin,
        destination,
        tempExtraCharge,
        additionalCharge
    )

    const handleDeliveryFee = () => {
        // const restaurantChargeInfo = zoneData?.find(
        //     (item) =>
        //         Number.parseInt(item.id) ===
        //         Number.parseInt(restaurantData?.data?.zone_id)
        // )
        let price = getDeliveryFees(
            restaurantData,
            global,
            cartList,
            distanceData?.data,
            couponDiscount,
            couponType,
            orderType,
            zoneData,
            origin,
            destination,
            tempExtraCharge
        )
        if (price === 0) {
            return <Typography variant="h4">{t('Free')}</Typography>
        } else {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={0.5}
                    width="100%"
                >
                    <Typography variant="h4">{'(+)'}</Typography>
                    <Typography variant="h4">
                        {restaurantData &&
                            getAmount(
                                price,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                    </Typography>
                </Stack>
            )
        }
    }
    const handleCouponDiscount = () => {
        let couponDiscountValue = getCouponDiscount(
            couponDiscount,
            restaurantData,
            cartList
        )
        if (couponDiscount && couponDiscount.coupon_type === 'free_delivery') {
            setFreeDelivery('true')
            return 0
        } else {
            let discount = getAmount(
                couponDiscountValue,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
            return discount
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCouponType(''))
    }, [])

    const handleOrderAmount = () => {
        let totalAmount = 0
        if (subscriptionOrderCount > 0) {
            totalAmount =
                truncate(totalPrice.toString(), digitAfterDecimalPoint) *
                subscriptionOrderCount
        } else {
            totalAmount = totalPrice
        }

        dispatch(setTotalAmount(totalAmount))
        return getAmount(
            totalAmount,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
        )
    }

    const handleOrderAmountWithoutSubscription = () => {
        return getAmount(
            totalPrice,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
        )
    }

    useEffect(() => {
        if (subscriptionStates?.order === '1') {
            dispatch(
                setSubscriptionSubTotal(handleOrderAmountWithoutSubscription())
            )
        }
    }, [subscriptionStates])
    const totalAmountAfterPartial = totalPrice - walletBalance

    const vat = t('VAT/TAX')

    return (
        <>
            <CalculationGrid container item md={12} xs={12} spacing={1}>
                <Grid item md={8} xs={8}>
                    {subscriptionOrderCount > 0
                        ? t('Items price')
                        : t('Subtotal')}
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={4}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                >
                    <Typography variant="h4">
                        {getAmount(
                            getSubTotalPrice(cartList),
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    {t('Discount')}
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={0.5}
                    >
                        <Typography variant="h4">{'(-)'}</Typography>
                        <Typography variant="h4">
                            {restaurantData &&
                                getAmount(
                                    getProductDiscount(
                                        cartList,
                                        restaurantData
                                    ),
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                        </Typography>
                    </Stack>
                </Grid>
                {couponDiscount && (
                    <>
                        <Grid item md={8} xs={8}>
                            {t('Coupon Discount')}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            {couponDiscount.coupon_type === 'free_delivery' ? (
                                <p>{t('Free Delivery')}</p>
                            ) : (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography variant="h4">
                                        {'(-)'}
                                    </Typography>
                                    <Typography variant="h4">
                                        {restaurantData &&
                                            cartList &&
                                            handleCouponDiscount()}
                                    </Typography>
                                </Stack>
                            )}
                        </Grid>
                    </>
                )}
                {(restaurantData &&
                    restaurantData?.data &&
                    restaurantData?.data?.tax) ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {`${vat} (${restaurantData?.data?.tax}% ${global?.tax_included === 1
                                ? t('Included')
                                : t('Excluded')
                                })`}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography variant="h4">
                                    {global?.tax_included === 1
                                        ? ''
                                        : '(+)'}
                                </Typography>
                                <Typography variant="h4">
                                    {restaurantData &&
                                        getAmount(
                                            getTaxableTotalPrice(
                                                cartList,
                                                couponDiscount,
                                                restaurantData
                                            ),
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null}
                {(Number.parseInt(global?.dm_tips_status) === 1 &&
                    orderType !== 'take_away' &&
                    deliveryTip > 0) ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t('Deliveryman tips')}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography variant="h4">
                                    {'(+)'}
                                </Typography>
                                <Typography variant="h4">
                                    {getAmount(
                                        deliveryTip,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null}
                {Number.parseInt(global?.additional_charge_status) === 1 ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t(global?.additional_charge_name)}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography variant="h4">{'(+)'}</Typography>
                                <Typography variant="h4">
                                    {getAmount(
                                        global?.additional_charge,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null}
                {orderType !== 'take_away' && (
                    <Grid item md={8} xs={8}>
                        {t('Delivery fee')}
                    </Grid>
                )}

                {orderType !== 'take_away' && (
                    <Grid item md={4} xs={4} align="right">
                        {orderType === 'delivery' ? (
                            couponDiscount ? (
                                couponDiscount?.coupon_type ===
                                    'free_delivery' ? (
                                    <Typography fontWeight="700">{t('Free')}</Typography>
                                ) : (
                                    restaurantData && handleDeliveryFee()
                                )
                            ) : (
                                restaurantData && handleDeliveryFee()
                            )
                        ) : (
                            <Typography fontWeight="700">{t('Free')}</Typography>
                        )}
                        {/*{couponDiscount ? (*/}
                        {/*    couponDiscount?.coupon_type === 'free_delivery' ? (*/}
                        {/*        <p>{t('Free')}</p>*/}
                        {/*    ) : (*/}
                        {/*        restaurantData && handleDeliveryFee()*/}
                        {/*    )*/}
                        {/*) : (*/}
                        {/*    restaurantData && handleDeliveryFee()*/}
                        {/*)}*/}
                    </Grid>
                )}
                <Grid item md={12} xs={12} marginTop="10px">
                    {restaurantData?.data && token && (
                        <HaveCoupon
                            restaurant_id={restaurantData?.data?.id}
                            setCouponDiscount={setCouponDiscount}
                            counponRemove={counponRemove}
                            couponDiscount={couponDiscount}
                            cartList={cartList}
                            total_order_amount={total_order_amount}
                        />
                    )}
                </Grid>
                <CustomDivider />
                {subscriptionOrderCount > 0 && (
                    <>
                        <TotalGrid container md={12} xs={12} mt="1rem">
                            <Grid item md={8} xs={8} pl=".5rem">
                                <Typography>{t('Subtotal')}</Typography>
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={4}
                                align={
                                    languageDirection === 'rtl'
                                        ? 'left'
                                        : 'right'
                                }
                            >
                                <Typography>
                                    {restaurantData &&
                                        cartList &&
                                        handleOrderAmountWithoutSubscription()}
                                </Typography>
                            </Grid>
                        </TotalGrid>
                        <Grid item md={8} xs={8}>
                            <Typography color={theme.palette.primary.main}>
                                {t('Subscription Order Count')}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={4}
                            align={
                                languageDirection === 'rtl' ? 'left' : 'right'
                            }
                        >
                            <Typography variant="h4">
                                {getSubscriptionOrderCount(
                                    restaurantData?.data?.schedules,
                                    subscriptionStates.type,
                                    subscriptionStates.startDate,
                                    subscriptionStates.endDate,
                                    subscriptionStates.days
                                )}
                            </Typography>
                        </Grid>
                        <CustomDivider />
                    </>
                )}

                <TotalGrid container md={12} xs={12} mt="1rem">
                    <Grid item md={8} xs={8} pl=".5rem">
                        <Typography color={theme.palette.primary.main}>
                            {t('Total')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        xs={4}
                        align={languageDirection === 'rtl' ? 'left' : 'right'}
                    >
                        <Typography color={theme.palette.primary.main}>
                            {restaurantData && cartList && handleOrderAmount()}
                        </Typography>
                    </Grid>
                </TotalGrid>
                {(usePartialPayment || offLineWithPartial) &&
                    totalAmount > walletBalance &&
                    subscriptionStates?.order !== '1' ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t('Paid by wallet')}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography>{'(-)'}</Typography>
                                <Typography>
                                    {getAmount(
                                        walletBalance,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null}
                {(usePartialPayment || offLineWithPartial) &&
                    totalAmount > walletBalance &&
                    subscriptionStates?.order !== '1' ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t('Due Payment')}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography>
                                    {getAmount(
                                        totalAmountAfterPartial,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null}
                <Grid md={12}>
                    <PlaceOrder
                        usePartialPayment={usePartialPayment}
                        placeOrder={placeOrder}
                        orderLoading={orderLoading}
                        checked={checked}
                        offlinePaymentLoading={offlinePaymentLoading}
                        offlineFormRef={offlineFormRef}
                        page={page}
                        paymentMethodDetails={paymentMethodDetails}
                    />
                </Grid>
            </CalculationGrid>
        </>
    )
}

OrderCalculation.propTypes = {}

export default OrderCalculation
