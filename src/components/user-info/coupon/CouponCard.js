import React, { useState } from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { IconButton, Stack, Typography } from '@mui/material'
import CustomImageContainer from '../../CustomImageContainer'
import percentageCoupon from '../../../../public/static/profile/couponper.svg'
import CouponVector from './CouponVector'
import CouponCopy from './CouponCopy'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { getAmount } from '../../../utils/customFunctions'
import { t } from 'i18next'
import CustomCopyWithTooltip from './CustomCopyWithToolTip'
import Card from '@mui/material/Card'
import amount_coupon from '../../../../public/static/profile/amountcoupon.svg'
import { CouponTypography } from '../loyality/Loyality.style'

const CouponCard = ({ coupon }) => {
    const theme = useTheme()
    const valid_until = t('Valid until')
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const imageHandler = () => {
        if (coupon?.discount_type === 'percent') {
            return (
                <CustomImageContainer
                    src={percentageCoupon.src}
                    width="30px"
                    height="30px"
                />
            )
        } else {
            return (
                <Stack position="relative">
                    <CouponTypography>{currencySymbol}</CouponTypography>
                    <CustomImageContainer
                        src={amount_coupon.src}
                        width="30px"
                        height="30px"
                    />
                </Stack>
            )
        }
    }
    return (
        <Card
            elevation={9}
            sx={{
                padding: '.5rem',
                boxShadow:
                    '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.05)',
                position: ' relative',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.cardBackground1
                        : theme.palette.neutral[100],
                '&::after': {
                    position: ' absolute',
                    content: '""',
                    height: '40px',
                    right: '-20px',
                    borderRadius: '40px',
                    zIndex: '1',
                    top: '30%',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.cardBackground2
                            : theme.palette.neutral[200],
                    width: '40px',
                },
                '&::before': {
                    position: ' absolute',
                    content: '""',
                    height: '40px',
                    left: '-20px',
                    borderRadius: '40px',
                    zIndex: '1',
                    top: '30%',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.cardBackground2
                            : theme.palette.neutral[200],
                    width: '40px',
                    boxShadow:
                        '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.05)',
                },
            }}
        >
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                direction="row"
                spacing={2}
            >
                <Stack
                    sx={{ paddingInlineStart: '25px' }}
                    alignItems="center"
                    justifyContent="center"
                >
                    {imageHandler()}
                </Stack>
                <CouponVector />
                <CustomStackFullWidth spacing={0.5} padding="8px">
                    <Typography
                        fontSize={{ xs: '13px', sm: '15px', md: '20px' }}
                        fontWeight="600"
                    >
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
                    {coupon?.coupon_type === 'restaurant_wise' && (
                        <Typography fontSize="12px" fontWeight="500">
                            {coupon?.data}
                        </Typography>
                    )}
                    <Typography
                        fontSize="12px"
                        fontWeight="600"
                        color={theme.palette.neutral[600]}
                    >
                        {coupon?.code}
                    </Typography>
                    <Typography
                        fontSize="9px"
                        fontWeight="500"
                        color={theme.palette.neutral[500]}
                    >
                        {t(`${valid_until} ${coupon.expire_date}`)}
                    </Typography>
                </CustomStackFullWidth>
                <Stack alignSelf="start">
                    <IconButton>
                        <CustomCopyWithTooltip t={t} value={coupon?.code} />
                    </IconButton>
                </Stack>
                {/*<CouponPercentage/>*/}
            </CustomStackFullWidth>
        </Card>
    )
}

export default CouponCard
