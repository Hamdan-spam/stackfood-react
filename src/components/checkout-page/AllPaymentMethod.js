import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Stack, styled, Button, Grid, FormControl, RadioGroup, FormControlLabel, Radio, Tooltip } from "@mui/material";
import { PymentTitle } from "./CheckOut.style";
import { t } from "i18next";
import { alpha, Typography } from "@mui/material";
import money from "./assets/fi_2704332.png";
import wallet from "./assets/walletpayment.png";
import CustomImageContainer from "../CustomImageContainer";
import PaymentMethodCard from "./PaymentMethodCard";
import { useTheme } from "@emotion/react";
import { PrimaryButton } from "../products-page/FoodOrRestaurant";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import { setOfflineInfoStep, setOfflineMethod } from "../../redux/slices/OfflinePayment";
import { getToken } from "./functions/getGuestUserId";

const PayButton = styled(Button)(({ theme, value, paymentMethod }) => ({
    padding: "16px 16px",
    gap: "10px",
    alignItems: "center",
    border: "1px solid",
    borderColor: alpha(theme.palette.neutral[400], 0.4),
    color:
        value === paymentMethod
            ? theme.palette.neutral[1000]
            : theme.palette.neutral[1000],
    background:
        value === paymentMethod && alpha(theme.palette.primary.main, 0.6),
    "&:hover": {
        color: theme.palette.neutral[1000],
        background: value === paymentMethod && theme.palette.primary.main
    }
}));

const OfflineButton = styled(Button)(({ theme, value, paymentMethod }) => ({
    padding: "15px 15px",
    borderRadius: "10px",
    fontWeight: "400",
    border: `1px solid ${theme.palette.neutral[300]}`,
    gap: "5px",
    background: value === paymentMethod
        ? theme.palette.neutral[800]
        : theme.palette.neutral[100],
    color:
        value === paymentMethod
            ? `${theme.palette.whiteContainer.main} !important`
            : `${theme.palette.neutral[1000]} !important`,
    "&:hover": {
        color: `${theme.palette.whiteContainer.main} !important`,
        background: theme.palette.neutral[800]
    }
}));

