import { Button, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style';
import { t } from 'i18next';
import CircularLoader from '../../loader/CircularLoader';

const OfflineDetailsModal = ({ trackData, handleOfflineClose, trackDataIsLoading, trackDataIsFetching }) => {
    const theme = useTheme();
    return (
        <Stack
            padding={{ xs: "40px 30px", md: "25px 50px" }}
            alignItems="center"
            gap="15px"
            width="100%"
        >
            <CheckCircleIcon
                sx={{
                    height: "45px", width: "45px", color:
                        theme.palette.success.main
                }}
            />
            <Typography
                fontSize="14px"
                fontWeight="700"
                color={theme.palette.neutral[1000]}
            >
                {`${t("Order Placed Successfully")} !`}
            </Typography>
            <CustomStackFullWidth
                padding={{ xs: "0px 20px", md: "0px 80px" }} 
                textAlign="center">
                <Typography
                    fontSize="14px"
                    fontWeight="400"
                    color={theme.palette.neutral[1000]}
                >
                    {`${t("Your payment has been successfully processed, and your order ")} !`}
                    <Typography component="span" fontWeight="600" sx={{ color: theme.palette.primary.main }}> #{trackData?.id} </Typography>
                    <Typography component="span" fontWeight="400">{`${t("has been placed.")} !`}</Typography>
                </Typography>
            </CustomStackFullWidth>
            <CustomStackFullWidth
                padding="20px"
                backgroundColor={alpha(theme.palette.primary.main, 0.1)}
                alignItems="center"
                borderRadius="10px"
            >
                {/* <Typography fontWeight={500} color={theme.palette.neutral[1000]}>{t("Payment Info")}</Typography> */}
                <CustomStackFullWidth flexDirection={{ xs: "cloumn", sm: "row", md: "row" }}>
                    {trackDataIsLoading && trackDataIsFetching ? (
                        <Grid container padding="40px">
                            <CircularLoader />
                        </Grid>
                    ) : (

                        <Grid container spacing={1}>
                            {trackData?.offline_payment?.input?.map((item, index) => {
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
                                {trackData?.offline_payment?.data?.customer_note &&
                                    <Typography fontWeight="400" sx={{ color: theme.palette.neutral[400] }}>
                                        {"Note"}&nbsp;&nbsp;:&nbsp;&nbsp;
                                        <Typography component="span" sx={{ wordWrap: "break-word" }}>
                                            {trackData?.offline_payment?.data?.customer_note}
                                        </Typography>
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                    )}
                </CustomStackFullWidth>
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
            <Button
                onClick={handleOfflineClose}
                variant="contained"
            // maxWidth="150px"
            // fullWidth
            >
                {t("Ok")}
            </Button>
        </Stack>
    )
}

export default OfflineDetailsModal