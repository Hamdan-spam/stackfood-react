import React from 'react'

import Meta from '../../components/Meta'
import img from '../../../public/static/Privacy/RectangleP.png'
import ShippingPolicy from '../../components/shipping-policy/ShippingPolicy'
import ProtectShipping from './ProtectShipping'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import ShippingPolicyPage from '../../components/shipping-policy/ShippingPolicyPage'
import { getServerSideProps } from '../index'
const index = ({ configData }) => {
    return (
        <>
            <Meta title={`Shipping Policy - ${configData?.business_name}`} />

            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            >
                <ProtectShipping>
                    <ShippingPolicyPage configData={configData} />
                </ProtectShipping>
            </Container>
        </>
    )
}

export default index
export { getServerSideProps }
