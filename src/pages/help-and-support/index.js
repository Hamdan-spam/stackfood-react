import React from 'react'
import Help from '../../components/help-page/Help'
import Meta from '../../components/Meta'
import { useSelector } from 'react-redux'
import { Container, CssBaseline } from '@mui/material'
import HelpPage from '../../components/help-page/HelpPage'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'
import { getServerSideProps } from '../index'
const index = ({ configData }) => {
    return (
        <>
            <Meta title={`Help and support - ${configData?.business_name}`} />
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <HelpPage configData={configData} />
            </Container>
        </>
    )
}

export default index
export { getServerSideProps }
