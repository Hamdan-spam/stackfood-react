import React from 'react'
import { Grid, Typography, Divider, Stack, alpha } from '@mui/material'
import { useSelector } from 'react-redux'
import { getAmount } from '../../../utils/customFunctions'
import CustomePagination from '../../pagination/Pagination'
import { useTheme } from '@mui/material/styles'
import { CustomTypographyGray } from '../../error/Errors.style'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { t } from 'i18next'

const WalletsPage = (props) => {
    const {
        data,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
        isLoading,
    } = props
    const theme = useTheme()
    const languageDirection = localStorage.getItem('direction')
    const debit = data?.debit + data?.admin_bonus
    const credit = data?.credit + data?.admin_bonus
    return (
        <>
            <Grid
                container
                item
                sm={12}
                md={12}
                xs={12}
                padding={{ xs: '.6rem', md: '1rem' }}
                justifyContent="space-between"
                sx={{
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? (theme) => theme.palette.cardBackground1
                            : (theme) => theme.palette.neutral[200],
                    marginBottom: '5px',
                    borderRadius: '10px',
                }}
            >
                <Grid item md={7} xs={4.5}>
                    <CustomStackFullWidth>
                        <Stack flexDirection="row" gap="8px">
                            <Typography 
                            fontSize="20px"
                            fontWeight={600}
                                color={
                                    (data?.transaction_type === 'order_place' || data?.transaction_type === 'partial_payment')
                                        ? theme.palette.error.main
                                        : theme.palette.success.main
                                }>
                                {(data?.transaction_type === 'order_place' || data?.transaction_type === 'partial_payment')
                                    ? '-'
                                    : '+'
                                }

                            </Typography>
                            <Typography fontWeight="700" fontSize="20px">
                                {data?.transaction_type === 'order_place'
                                    ? getAmount(
                                        debit,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )
                                    : (
                                        data?.transaction_type === 'partial_payment' ? (
                                            getAmount(
                                                debit,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )
                                        ) : (
                                            getAmount(
                                                credit,
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )
                                        )
                                    )
                                }
                            </Typography>
                        </Stack>
                        {data?.transaction_type === 'add_fund' ? (
                            <CustomTypographyGray
                                textTransform="capitalize"
                                sx={{ fontSize: '13px', fontWeight: '400' }}
                            >
                                {t('added via')}{' '}
                                {t(data?.reference).replaceAll('_', ' ')} (
                                {t('bonus')}:
                                {getAmount(
                                    data?.admin_bonus,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                                )
                            </CustomTypographyGray>
                        ) : (
                            <CustomTypographyGray
                                textTransform="capitalize"
                                sx={{ fontSize: '13px', fontWeight: '400' }}
                            >
                                {t(data?.transaction_type).replaceAll('_', ' ')}
                            </CustomTypographyGray>
                        )}
                    </CustomStackFullWidth>
                </Grid>
                <Grid item md={5} xs={7.5} sm={7.5}>
                    <Stack
                        justifyContent="flex-end"
                        alignItems="end"
                        flexWrap="wrap"
                    >
                        <Typography
                            textTransform="capitalize"
                            fontSize="13px"
                            color={
                                (data?.transaction_type === 'order_place' || data?.transaction_type === 'partial_payment')
                                    ? theme.palette.error.main
                                    : theme.palette.success.main
                            }
                            paddingRight={
                                languageDirection === 'rtl' ? '24px' : '0px'
                            }
                        >
                            {(data?.transaction_type === 'order_place' || data?.transaction_type === 'partial_payment')
                                ? t('debit')
                                : t('credit')}
                        </Typography>
                        <CustomTypographyGray
                            sx={{ fontSize: '13px', fontWeight: '400' }}
                        >
                            {data?.created_at}
                        </CustomTypographyGray>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default WalletsPage
