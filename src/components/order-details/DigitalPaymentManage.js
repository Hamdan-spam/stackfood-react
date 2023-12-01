import React from 'react';
import {WrapperForCustomDialogConfirm} from "../custom-dialog/confirm/CustomDialogConfirm.style";
import {Stack} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import {CustomButtonCancel, CustomButtonSuccess} from "../../styled-components/CustomButtons.style";
import {t} from "i18next";
import {useMutation} from "react-query";
import {OrderApi} from "../../hooks/react-query/config/orderApi";
import {toast} from "react-hot-toast";
import {onErrorResponse} from "../ErrorResponse";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
const DigitalPaymentManage = ({ setModalOpenForPayment,refetchOrderDetails,refetchTrackData,id,setModalOpen}) => {
    const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
        useMutation(
            'order-payment-method-update',
            OrderApi.FailedPaymentMethodUpdate
        )

    const handleOnSuccess = () => {
        const handleSuccess = (response) => {
            toast.success(response.data.message)
            refetchOrderDetails()
            refetchTrackData()
            setModalOpenForPayment(false)
        }
        const formData = {
            order_id: id,
            _method: 'put',
        }
        paymentMethodUpdateMutation(formData, {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
        })

    }
    const handleClose=()=>{
        setModalOpenForPayment(false)
        setModalOpen(true)

    }
    return (
        <>
            <WrapperForCustomDialogConfirm width="30rem">
                <CustomStackFullWidth>
                   <CustomStackFullWidth alignItems='center' justifyContent='center' mb='1rem'>
                       <SwitchAccessShortcutIcon sx={{color: theme=> theme.palette.primary.main, fontSize:'60px'}} />
                   </CustomStackFullWidth>
                    <DialogTitle id="alert-dialog-title" sx={{padding:"10px 24px"}}>
                        <Typography textAlign="center" variant="h4">{t("Switch Your payment method ")}</Typography>
                    </DialogTitle>
                    <DialogActions>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                            spacing={{ xs: 1, sm: 2, md: 2 }}
                        >
                            <CustomButtonSuccess
                                loading={orderLoading}
                                variant="contained"
                                onClick={handleOnSuccess}
                            >
                                {t('Switch to Cash on Delivery')}
                            </CustomButtonSuccess>
                            <CustomButtonCancel
                                width="13.5rem"
                                variant="contained"
                                onClick={handleClose}
                            >
                                {t('Cancel Order')}
                            </CustomButtonCancel>
                        </Stack>
                    </DialogActions>

                </CustomStackFullWidth>
            </WrapperForCustomDialogConfirm>
        </>
    );
};

export default DigitalPaymentManage;
