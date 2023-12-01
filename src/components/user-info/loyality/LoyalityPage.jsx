import React from 'react'
import { Grid, Typography, Divider, Stack, alpha } from '@mui/material'
import { CustomTypographyGray } from '../../error/Errors.style'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
const LoyalityPage = ({ data, profileDataLoading }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const languageDirection = localStorage.getItem('direction')
    return (
        <>
            <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                justifyContent="space-between"
                padding={{ xs: '.6rem', md: '1rem' }}
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
                    <Typography fontWeight="700" fontSize="20px">
                        {data?.loyality?.transaction_type === 'point_to_wallet'
                            ? data?.loyality?.debit
                            : data?.loyality?.credit}
                    </Typography>
                    <CustomTypographyGray
                        textTransform="capitalize"
                        sx={{ fontSize: '13px', fontWeight: '400' }}
                    >
                        {t(data?.loyality?.transaction_type).replaceAll(
                            '_',
                            ' '
                        )}
                    </CustomTypographyGray>
                </Grid>
                <Grid item md={5} xs={7.5} justifySelf="flex-end">
                    <Stack
                        justifyContent="flex-end"
                        alignItems="end"
                        flexWrap="wrap"
                    >
                        <Typography
                            textTransform="capitalize"
                            sx={{ fontSize: '13px', fontWeight: '400' }}
                            color={
                                data?.loyality?.transaction_type ===
                                'point_to_wallet'
                                    ? theme.palette.error.main
                                    : theme.palette.success.main
                            }
                        >
                            {data?.loyality?.transaction_type ===
                            'point_to_wallet'
                                ? t('debit')
                                : t('credit')}
                        </Typography>
                        <CustomTypographyGray
                            sx={{ fontSize: '13px', fontWeight: '400' }}
                        >
                            {data?.loyality?.created_at}
                        </CustomTypographyGray>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}

export default LoyalityPage
