import React from 'react'
import TermsCondition from '../../components/terms-condition/TermsCondition'
import { useSelector } from 'react-redux'
import { AccessTime } from '@mui/icons-material'
import Meta from '../../components/Meta'
import img from '../../../public/static/Privacy/RectangleP.png'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import ConditionPage from '../../components/terms-condition/ConditionPage'
import { CustomHeader } from '../../api/Headers'
import { getServerSideProps } from '../index'
const index = ({ configData }) => {
    return (
        <>
            <Meta
                title={`Terms and conditions - ${configData?.business_name}`}
            />
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <ConditionPage configData={configData} />
            </Container>
        </>
    )
}

export default index
export { getServerSideProps }
