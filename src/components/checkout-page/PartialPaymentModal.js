import React from 'react'

import { Stack } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import note from './assets/note.png'
import CustomImageContainer from '../CustomImageContainer'
import { Button, Typography } from '@mui/material'
import { t } from 'i18next'
import { useTheme } from '@emotion/react'

import PartialSvg from './assets/PartialSvg'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { getAmount } from '../../utils/customFunctions'

const PartialPaymentModal = (props) => {
    const {
        payableAmount,
        agree,
        reject,
        title,
        colorTitle,
        remainingBalance,
        global,
    } = props
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
            p="1rem"
            spacing={1.5}
            sx={{ maxWidth: '434px', position: 'relative' }}
        >
            <Stack alignItems="center" spacing={1.5} padding="10px">
                <Stack>
                    <CustomImageContainer
                        src={note.src}
                        width="34px"
                        height="34px"
                    />
                    <Typography
                        fontWeight="700"
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Note !')}
                    </Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <Typography
                        fontWeight="500"
                        fontSize="16px"
                        textAlign="center"
                        color={theme.palette.neutral[1000]}
                    >
                        {title}
                        <Typography
                            fontWeight="500"
                            fontSize="16px"
                            color={theme.palette.primary.main}
                            component="span"
                        >
                            {colorTitle}
                        </Typography>
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <PartialSvg />
                    <Typography
                        fontWeight="700"
                        fontSize="20px"
                        color={theme.palette.primary.main}
                    >
                        {getAmount(
                            payableAmount,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </Typography>
                    <Typography color={theme.palette.neutral[1000]}>
                        {t('(Order Amount)')}
                    </Typography>
                </Stack>
                {remainingBalance && (
                    <Typography
                        fontSize="12px"
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Remaining Wallet Balance')}:
                        <Typography
                            component="span"
                            fontSize="12px"
                            color={theme.palette.neutral[1000]}
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
            </Stack>
            <Stack direction="row" width="100%" spacing={1}>
                <Button fullWidth onClick={reject}>
                    {t('No')}
                </Button>
                <Button fullWidth variant="contained" onClick={agree}>
                    {t('Yes')}
                </Button>
            </Stack>
        </CustomStackFullWidth>
    )
}

export default PartialPaymentModal
