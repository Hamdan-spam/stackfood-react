import React from 'react'
import { FoodTitleTypography } from '../food-card/FoodCard.style'
import { Box, Stack, Typography } from '@mui/material'
import {
    getAmount,
    getConvertDiscount,
    handleTotalAmountWithAddons,
} from '../../utils/customFunctions'
import { CustomTypographyGray } from '../error/Errors.style'

const TotalAmountVisibility = (props) => {
    const {
        modalData,
        totalPrice,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
        t,
        productDiscount,
        productDiscountType,
        productRestaurantDiscount,
        selectedAddOns,
        quantity,
    } = props

    // const handleTotalAmountWithAddons = (mainTotalAmount) => {
    //     if (selectedAddOns.length > 0) {
    //         let selectedAddonsTotalPrice = 0
    //         selectedAddOns.forEach(
    //             (item) =>
    //                 (selectedAddonsTotalPrice += item.price * item.quantity)
    //         )
    //         return mainTotalAmount + selectedAddonsTotalPrice
    //     } else {
    //         return mainTotalAmount
    //     }
    // }
    return (
        <Stack direction="row" alignItems="center" spacing={0.5}>
            <FoodTitleTypography
                gutterBottom
                variant="h6"
                component="h6"
                sx={{
                    margin: '0',
                    alignItems: 'end',
                    justifyContent: 'flex-start',
                    padding: '0',
                    textAlign: 'left',
                }}
            >
                {t('Total')} :
                <Typography
                    fontSize="14px"
                    component="span"
                    fontWeight="600"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    {modalData.length > 0 &&
                        getAmount(
                            handleTotalAmountWithAddons(
                                getConvertDiscount(
                                    productDiscount,
                                    productDiscountType,
                                    totalPrice,
                                    productRestaurantDiscount,
                                    quantity
                                ),
                                selectedAddOns
                            ),
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                </Typography>
            </FoodTitleTypography>

            {modalData.length > 0 &&
            (productDiscount || productRestaurantDiscount === 1) ? (
                <CustomTypographyGray
                    nodefaultfont="true"
                    textdecoration="line-through"
                    sx={{ fontSize: '14px' }}
                >
                    (
                    {getAmount(
                        handleTotalAmountWithAddons(totalPrice, selectedAddOns),
                        currencySymbolDirection,
                        currencySymbol,
                        digitAfterDecimalPoint
                    )}
                    )
                </CustomTypographyGray>
            ) : null}
        </Stack>
    )
}

TotalAmountVisibility.propTypes = {}

export default TotalAmountVisibility
