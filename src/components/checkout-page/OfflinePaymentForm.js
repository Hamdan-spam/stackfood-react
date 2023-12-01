import React, { useEffect, useState } from 'react'
import * as Yup from "yup";

import { CustomPaperBigCard, CustomStackFullWidth } from '../../styled-components/CustomStyles.style';
import { Button, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, alpha, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { getGuestId } from "./functions/getGuestUserId";
import { LoadingButton } from '@mui/lab';
import OfflinePayment from './assets/OfflinePayment';
import { useDispatch, useSelector } from 'react-redux';
import { setOfflineMethod, setOfflinePaymentInfo } from '../../redux/slices/OfflinePayment';
import { capitalizeEachWord, getAmount } from "../../utils/customFunctions";

const OfflinePaymentForm = ({
    offlinePaymentOptions,
    totalAmount,
    paymenMethod,
    setPaymenMethod,
    currencySymbolDirection,
    currencySymbol,
    digitAfterDecimalPoint,
    walletBalance,
    usePartialPayment,
    offlineFormRef,
    setFormValidation,
    placeOrder,
}) => {

    const theme = useTheme();
    const totalAmountAfterPartial = !usePartialPayment ? totalAmount : totalAmount - walletBalance
    const { offlineMethod } = useSelector((state) => state.offlinePayment);
    const { token } = useSelector((state) => state.userToken)
    setPaymenMethod(offlineMethod?.method)
    const dispatch = useDispatch();

    // Create a validation schema using Yup.
    const validationSchema = Yup.object().shape({
        // Define validation rules for each field dynamically.
        ...offlinePaymentOptions
            ?.filter(
                (item) => item.method_name === offlineMethod?.name
            )[0]
            ?.method_informations?.reduce((acc, item) => {
                if (item?.is_required === 1) {
                    acc[item.customer_input] = Yup.string().required('This field is required');
                }
                return acc;
            }, {}),
    });

    const initialValues = {
        "customer_note": "",
        payment_method: offlineMethod ? offlineMethod.name : "",

    };
    offlinePaymentOptions
        ?.filter(
            (item) => item.method_name === offlineMethod?.name
        )[0]?.method_informations?.forEach((item) => {
            initialValues[item.customer_input] = "";
        });
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                let newData = {};
                if (token) {
                    newData = {
                        ...values,
                        method_id: offlineMethod.id,
                    };
                } else {
                    newData = {
                        ...values,
                        method_id: offlineMethod.id,
                        guest_id: getGuestId(),
                    };
                }

                if (values) {
                    dispatch(setOfflinePaymentInfo(newData));
                    placeOrder();
                }

            } catch (err) {
                console.log(error)
            }

        },
    });

    const handleRadioChange = (e) => {
        const newMethod = offlinePaymentOptions?.filter(
            (item) => item.method_name === e.target.value
        )[0];
        dispatch(setOfflineMethod({
            id: newMethod.id,
            name: newMethod.method_name,
            method: "offline_payment"
        }))
    };

    // Expose the formik instance and submit function
    offlineFormRef.current = formik;

    return (
        <CustomPaperBigCard>
            <CustomStackFullWidth
                justifyContent="center"
                alignItems="center"
                // paddingInline={{ xs: "0px", sm: "20px" }}
                gap="20px"
            >
                <Typography
                    fontSize="16px"
                    fontWeight="700"
                    color={theme.palette.neutral[600]}
                >
                    {t("PAYMENT")}
                </Typography>
                <CustomStackFullWidth>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <FormControl fullWidth>
                                <Typography
                                    fontSize="15px"
                                    fontWeight="600"
                                    color={theme.palette.neutral[600]}
                                    paddingBottom="10px"
                                >
                                    {t("Payment Option")}
                                </Typography>
                                <RadioGroup
                                    value={offlineMethod?.name}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={(e) => handleRadioChange(e)}
                                    fieldProps={formik.getFieldProps("payment_method")}
                                >
                                    {offlinePaymentOptions?.length > 0 &&
                                        offlinePaymentOptions?.map((item, index) => {
                                            return (
                                                <FormControlLabel
                                                    key={index}
                                                    value={item.method_name}
                                                    control={<Radio />}
                                                    label={
                                                        <Typography fontSize="14px">{t(item.method_name)}</Typography>
                                                    }
                                                    fontSize="14px"
                                                />
                                            );
                                        })}
                                </RadioGroup>
                                {formik.touched.payment_method &&
                                    formik.errors.payment_method &&
                                    !value && (
                                        <FormHelperText
                                            sx={{ color: (theme) => theme.palette.error.main }}
                                        >
                                            {t("Please select an option.")}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                            <CustomStackFullWidth
                                padding="15px"
                                borderRadius="10px"
                                gap="15px"
                                backgroundColor={alpha(theme.palette.primary.main, 0.1)}
                            >
                                <Stack flexDirection="row" gap={1}>
                                    <OfflinePayment />
                                    <Typography fontSize="14px" fontWeight={500}>
                                        {t(`${offlineMethod?.name} Information`)}
                                    </Typography>

                                </Stack>
                                <CustomStackFullWidth>
                                    <Grid container spacing={1}>
                                        {offlinePaymentOptions
                                            ?.filter(
                                                (item) => item.method_name === offlineMethod?.name
                                            )[0]
                                            ?.method_fields?.map((item, index) => (
                                                <Grid item xs={12} md={12} key={index}>
                                                    <Stack flexDirection="row">
                                                        <Typography
                                                            minWidth="150px"
                                                            color={theme.palette.neutral[400]}
                                                            fontSize="14px"
                                                            fontWeight={400}
                                                            sx={{ textTransform: "capitalize" }}
                                                        >
                                                            {item.input_name.replaceAll("_", " ")}
                                                        </Typography>
                                                        <Typography
                                                            component="span"
                                                            fontSize="14px"
                                                            fontWeight={400}
                                                            color={theme.palette.neutral[1000]}
                                                        >
                                                            : &nbsp;&nbsp; {item.input_data}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </CustomStackFullWidth>
                            </CustomStackFullWidth>
                            <Typography
                                padding="20px"
                                varient="h3"
                                fontSize="16px"
                                fontWeight="700"
                                textAlign="center"
                            >
                                {`Amount : ${getAmount(totalAmountAfterPartial, currencySymbolDirection, currencySymbol, digitAfterDecimalPoint)}`}
                            </Typography>
                            <Typography fontSize="14px" fontWeight={500}>
                                {t(`Payment Information`)}
                            </Typography>
                            <Grid container spacing={2}>
                                {offlinePaymentOptions
                                    ?.filter(
                                        (item) => item.method_name === offlineMethod?.name)[0]
                                    ?.method_informations?.map((item, index) => (
                                        <>{(offlinePaymentOptions?.filter((item) => item.method_name === offlineMethod?.name)[0]?.method_informations?.length - 1 === index &&
                                            (offlinePaymentOptions?.filter((item) => item.method_name === offlineMethod?.name)[0]?.method_informations?.length - 1) % 2) === 0 ? (
                                            <Grid item xs={12} md={12} key={index} >
                                                <TextField
                                                    fullWidth
                                                    label={capitalizeEachWord(item?.customer_input.replaceAll("_", " "))}
                                                    id={item.customer_input}
                                                    name={item.customer_input}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={capitalizeEachWord(item.customer_placeholder.replaceAll("_", " "))}
                                                    value={formik.values[item.customer_input]}
                                                    error={formik.touched[item.customer_input] && Boolean(formik.errors[item.customer_input])}
                                                    helperText={formik.touched[item.customer_input] && formik.errors[item.customer_input]}
                                                />
                                            </Grid >
                                        ) : (

                                            <Grid item xs={12} md={6} key={index}>
                                                <TextField
                                                    fullWidth
                                                    label={capitalizeEachWord(item?.customer_input.replaceAll("_", " "))}
                                                    id={item.customer_input}
                                                    name={item.customer_input}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={capitalizeEachWord(item.customer_placeholder.replaceAll("_", " "))}
                                                    value={formik.values[item.customer_input]}
                                                    error={formik.touched[item.customer_input] && Boolean(formik.errors[item.customer_input])}
                                                    helperText={formik.touched[item.customer_input] && formik.errors[item.customer_input]}
                                                    
                                                />
                                            </Grid >
                                        )
                                        }
                                        </>
                                    ))}
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        rows={4}
                                        multiline
                                        fullWidth
                                        id="customer_note"
                                        label="Payment Note"
                                        name="customer_note"
                                        value={formik.values["customer_note"]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    // defaultValue="Default Value"
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                        {/* <Stack
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
                            {t("Place Order")}
                        </LoadingButton>
                    </Stack> */}
                    </form>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomPaperBigCard >
    )
}

export default React.memo(OfflinePaymentForm);