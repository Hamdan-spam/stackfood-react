import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControlLabel, Grid } from '@mui/material'
import { ConditionTypography } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../../error/Errors.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from 'next/link'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { setOfflineInfoStep, setOfflineWithPartials } from "../../../redux/slices/OfflinePayment";
import Router, { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const PlaceOrder = (props) => {
    const { placeOrder, orderLoading, offlinePaymentLoading, offlineFormRef, usePartialPayment, page, paymentMethodDetails } = props;
    const router = useRouter();
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false)
    const { token } = useSelector((state) => state.userToken);
    const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
    const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
    const handleChange = (e) => {
        setChecked(e.target.checked)
    }
    const handleOfflineOrder = () => {
        if (!token && guestUserInfo === null) {
            toast.error(t('The Contact Person Info Is Required.'), {
                position: 'bottom-right',
            })
        } else {
            if (usePartialPayment) {
                dispatch(setOfflineInfoStep(2))
                dispatch(setOfflineWithPartials(true))
                // router.push(
                //     { pathname: "/checkout", query: { page: "offline" } },
                //     undefined,
                //     { shallow: true }
                // );
                router.push(
                    { pathname: "/checkout", query: { page: page, method: "offline" } },
                    undefined,
                    { shallow: true }
                );
            } else {
                dispatch(setOfflineInfoStep(2))
                dispatch(setOfflineWithPartials(false))
                // router.push(
                //     { pathname: "/checkout", query: { page: "offline" } },
                //     undefined,
                //     { shallow: true }
                // );
                router.push(
                    { pathname: "/checkout", query: { page: page, method: "offline" } },
                    undefined,
                    { shallow: true }
                );
            }

        }

    }
    const offlinePlaceOrder = () => {
        if (offlineFormRef.current) {
            offlineFormRef.current.handleSubmit(); // Trigger form submission from Child2

        }

    }

    return (
        <CustomStackFullWidth alignItems="center" spacing={2} marginTop="1rem">
            {paymentMethodDetails?.method !== "offline_payment" ? (
                <>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={checked} onChange={handleChange} />
                            }
                            label={
                                <CustomTypography sx={{ fontSize: '13px' }}>
                                    {t(
                                        `I agree that placing the order places me under`
                                    )}{' '}
                                    <Link
                                        href="/terms-and-conditions"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        {t('Terms and Conditions')}
                                    </Link>{' '}
                                    {t('&')}
                                    <Link
                                        href="/privacy-policy"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        {t('Privacy Policy')}
                                    </Link>
                                </CustomTypography>
                            }
                        />
                    </FormGroup>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={placeOrder}
                        loading={orderLoading}
                        disabled={!checked}
                    >
                        {t('Place Order')}
                    </LoadingButton>
                </>
            ) : (
                <>
                    {
                        offlineInfoStep === 2 ? (
                            <>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checked} onChange={handleChange} />
                                        }
                                        label={
                                            <CustomTypography sx={{ fontSize: '13px' }}>
                                                {t(
                                                    `I agree that placing the order places me under`
                                                )}{' '}
                                                <Link
                                                    href="/terms-and-conditions"
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    {t('Terms and Conditions')}
                                                </Link>{' '}
                                                {t('&')}
                                                <Link
                                                    href="/privacy-policy"
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    {t('Privacy Policy')}
                                                </Link>
                                            </CustomTypography>
                                        }
                                    />
                                </FormGroup>
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={offlinePlaceOrder}
                                    loading={orderLoading || offlinePaymentLoading}
                                    disabled={!checked}
                                >
                                    {t('Place Order')}
                                </LoadingButton>
                            </>
                        ) : (
                            <>
                                { (offlineInfoStep === 1 || offlineInfoStep === 0) && <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleOfflineOrder}
                                >
                                    {t('Confirm Order')}
                                </LoadingButton>}

                            </>
                        )

                    }
                </>
            )
            }

        </CustomStackFullWidth >
    )
}

PlaceOrder.propTypes = {}

export default PlaceOrder
