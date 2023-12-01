import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Stack } from '@mui/system'
import { alpha, Grid, IconButton, Typography } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import couponimage from '../../../public/static/rescoupon.svg'
import { useTheme } from '@mui/material/styles'
import CustomCopyWithTooltip from '../user-info/coupon/CustomCopyWithToolTip'
import { t } from 'i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { formatedDate, getAmount } from '../../utils/customFunctions'
import { useSelector } from 'react-redux'
import { CouponCodeBorderBox, CouponStack } from './restaurant-details.style'

const RestaurantCoupon = ({ coupon }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const borderColor = theme.palette.primary.main
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    return (
        <CouponStack>
            <Grid container>
                <Grid
                    item
                    xs={4}
                    sm={4}
                    md={5}
                    sx={{ padding: '5px' }}
                    alignSelf="center"
                >
                    <CustomImageContainer
                        src={couponimage.src}
                        width="26px"
                        height="26px"
                    />
                    <Typography
                        color={theme.palette.neutral[1000]}
                        fontSize={{ xs: "18px", sm: "20px", md: "22px" }}
                        fontWeight="700"
                    >
                        {' '}
                        {coupon?.coupon_type === 'free_delivery'
                            ? 'Free Delivery'
                            : coupon?.discount_type === 'percent'
                            ? `${coupon?.discount} %`
                            : getAmount(
                                  coupon.discount,
                                  currencySymbolDirection,
                                  currencySymbol,
                                  digitAfterDecimalPoint
                              )}{' '}
                        {coupon?.coupon_type === 'free_delivery'
                            ? ''
                            : t('OFF')}
                    </Typography>
                    <Typography fontSize="14px" fontWeight="500">
                        {coupon?.coupon_type === 'fast_order' &&
                            t('On First Order')}
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={7} justifySelf="center">
                    <CustomStackFullWidth
                        spacing={1}
                        sx={{ padding: '5px', position: 'relative' }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-5px',
                            }}
                        >
                            <CustomCopyWithTooltip t={t} value={coupon?.code} />
                        </IconButton>
                        <CouponCodeBorderBox borderColor={borderColor}>
                            <Typography
                                textAlign="center"
                                color={theme.palette.primary.main}
                                fontSize="12px"
                                fontWeight="600"
                            >
                                {coupon?.code}
                            </Typography>
                            <Stack
                                backgroundColor={theme.palette.primary.main}
                                width="80px"
                                paddingY="5px"
                                paddingX="10px"
                                alignItems="center"
                                sx={{
                                    borderRadius: '8px',
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '50%',
                                    transform: 'translateX(50%)',
                                }}
                            >
                                <Typography
                                    fontSize="9px"
                                    fontWeight="600"
                                    color={theme.palette.neutral[100]}
                                >
                                    {t('Coupon Code')}
                                </Typography>
                            </Stack>
                        </CouponCodeBorderBox>
                        <CustomStackFullWidth
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                color={theme.palette.neutral[1000]}
                                fontSize="13px"
                                fontWeight="500"
                            >
                                {formatedDate(coupon?.start_date)} {t('to')}{' '}
                                {formatedDate(coupon?.expire_date)}
                            </Typography>
                            {/*<Typography color={theme.palette.neutral[1000]} fontSize="12px">*/}
                            {/*    Available from  8:30 AM - 4:30 PM*/}
                            {/*</Typography>*/}
                        </CustomStackFullWidth>
                    </CustomStackFullWidth>
                </Grid>
            </Grid>
        </CouponStack>
    )
}

export default RestaurantCoupon
