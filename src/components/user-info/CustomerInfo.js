import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useSelector } from 'react-redux'
import CustomImageContainer from '../CustomImageContainer'
import { Avatar, Typography } from '@mui/material'
import moment from 'moment'
import { t } from 'i18next'
const CustomerInfo = () => {
    const { userData } = useSelector((state) => state.user)
    const { global } = useSelector((state) => state.globalSettings)
    const customerbaseUrl = global?.base_urls?.customer_image_url

    return (
        <CustomStackFullWidth
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
        >
            <Avatar
                sx={{
                    height: 68,
                    width: 70,
                }}
                src={`${customerbaseUrl}/${userData?.image}`}
            />
            <CustomStackFullWidth>
                <Typography fontSize="1rem" fontWeight="700">
                    {' '}
                    {userData?.f_name?.concat(' ', userData?.l_name)}
                </Typography>
                <Typography fontSize="0.75rem" fontWeight="500">
                    {userData?.phone}
                </Typography>
                <Typography fontSize="0.65rem" fontWeight="500">
                    {t('Joined')}{' '}
                    {moment(userData?.created_at).format('MMM Do YY')}
                </Typography>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default CustomerInfo
