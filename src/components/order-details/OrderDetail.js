import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import OrderDetails from './OrderDetails';
import PushNotificationLayout from "../PushNotificationLayout";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <PushNotificationLayout>
                    <OrderDetails phone={guestUserInfo?.contact_person_number} />
                </PushNotificationLayout>
            </Container>
        </>
    );
};

export default OrderDetail;