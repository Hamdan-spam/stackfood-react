import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setClearCart } from '../../redux/slices/cart'
import { useTranslation } from 'react-i18next'
import { Grid, Stack, alpha } from '@mui/material'
import { CustomColouredTypography, CustomStackFullWidth, } from '../../styled-components/CustomStyles.style'
import { useTheme } from "@emotion/react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useQuery } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import { clearOfflinePaymentInfo, setOrderDetailsModal } from '../../redux/slices/OfflinePayment'
import CircularLoader from '../loader/CircularLoader'
import { getGuestId } from './functions/getGuestUserId'

export default function SuccessCard({ id }) {
    const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
    const guestId = getGuestId();
    const { data: trackData, refetch, isLoading: trackDataIsLoading, isFetching: trackDataIsFetching } = useQuery(
        [`category-tracking`, id],
        () => OrderApi.orderTracking(id, guestUserInfo?.contact_person_number, guestId)
    )
    useEffect(() => {
        refetch();
    }, [])
    const router = useRouter()
    const dispatch = useDispatch()
    const theme = useTheme()
    dispatch(setClearCart())
    dispatch(clearOfflinePaymentInfo());
    dispatch(setOrderDetailsModal(false));
    const { t } = useTranslation()
    return (
        <CustomStackFullWidth
            height="100%"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            pt="30px"
        >
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                spacing={1}
            >
                <CheckCircleIcon
                    sx={{
                        height: "45px",
                        width: "45px",
                        color: theme.palette.success.main
                    }}
                />
                <CustomColouredTypography color="primary" variant="h3">
                    {t('Congratulations!')}
                </CustomColouredTypography>
                <Typography
                    align="center"
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {t('You place the order successfully.')}
                </Typography>
                <Typography
                    align="center"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                >
                    {t(
                        'Your order is placed Successfully. We start our delivery process and you will receive your food soon.'
                    )}
                </Typography>
                <Typography align="center" sx={{ mb: 1.5 }}>
                    {t(`Your order is`)}
                    <span
                        style={{ color: theme.palette.primary.main, marginLeft: "3px" }}
                    >
                        {id}
                    </span>
                    {t(`. You can use this ID to track your order later`)}
                </Typography>
                {trackData?.data?.offline_payment &&
                    <CustomStackFullWidth textAlign="center" maxWidth="670px">
                        <CustomStackFullWidth
                            padding="20px"
                            backgroundColor={alpha(theme.palette.primary.main, 0.1)}
                            alignItems="center"
                            gap="10px"
                            borderRadius="10px"
                        >
                            <Typography fontWeight={500}>{t("Payment Information")}</Typography>
                            {trackDataIsLoading && trackDataIsFetching ? (
                                <CustomStackFullWidth padding="40px" textAlign="center">
                                    <CircularLoader />
                                </CustomStackFullWidth>
                            ) : (
                                <CustomStackFullWidth flexDirection={{ xs: "cloumn", sm: "row", md: "row" }} alignItems="center">
                                    <Grid container spacing={1}>
                                        {trackData?.data?.offline_payment?.input?.map((item, index) => {
                                            return (
                                                <Grid item xs={12} md={12} key={index}>
                                                    <Typography fontWeight="400" sx={{ textTransform: "capitalize", color: theme.palette.neutral[400] }}>
                                                        {item?.user_input.replaceAll("_", " ")}&nbsp;&nbsp;:&nbsp;&nbsp;
                                                        <Typography component="span" sx={{ wordWrap: "break-word" }}>
                                                            {item?.user_data.replaceAll("_", " ")}
                                                        </Typography>
                                                    </Typography>
                                                </Grid>
                                            )
                                        })
                                        }
                                        <Grid item xs={12} md={12}>
                                            {trackData?.data?.offline_payment?.data?.customer_note &&
                                                <Typography fontWeight="400" sx={{ color: theme.palette.neutral[400] }}>
                                                    {"Note"}&nbsp;&nbsp;:&nbsp;&nbsp;
                                                    <Typography component="span" sx={{ wordWrap: "break-word" }}>
                                                        {trackData?.data?.offline_payment?.data?.customer_note}
                                                    </Typography>
                                                </Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                </CustomStackFullWidth>
                            )

                            }
                        </CustomStackFullWidth>
                        <CustomStackFullWidth>
                            <Typography color={theme.palette.text.secondary} textAlign="center">
                                <Typography
                                    component="span"
                                    color={theme.palette.error.main}
                                    fontSize="18px"
                                > * </Typography>
                                {t("If you accidentally provided incorrect payment information, you can edit the details in the order details section while the order is still pending.")}
                            </Typography>

                        </CustomStackFullWidth>
                    </CustomStackFullWidth>

                }

                <Stack pt="2rem" spacing={1}>
                    <Button
                        onClick={() =>
                            router.push("/tracking", undefined, { shallow: true })
                        }
                        variant="contained"
                    >
                        {t("Track your order")}
                    </Button>
                    <Typography
                        onClick={() => router.push("/home", undefined, { shallow: true })}
                        variant="contained"
                        sx={{
                            textDecoration: "underLine",
                            cursor: "pointer",
                            textAlign: "center",
                            color: (theme) => theme.palette.primary.main,
                        }}
                    >
                        {t("Continue shopping ")}
                    </Typography>
                </Stack>
            </CustomStackFullWidth>
        </CustomStackFullWidth >
    )
}
