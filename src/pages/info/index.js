import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Meta from '../../components/Meta'
import CustomContainer from '../../components/container'
import UserInfo from '../../components/user-info'
import { useRouter } from 'next/router'
import AuthGuard from '../../components/authentication/AuthGuard'

const index = () => {
    const router = useRouter()
    const { page } = router.query

    return (
        <div>
            <CssBaseline />
            <CustomContainer>
                <AuthGuard from={router.pathname.replace('/', '')}>
                    {page && <UserInfo page={page} />}
                </AuthGuard>
            </CustomContainer>
        </div>
    )
}

export default index
