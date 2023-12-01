import React from 'react'
import { Modal } from '@mui/material'
import ForgotPassword from '../../components/auth/forgot-password/ForgotPassword'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import Meta from '../../components/Meta'
import { getServerSideProps } from '../index'

const index = ({ configData }) => {
    return (
        <>
            <Meta title={`Forgot Password - ${configData?.business_name}`} />
            <ForgotPassword />
        </>
    )
}

export default index
export { getServerSideProps }
