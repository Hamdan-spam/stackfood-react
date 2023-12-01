import React from 'react'
import { alpha, Avatar, Badge, Stack, styled, Typography } from '@mui/material'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomTypography } from '../custom-tables/Tables.style'
import {
    FormatedDateWithTime,
    getDateFormat,
} from '../../utils/customFunctions'
import { useQuery } from 'react-query'
import { ProfileApi } from '../../hooks/react-query/config/profileApi'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { t } from 'i18next'
import adminImage from '../../../public/static/food.png'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import moment from 'moment/moment'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))

const InfoCard = (props) => {
    const {
        name,
        messageTime,
        receiver,
        userList,
        unRead,
        currentId,
        selectedId,
        last_message,
        email,
    } = props

    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    const ChatImageUrl = () => {
        if (userList.receiver_type === 'vendor') {
            return global?.base_urls?.restaurant_image_url
        }
        if (userList.receiver_type === 'delivery_man') {
            return global?.base_urls?.delivery_man_image_url
        } else global?.base_urls?.business_logo_url
    }

    const userImage = userList?.receiver?.image

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo
    )

    const isSender =
        data?.data?.userinfo?.id === userList.last_message.sender_id
    const languageDirection = localStorage.getItem('direction')
    const isRead = !isLoading && !isSender && unRead > 0

    return (
        <CustomStackFullWidth
            direction="row"
            spacing={2}
            alignItems="center"
            borderRadius="10px"
            padding="10px 15px 10px 10px"
            sx={{
                background:
                    selectedId === currentId
                        ? (theme) => alpha(theme.palette.primary.main, 0.1)
                        : '',
            }}
        >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                //variant="dot"
            >
                <Avatar
                    src={`${ChatImageUrl()}/${userImage}`}
                    style={{ width: '36px', height: '36px' }}
                />
            </StyledBadge>
            <CustomStackFullWidth spacing={0.5}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ paddingInlineEnd: '10px' }}
                    spacing={1}
                >
                    <CustomTypographyEllipsis
                        sx={{
                            maxWidth: '110px',
                            fontSize: '13px',
                            fontWeight: '700',
                        }}
                    >
                        {receiver}
                    </CustomTypographyEllipsis>
                    <CustomTypographyEllipsis
                        variant="h5"
                        fontWeight="500"
                        color={theme.palette.neutral[500]}
                        sx={{
                            textAlign: 'right',
                        }}
                    >
                        {moment(messageTime).format('MMM Do YY').slice(0, 7)}
                        {/*{!isLoading && !isSender && unRead > 0 && unRead}*/}
                    </CustomTypographyEllipsis>
                </Stack>
                <CustomTypographyEllipsis
                    sx={{ maxWidth: '130px' }}
                    fontSize={isRead > 0 ? '15px' : '10px'}
                    fontWeight={isRead > 0 ? '700' : '400'}
                    color={
                        isRead > 0
                            ? theme.palette.neutral[1000]
                            : theme.palette.neutral[500]
                    }
                >
                    {last_message?.message && last_message?.message}{' '}
                </CustomTypographyEllipsis>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    marginRight={languageDirection === 'rtl' ? '1rem' : '0rem'}
                >
                    {/*<Typography variant="h6" fontWeight="400">*/}
                    {/*    {t(name)}*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="h6" fontWeight="400">*/}
                    {/*    {FormatedDateWithTime(messageTime)}*/}
                    {/*</Typography>*/}
                </Stack>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}
export default InfoCard
