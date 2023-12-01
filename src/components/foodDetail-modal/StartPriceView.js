import React from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import { getAmount, getConvertDiscount } from '../../utils/customFunctions'
import {
    CustomChip,
    FoodTitleTypography,
    PricingCardActions,
} from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { CustomTypography } from '../custom-tables/Tables.style'
import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles'

const StartPriceView = (props) => {
    const theme = useTheme()
    const {
        data,
        hideStartFromText,
        fontSize,
        marginFoodCard,
        handleBadge,
        available_date_ends,
    } = props
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const bgColor = theme.palette.secondary.light
    const chipColor = theme.palette.neutral[100]
    const languageDirection = localStorage.getItem('direction')
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const handleConvertedPrice = () => {
        if (data?.restaurant_discount === 0) {
            return getAmount(
                getConvertDiscount(
                    data.discount,
                    data.discount_type,
                    data.price,
                    data.restaurant_discount
                ),
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        } else {
            let price =
                data.price - (data.price * data.restaurant_discount) / 100
            return getAmount(
                price,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        }
    }
    // const handleBadge = () => {
    //     if (Number.parseInt(data?.restaurant_discount) === 0) {
    //         if (Number.parseInt(data?.discount) > 0) {
    //             if (data?.discount_type === 'percent') {
    //                 return <CustomChip label={`- ${data?.discount} %`} />
    //             } else {
    //                 return (
    //                     <CustomChip
    //                         label={`- ${getAmount(
    //                             data?.discount,
    //                             currencySymbolDirection,
    //                             currencySymbol,
    //                             digitAfterDecimalPoint
    //                         )}`}
    //                     />
    //                 )
    //             }
    //         }
    //     } else {
    //         if (Number.parseInt(data?.restaurant_discount) > 0) {
    //             if (data?.discount_type === 'percent') {
    //                 return (
    //                     <CustomChip label={`${data?.restaurant_discount}  %`} />
    //                 )
    //             } else {
    //                 return (
    //                     <CustomChip
    //                         label={`- ${getAmount(
    //                             data?.restaurant_discount,
    //                             currencySymbolDirection,
    //                             currencySymbol,
    //                             digitAfterDecimalPoint
    //                         )}`}
    //                     />
    //                 )
    //             }
    //         }
    //     }
    // }

    const handleDiscountedPriceView = () => {
        if (data.discount > 0) {
            return (
                <CustomTypography variant={fontSize ? fontSize : 'h4'}>
                    {data?.price > 0 &&
                        getAmount(
                            data.price,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                </CustomTypography>
            )
        }
    }
    return (
        <Stack
            direction="row"
            spacing={hideStartFromText === 'false' ? 1 : 0.5}
            alignItems="center"
            flexWrap="wrap"
        >
            {hideStartFromText === 'false' && (
                <Typography>{t('Starts From:')}</Typography>
            )}
            <Typography
                display="flex"
                fontWeight="700"
                alignItems="center"
                color={theme.palette.primary.main}
                sx={{
                    fontSize: { xs: '13px', sm: '16px' },
                }}
            >
                {data.price === handleConvertedPrice() ? (
                    getAmount(
                        data?.price,
                        currencySymbolDirection,
                        currencySymbol,
                        digitAfterDecimalPoint
                    )
                ) : (
                    <Typography
                        component="span"
                        marginRight="5px"
                        fontWeight="500"
                        color={theme.palette.neutral[400]}
                        sx={{ fontSize: { xs: '13px', sm: '13px' } }}
                    >
                        {(data.discount > 0 ||
                            data?.restaurant_discount !== 0) && (
                            <del>
                                {' '}
                                {getAmount(
                                    data.price,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                            </del>
                        )}
                    </Typography>
                )}
                {data?.price > 0 && handleConvertedPrice()}
            </Typography>
            {/* {!available_date_ends &&
                handleBadge(
                    data,
                    currencySymbol,
                    currencySymbolDirection,
                    digitAfterDecimalPoint
                )} */}
        </Stack>
    )
}

StartPriceView.propTypes = {}

export default StartPriceView