const AllPaymentMethod = ({
    paymenMethod,
    usePartialPayment,
    global,
    setPaymenMethod,
    getPaymentMethod,
    selected,
    setSelected,
    handleSubmit,
    subscriptionStates,
    handleClose,
    offlinePaymentOptions,
    setIsCheckedOffline,
    isCheckedOffline,
    offLineWithPartial,
    paymentMethodDetails
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userToken)
    const [openOfflineOptions, setOpenOfflineOptions] = useState(false);
    useEffect(() => {
        if (paymentMethodDetails !== selected) {
            setSelected(paymentMethodDetails)
        }
        if (isCheckedOffline) {
            setOpenOfflineOptions(true)
        } else {
            setOpenOfflineOptions(false)
        }
    }, [])
    useEffect(() => {
        if (paymentMethodDetails.method === "offline_payment") {
            setIsCheckedOffline(true)
        }
    }, [selected])
    const handleClickOffline = () => {
        setOpenOfflineOptions(!openOfflineOptions);
    };

    const handleClickOfflineItem = (item) => {
        setIsCheckedOffline(true)
        getPaymentMethod({
            name: item?.method_name,
            method: "offline_payment",
            id: item?.id
        });
    };

    return (
        <Stack width="100%" padding="2rem" spacing={2.4}>
            <button className="closebtn" onClick={handleClose}>
                <CloseIcon fontSize="18px" />
            </button>
            <Stack>
                <PymentTitle>{t("Payment Method")}</PymentTitle>
                <Typography
                    fontSize="12px"
                    textTransform="capitalize"
                    color={theme.palette.neutral[1000]}
                >
                    {t("Select a Payment Method to Proceed")}
                </Typography>
            </Stack>

            {global?.partial_payment_status === 1 ? (
                <>
                    <CustomStackFullWidth
                        direction="row"
                        gap="1rem"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        {global?.cash_on_delivery &&
                            (global?.partial_payment_method === 'both' ||
                                global?.partial_payment_method === 'cod') ? (
                            <PayButton
                                value="cash_on_delivery"
                                paymentMethod={selected?.name}
                                onClick={() => {
                                    getPaymentMethod({
                                        name: 'cash_on_delivery',
                                        image: money,
                                    })
                                    // dispatch(setOfflineInfoStep(0))
                                }
                                }
                            >
                                <CustomImageContainer
                                    src={money.src}
                                    width="20px"
                                    height="20px"
                                    alt="cod"
                                />
                                <Typography
                                    fontSize="12px"
                                    color={
                                        selected?.name === 'cash_on_delivery'
                                            ? theme.palette.neutral[1000]
                                            : theme.palette.primary.main
                                    }
                                >
                                    {t('Pay after service')}
                                </Typography>
                            </PayButton>
                        ) : null}
                        {!usePartialPayment && !offLineWithPartial &&
                            global?.customer_wallet_status === 1 &&
                            subscriptionStates.order !== '1' && token && (
                                <PayButton
                                    onClick={() => {
                                        getPaymentMethod({
                                            name: 'wallet',
                                            image: wallet,
                                        })
                                        // dispatch(setOfflineInfoStep(0))
                                    }
                                    }
                                    value="wallet"
                                    paymentMethod={selected?.name}
                                    disabled={usePartialPayment}
                                >
                                    <CustomImageContainer
                                        src={wallet.src}
                                        width="20px"
                                        height="20px"
                                        alt="cod"
                                    />
                                    <Typography
                                        fontSize="12px"
                                        color={
                                            selected?.name === 'wallet'
                                                ? theme.palette.neutral[1000]
                                                : theme.palette.primary.main
                                        }
                                    >
                                        {t('Pay via Wallet')}
                                    </Typography>
                                </PayButton>
                            )}
                    </CustomStackFullWidth>
                    {global?.digital_payment &&
                        subscriptionStates.order !== '1' && (
                            <CustomStackFullWidth spacing={2.4}>
                                <Typography
                                    fontSize="14px"
                                    fontWeight="600"
                                    color={theme.palette.neutral[1000]}
                                >
                                    {t('Pay Via Online')}
                                    <Typography
                                        component="span"
                                        fontSize="10px"
                                        ml="5px"
                                        fontWeight="600"
                                        color={theme.palette.neutral[1000]}
                                    >
                                        {t('(Faster & secure way to pay bill)')}
                                    </Typography>
                                </Typography>
                                <Grid container rowGap="2.1rem">
                                    {global?.digital_payment &&
                                        (global?.partial_payment_method ===
                                            'digital_payment' ||
                                            global?.partial_payment_method ===
                                            'both') && (
                                            <>
                                                {global?.active_payment_method_list?.map(
                                                    (item, index) => {
                                                        return (
                                                            <Grid item md={6}>
                                                                <PaymentMethodCard
                                                                    key={index}
                                                                    paymentType={
                                                                        item?.gateway_title
                                                                    }
                                                                    image={
                                                                        item?.gateway_image
                                                                    }
                                                                    type={
                                                                        item?.gateway
                                                                    }
                                                                    imageUrl={
                                                                        global
                                                                            ?.base_urls
                                                                            ?.gateway_image_url
                                                                    }
                                                                    digitalPaymentMethodActive={
                                                                        global?.digital_payment
                                                                    }
                                                                    getPaymentMethod={
                                                                        getPaymentMethod
                                                                    }
                                                                    selected={
                                                                        selected
                                                                    }
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                )}
                                            </>
                                        )}
                                </Grid>
                            </CustomStackFullWidth>
                        )}
                </>
            ) : (
                <>
                    <CustomStackFullWidth
                        direction="row"
                        gap="1rem"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        {global?.cash_on_delivery ? (
                            <PayButton
                                value="cash_on_delivery"
                                paymentMethod={selected?.name}
                                onClick={() => {
                                    getPaymentMethod({
                                        name: 'cash_on_delivery',
                                        image: money,
                                    })
                                    // dispatch(setOfflineInfoStep(0))
                                }
                                }
                            >
                                <CustomImageContainer
                                    src={money.src}
                                    width="20px"
                                    height="20px"
                                    alt="cod"
                                />
                                <Typography
                                    fontSize="12px"
                                    color={
                                        selected?.name === 'cash_on_delivery'
                                            ? theme.palette.neutral[1000]
                                            : theme.palette.primary.main
                                    }
                                >
                                    {t('Pay after service')}
                                </Typography>
                            </PayButton>
                        ) : null}
                        {!usePartialPayment &&
                            global?.customer_wallet_status === 1 &&
                            subscriptionStates.order !== '1' && (
                                <PayButton
                                    onClick={() => {
                                        getPaymentMethod({
                                            name: 'wallet',
                                            image: wallet,
                                        })
                                        // dispatch(setOfflineInfoStep(0))
                                    }
                                    }
                                    value="wallet"
                                    paymentMethod={selected?.name}
                                    disabled={usePartialPayment}
                                >
                                    <CustomImageContainer
                                        src={wallet.src}
                                        width="20px"
                                        height="20px"
                                        alt="cod"
                                    />
                                    <Typography
                                        fontSize="12px"
                                        color={
                                            selected?.name === 'wallet'
                                                ? theme.palette.neutral[1000]
                                                : theme.palette.primary.main
                                        }
                                    >
                                        {t('Pay via Wallet')}
                                    </Typography>
                                </PayButton>
                            )}
                    </CustomStackFullWidth>
                    {global?.digital_payment &&
                        subscriptionStates.order !== '1' && (
                            <CustomStackFullWidth spacing={2.4}>
                                <Typography
                                    fontSize="14px"
                                    fontWeight="600"
                                    color={theme.palette.neutral[1000]}
                                >
                                    {t('Pay Via Online')}
                                    <Typography
                                        component="span"
                                        fontSize="10px"
                                        ml="5px"
                                        fontWeight="600"
                                        color={theme.palette.neutral[1000]}
                                    >
                                        {t('(Faster & secure way to pay bill)')}
                                    </Typography>
                                </Typography>
                                <Grid container rowGap="2.1rem">
                                    {global?.digital_payment && (
                                        <>
                                            {global?.active_payment_method_list?.map(
                                                (item, index) => {
                                                    return (
                                                        <Grid item md={6}>
                                                            <PaymentMethodCard
                                                                key={index}
                                                                paymentType={
                                                                    item?.gateway_title
                                                                }
                                                                image={
                                                                    item?.gateway_image
                                                                }
                                                                type={
                                                                    item?.gateway
                                                                }
                                                                imageUrl={
                                                                    global
                                                                        ?.base_urls
                                                                        ?.gateway_image_url
                                                                }
                                                                digitalPaymentMethodActive={
                                                                    global?.digital_payment
                                                                }
                                                                getPaymentMethod={
                                                                    getPaymentMethod
                                                                }
                                                                selected={
                                                                    selected
                                                                }
                                                            />
                                                        </Grid>
                                                    )
                                                }
                                            )}
                                        </>
                                    )}
                                </Grid>
                            </CustomStackFullWidth>
                        )}
                </>
            )}
            {
                global?.offline_payment_status === 1 &&
                typeof offlinePaymentOptions !== "undefined" &&
                Object?.keys(offlinePaymentOptions)?.length !== 0 &&
                (
                    <CustomStackFullWidth
                        padding="10px 10px 10px 15px"
                        borderRadius="10px"
                        backgroundColor={alpha(theme.palette.primary.main, 0.1)}
                    >
                        <CustomStackFullWidth gap="15px">
                            <CustomStackFullWidth flexDirection="row" justifyContent="space-between" >
                                <FormControl
                                    sx={{ marginRight: { xs: "0px" }, marginLeft: { xs: "5px" } }}
                                >
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        fontWeight="600"
                                    >
                                        <FormControlLabel
                                            sx={{ color: theme => theme.palette.neutral[1000] }}
                                            value="Pay Offline"
                                            control={
                                                <Radio
                                                    sx={{ padding: { xs: "2px", md: "10px" } }}
                                                    checked={isCheckedOffline}
                                                    onClick={handleClickOffline}
                                                />
                                            }
                                            label={
                                                <Typography fontSize="14px" fontWeight="500">
                                                    {t("Pay Offline")}
                                                    <Typography component="span" fontSize="10px" ml="5px" color={theme.palette.neutral[1000]}>
                                                        ( {t("Select option from below")} )
                                                    </Typography>
                                                </Typography>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Tooltip
                                    placement="left"
                                    title={t(
                                        "Offline Payment! Now, with just a click of a button, you can make secure transactions. It's simple, convenient, and reliable."
                                    )}
                                >
                                    <InfoIcon
                                        fontSize="16px"
                                        sx={{ color: theme.palette.primary.main }}
                                    />
                                </Tooltip>
                            </CustomStackFullWidth>
                            {
                                openOfflineOptions &&
                                <CustomStackFullWidth paddingBottom="10px">

                                    <CustomStackFullWidth direction="row" gap="10px" sx={{ flexWrap: "wrap" }}>
                                        {offlinePaymentOptions?.map((item, index) => {
                                            return (
                                                <OfflineButton
                                                    key={index}
                                                    value={item?.method_name}
                                                    paymentMethod={selected?.name}
                                                    onClick={() => handleClickOfflineItem(item)}
                                                >{item.method_name}
                                                    {/* <Typography color={item?.id === offlineMethod?.id
                                                        ? theme.palette.whiteContainer.main
                                                        : theme.palette.neutral[800]} fontSize="12px">{item.method_name}</Typography> */}
                                                </OfflineButton>
                                            );
                                        })
                                        }
                                    </CustomStackFullWidth>
                                </CustomStackFullWidth>
                            }
                        </CustomStackFullWidth>
                    </CustomStackFullWidth>
                )
            }

            <Stack paddingTop="30px">
                <PrimaryButton variant="contained" onClick={handleSubmit}>
                    {t("Select")}
                </PrimaryButton>
            </Stack>
        </Stack>
    );
};

export default AllPaymentMethod;
