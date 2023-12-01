import React, { useEffect } from 'react'
import Tracking from '../../../components/order-tracking/Tracking'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import { OrderApi } from '../../../hooks/react-query/config/orderApi'
import Meta from '../../../components/Meta'
import { useSelector } from 'react-redux'
import { onErrorResponse } from '../../../components/ErrorResponse'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import TrackingPage from '../../../components/order-tracking/TrackingPage'
import { CustomHeader } from '../../../api/Headers'
import { RTL } from '../../../components/RTL/RTL'
import { getServerSideProps } from '../../index'
import { getGuestId } from '../../../components/checkout-page/functions/getGuestUserId'
const index = ({ configData }) => {
    const router = useRouter()
    const { id } = router.query
    const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
    const guestId = getGuestId();
    const { data, refetch, isLoading, isFetching } = useQuery(
        [`category-tracking`, id],
        () => OrderApi.orderTracking(id, guestUserInfo?.contact_person_number, guestId)
    )
    useEffect(() => {
        refetch();
    }, [])

    return (
        <div className="div">
            <Meta title={`Orders Tracking - ${configData?.business_name}`} />
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                {!isLoading && <TrackingPage data={data?.data} />}
            </Container>
        </div>
    )
}

export default index
export { getServerSideProps }
