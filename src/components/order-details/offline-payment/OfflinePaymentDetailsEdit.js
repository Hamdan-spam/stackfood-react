import React, { useState } from 'react'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import { Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material'
import { t } from 'i18next';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useOfflinePaymentUpdate } from '../../../hooks/react-query/offline-payment/useOfflinePaymentUpdate';
import toast from 'react-hot-toast';
import { getGuestId } from '../../checkout-page/functions/getGuestUserId';
import { useSelector } from 'react-redux';
import OfflinePaymentImage from "../assets/offlinePayments.svg";

const OfflinePaymentDetailsEdit = ({ trackOrderData, setOpenOfflineModal, refetchTrackData }) => {
    const theme = useTheme();
    const borderColor = theme.palette.neutral[400];
    const { mutate: offlineMutate, isLoading: offlinePaymentLoading } = useOfflinePaymentUpdate();
    const { token } = useSelector((state) => state.userToken)
    const [customerNote, setCustomerNote] = useState(trackOrderData?.offline_payment?.data?.customer_note)

    const initialValues = { "customer_note": customerNote };
    trackOrderData?.offline_payment?.input?.forEach((item) => {
        initialValues[item.user_input] = item?.user_data;
    });

    // Create a validation schema using Yup.
    const validationSchema = Yup.object().shape({
        // Define validation rules for each field dynamically.
        ...trackOrderData?.offline_payment?.input?.reduce((acc, item) => {
            acc[item.user_input] = Yup.string().required('This field is required');
            return acc;
        }, {}),
    });

    const handleCancel = () => {
        setOpenOfflineModal(false)
    }

    const handleSuccess = (response) => {
        if (response) {
            refetchTrackData();
            handleCancel();
        }
        toast.success(t("Payment Information Updated"));

    }
    // Initialize Formik form.
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            let newData = {}
            if (token) {
                newData = {
                    ...values,
                    method_id: trackOrderData?.offline_payment?.data?.method_id,
                    order_id: trackOrderData?.id
                }
            } else {
                newData = {
                    ...values,
                    method_id: trackOrderData?.offline_payment?.data?.method_id,
                    order_id: trackOrderData?.id,
                    guest_id: getGuestId(),
                }
            }
            offlineMutate(newData, { onSuccess: handleSuccess });
        },
    });
    return (
        <CustomStackFullWidth
            justifyContent="center"
            alignItems="center"
            padding={{ xs: "30px 20px", sm: "45px 60px" }}
            gap="50px"
        >
            <CustomImageContainer width="120px" src={OfflinePaymentImage.src} />
            <Typography
                fontSize="18px"
                fontWeight="700"
                color={theme.palette.neutral[1000]}
            >
                {`${t("Update Payment Info")}`}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    {trackOrderData?.offline_payment?.input?.map((item) => (
                        <Grid item xs={12} md={6} key={item.user_input}>
                            <TextField
                                fullWidth
                                label={item.user_input.replaceAll("_", " ")}
                                id={item.user_input}
                                name={item.user_input}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[item.user_input]}
                                error={formik.touched[item.user_input] && Boolean(formik.errors[item.user_input])}
                                helperText={formik.touched[item.user_input] && formik.errors[item.user_input]}
                                InputLabelProps={{
                                    style: { color: theme.palette.neutral[1000] }, // Change to your desired label color
                                }}
                            />
                        </Grid>
                    ))}

                    <Grid items xs={12} md={12} padding="20px 0px 0px 18px">
                        <TextField
                            fullWidth
                            label="Payment Note"
                            id="customer_note"
                            name="customer_note"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values["customer_note"]}
                            multiline
                            rows={4}
                            InputLabelProps={{
                                style: { color: theme.palette.neutral[1000] }, // Change to your desired label color
                            }}
                        />
                    </Grid>
                </Grid>
                {/* <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button> */}
                <Stack
                    direction="row"
                    width="100%"
                    spacing={1}
                    justifyContent="flex-end"
                    gap="20px"
                    paddingTop={{ xs: "15px", sm: "20px", md: "25px" }}
                >
                    <Button
                        onClick={() => handleCancel()}
                        sx={{
                            border: `1px solid ${borderColor}`,
                            borderRadius: "5px",
                            color: borderColor,
                            padding: "8px 16px",
                        }}
                    >
                        {t("Cancel")}
                    </Button>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={offlinePaymentLoading}
                    >
                        {t("Update")}
                    </LoadingButton>
                </Stack>
            </form>
        </CustomStackFullWidth>
    )
}

export default OfflinePaymentDetailsEdit