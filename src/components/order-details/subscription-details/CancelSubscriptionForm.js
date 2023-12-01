import React from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import {CustomStackFullWidth, CustomTextField} from "../../../styled-components/CustomStyles.style";
import CustomSelectWithFormik from "../../custom-select/CustomSelectWithFormik";
import {useGetCancellationReasons} from "../../../hooks/react-query/subscription/useGetCancellationReasons";
import {Button, Grid} from "@mui/material";
import {CustomButtonPrimary} from "../../../styled-components/CustomButtons.style";

const CancelSubscriptionForm = props => {
    const {handleCancel, handleSuccess} = props
    const {t} = useTranslation()
    const {data} = useGetCancellationReasons()
    const customFormik = useFormik({
        initialValues: {
            customer_reason:"",
            customer_note:"",
        },
        validationSchema: Yup.object({
            customer_reason: Yup.string()
                .required(t('Please select a reason'))
        }),
        onSubmit: async (values, helpers) => {
            try {
                handleSuccess?.(values)
            } catch (err) {}
        },
    })
    const reasonsHandler = (value) => {
        customFormik.setFieldValue('customer_reason', value)
    }
    const getReasons = (data)=>{
        let reasonsOption = []
        data?.forEach((reason) => {
            if(reason?.user_type==='customer'){
                reasonsOption.push(  {
                    label: reason.reason,
                    value: reason.reason,
                })

            }
        })
        return reasonsOption
    }
    return (
        <div>
            <form noValidate onSubmit={customFormik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {
                            data && <CustomSelectWithFormik
                                selectFieldData={getReasons(data?.reasons)}
                                inputLabel={t('Select an option')}
                                passSelectedValue={reasonsHandler}
                                touched={customFormik.touched.customer_reason}
                                errors={customFormik.errors.customer_reason}
                                fieldProps={customFormik.getFieldProps(
                                    'customer_reason' )}/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                            label={t("Cancellation note")}
                            value={customFormik.values.customer_note}
                            placeholder={t('Write your cancellation note')}
                            fullWidth
                            multiline
                            rows={4}
                            onChange={(e) => customFormik.setFieldValue('customer_note',e.target.value)}
                        />
                    </Grid>
                    <Grid item align='center' xs={12} container spacing={2}>
                        <Grid item xs={6}>
                            <Button fullWidth variant='outlined' sx={{color: 'primary.main'}}
                                    onClick={() => handleCancel?.()}>
                                {t("No")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomButtonPrimary type='submit'>
                                {t("Yes")}
                            </CustomButtonPrimary>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
};

CancelSubscriptionForm.propTypes = {

};

export default CancelSubscriptionForm;