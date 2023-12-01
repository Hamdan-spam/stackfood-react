import React, { useEffect } from 'react'
import CheckOut from '../../components/checkout-page/CheckOut'
import Meta from '../../components/Meta'
import { Container, CssBaseline } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import ProductPage from '../../components/products-page/ProductPage'
import { useTranslation } from 'react-i18next'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { CustomHeader } from '../../api/Headers'
import CustomContainer from '../../components/container'
import { getServerSideProps } from '../index'
const CheckoutLayout = () => {
    const { cartList } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.userToken)
    const router = useRouter()
    const { page } = router.query
    const { global } = useSelector((state) => state.globalSettings)

    return (
        <>
            <CssBaseline />
            <CustomContainer>
                <CustomStackFullWidth sx={{ marginTop: '5rem' }}>
                    <Meta
                        title={`Checkout on ${global?.business_name}`}
                        description=""
                        keywords=""
                    />
                    {page === 'campaign' && <CheckOut />}
                    {page !== 'campaign' && cartList?.length > 0 && (
                        <CheckOut />
                    )}
                </CustomStackFullWidth>
            </CustomContainer>
        </>
    )
}
export default CheckoutLayout