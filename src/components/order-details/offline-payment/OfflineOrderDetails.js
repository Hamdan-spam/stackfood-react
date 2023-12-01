import { Grid, IconButton, Stack, Typography, alpha, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { IformationGridWithBorder } from '../OrderDetail.style'
import OfflinePayment from '../../checkout-page/assets/OfflinePayment'
import { t } from 'i18next'
import EditOrder from '../assets/EditOrder'
import CustomModal from '../../custom-modal/CustomModal';
import CloseIcon from "@mui/icons-material/Close";
import OfflinePaymentDetailsEdit from './OfflinePaymentDetailsEdit'
import OfflinePaymentDenied from '../../../assets/images/icons/OfflinePaymentDenied'
import { ReadMore } from '../../landingpage/ReadMore'

const OfflineOrderDetails = ({ trackData, refetchTrackData }) => {
    const theme = useTheme();
    const [openOfflineModal, setOpenOfflineModal] = useState(false);
    return (
        <div>
            <Typography fontSize="16px" fontWeight='600' padding="16px 0">
                {t('Payment Information')}
            </Typography>
            <CustomStackFullWidth gap={{ xs: 0, md: 2 }} flexDirection="row" width="100%">
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                        <IformationGridWithBorder
                            container
                            md={12}
                            xs={12}
                        >
                            <Stack flexDirection="row" gap={1}>
                                <OfflinePayment />
                                <Typography fontSize="14px" fontWeight='500'>
                                    {`${trackData?.offline_payment?.data?.method_name} ${t("Information")}`}
                                </Typography>
                            </Stack>
                            <CustomStackFullWidth paddingTop="10px">
                                {trackData?.offline_payment?.method_fields?.map((item, index) => (
                                    <Stack flexDirection="row" paddingTop="5px">
                                        <Typography
                                            minWidth="90px"
                                            color={theme.palette.neutral[400]}
                                            fontSize="14px"
                                            fontWeight={400}
                                            sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                        >
                                            {item.input_name.replaceAll("_", " ")}
                                        </Typography>
                                        <Typography
                                            fontSize="14px"
                                            fontWeight={400}
                                            color={theme.palette.neutral[1000]}
                                            sx={{ wordWrap: "break-word" }}
                                        >
                                            : &nbsp;&nbsp; {item.input_data}
                                        </Typography>
                                    </Stack>
                                ))}

                            </CustomStackFullWidth>
                        </IformationGridWithBorder>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <IformationGridWithBorder
                            container
                            md={12}
                            xs={12}
                        >
                            <Stack width="100%" flexDirection="row" justifyContent="space-between">
                                <Stack flexDirection="row" gap={1}>
                                    <OfflinePayment />
                                    <Typography fontSize="14px" fontWeight='500'>
                                        {t('My Payment Information')}
                                    </Typography>
                                </Stack>
                                {trackData?.offline_payment?.data?.status !== "verified" &&
                                    <IconButton onClick={() => setOpenOfflineModal(true)}>
                                        <EditOrder />
                                    </IconButton>
                                }

                            </Stack>
                            <CustomStackFullWidth paddingTop="10px">
                                {trackData?.offline_payment?.input?.map((item, index) => (
                                    <Stack flexDirection="row" paddingTop="5px">
                                        <Typography
                                            minWidth="80px"
                                            color={theme.palette.neutral[400]}
                                            fontSize="14px"
                                            fontWeight={400}
                                            sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                        >
                                            {item.user_input.replaceAll("_", " ")}
                                        </Typography>
                                        <Typography
                                            maxWidth="190px"
                                            fontSize="14px"
                                            fontWeight={400}
                                            color={theme.palette.neutral[1000]}
                                            sx={{ wordWrap: "break-word" }}
                                        >
                                            : &nbsp;&nbsp; {item.user_data}
                                        </Typography>
                                    </Stack>
                                ))}
                                {trackData?.offline_payment?.data?.customer_note &&
                                    <Stack flexDirection="row" paddingTop="5px">
                                        <Typography
                                            minWidth="80px"
                                            color={theme.palette.neutral[400]}
                                            fontSize="14px"
                                            fontWeight={400}
                                            sx={{
                                                textTransform: "capitalize",
                                                wordWrap: "break-word",
                                                whiteSpace: "pre-line"
                                            }}
                                        >
                                            {t("Note")}
                                        </Typography>
                                        <Typography
                                            maxWidth="190px"
                                            fontSize="14px"
                                            fontWeight={400}
                                            color={theme.palette.neutral[1000]}
                                            sx={{
                                                wordWrap: "break-word"
                                            }}
                                        >
                                            : &nbsp;&nbsp; {trackData?.offline_payment?.data?.customer_note}
                                        </Typography>
                                    </Stack>
                                }

                            </CustomStackFullWidth>
                        </IformationGridWithBorder>
                    </Grid>
                </Grid>
                <CustomModal
                    openModal={openOfflineModal}
                    setModalOpen={setOpenOfflineModal}
                >
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ position: "relative" }}
                    >
                        <IconButton
                            onClick={() => setOpenOfflineModal(false)}
                            sx={{
                                zIndex: "99",
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: (theme) => theme.palette.neutral[100],
                                borderRadius: "50%",
                                [theme.breakpoints.down("md")]: {
                                    top: 10,
                                    right: 5,
                                },
                            }}
                        >
                            <CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
                        </IconButton>
                    </CustomStackFullWidth>
                    <OfflinePaymentDetailsEdit
                        trackOrderData={trackData}
                        refetchTrackData={refetchTrackData}
                        // data={data}
                        setOpenOfflineModal={setOpenOfflineModal}
                    />
                </CustomModal>
            </CustomStackFullWidth>
            {trackData?.offline_payment?.data?.status === "denied" &&
                <Grid container>
                    <Grid item md={12} xs={12} pr={{ xs: "0px", md: "16px" }}>
                        <CustomStackFullWidth
                            sx={{
                                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                marginTop: "20px",
                                padding: "15px ",
                                borderRadius: "5px",
                                width: "100%",
                                gap: "15px",
                            }}
                        >
                            <CustomStackFullWidth
                                sx={{
                                    flexDirection: "row",
                                    gap: "20px",
                                    // justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <OfflinePaymentDenied />
                                <Typography fontSize="16px" fontWeight={500} color={theme.palette.text.primary}>
                                    {t("Payment Denied")}
                                </Typography>
                                {/* <InfoOutlinedIcon /> */}
                            </CustomStackFullWidth>
                            <ReadMore limits="110">
                                {trackData?.offline_payment?.data?.admin_note}
                            </ReadMore>
                        </CustomStackFullWidth>
                    </Grid>
                </Grid>}
        </div>
    )
}

export default OfflineOrderDetails