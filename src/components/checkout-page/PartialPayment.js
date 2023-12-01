import React from 'react'

import partialImage from './assets/partail.png'
import { alpha, Button, Typography } from '@mui/material'
import PartialSvg from './assets/PartialSvg'
import { Stack } from '@mui/system'
import { t } from 'i18next'
import { useTheme } from '@emotion/react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { getAmount } from '../../utils/customFunctions'
// import { getAmountWithSign } from '../../../helper-functions/CardHelpers'

const PartialPayment = ({
    handlePartialPayment,
    usePartialPayment,
    walletBalance,
    paymentMethod,
    removePartialPayment,
    switchToWallet,
    remainingBalance,
    totalAmount,
    global,offLineWithPartial,
}) => {
    const theme = useTheme()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    return (
        <CustomStackFullWidth
            sx={{
                background: `url(${partialImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '15px',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.neutral[100]
                        : theme.palette.secondary.semiLight,
                borderRadius: '10px',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                marginTop: '20px',
                marginBottom: '20px',
            }}
        >
            <CustomStackFullWidth direction="row" spacing={1}>
                <PartialSvg />
                <Stack>
                    <Typography
                        fontSize="20px"
                        fontWeight="700"
                        color={theme.palette.primary.main}
                    >
                        {getAmount(
                            walletBalance,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </Typography>
                    <Typography
                        fontSize="10px"
                        color={theme.palette.neutral[500]}
                    >
                        {!switchToWallet ? (
                            usePartialPayment && offLineWithPartial ? (
                                t('Has  paid by your wallet.')
                            ) : (
                                t('You have balance in  your wallet')
                            )
                        ) : (
                            <Typography
                                fontSize="10px"
                                color={theme.palette.neutral[500]}
                            >
                                {t('Has  paid by your wallet.')}
                            </Typography>
                        )}
                    </Typography>
                </Stack>
            </CustomStackFullWidth>
            <CustomStackFullWidth
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {!offLineWithPartial && !usePartialPayment && !switchToWallet ? (
                    <Typography
                        fontSize="12px"
                        color={theme.palette.primary.main}
                    >
                        {t('Do you want to use now?')}
                    </Typography>
                ) : (
                    <Stack spacing={0.5}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <CheckCircleIcon
                                color="primary"
                                style={{ width: '12px', height: '12px' }}
                            />
                            <Typography
                                component="span"
                                fontSize="12px"
                                color={theme.palette.primary.main}
                            >
                                {t('Applied !')}
                            </Typography>
                        </Stack>
                        {walletBalance > totalAmount ? (
                            <>
                                {!offLineWithPartial && remainingBalance && !usePartialPayment && (
                                    <Typography
                                        fontSize="12px"
                                        color={theme.palette.neutral[1000]}
                                    >
                                        {t('Remaining Wallet Balance')}:
                                        <Typography
                                            component="span"
                                            fontSize="12px"
                                        >
                                            {getAmount(
                                                remainingBalance,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                        </Typography>
                                    </Typography>
                                )}
                            </>
                        ) : null}
                    </Stack>
                )}
                {!offLineWithPartial && !usePartialPayment && !switchToWallet ? (
                    <Button variant="contained" onClick={handlePartialPayment}>
                        {t('Use')}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={removePartialPayment}
                        sx={{
                            color: theme.palette.error.main,
                            backgroundColor: (theme) =>
                                theme.palette.neutral[100],
                        }}
                    >
                        {t('Remove')}
                    </Button>
                )}
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default PartialPayment
