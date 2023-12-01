import React from 'react'
import { Stack } from '@mui/system'
import CustomImageContainer from '../CustomImageContainer'
import { Typography } from '@mui/material'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { t } from 'i18next'
import moment from 'moment'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@emotion/react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

const MiddleSection = ({ campaignsDetails, image }) => {
    const theme = useTheme()
    const iconColor = theme.palette.primary.main
    return (
        <CustomStackFullWidth spacing={1}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <CustomImageContainer
                    src={image}
                    height="100px"
                    width="200px"
                    borderRadius=".6rem"
                    objectFit="cover"
                />
                <Stack
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Typography
                        fontWeight="700"
                        variant="h5"
                        color={theme.palette.neutral[1000]}
                    >
                        {campaignsDetails?.title}
                    </Typography>
                    <Typography
                        fontSize={{ xs: '12px', sm: '12px', md: '14px' }}
                        color={theme.palette.neutral[600]}
                    >
                        {campaignsDetails?.description}
                    </Typography>
                </Stack>
            </Stack>
            <CustomStackFullWidth spacing={0.5}>
                <Stack direction="row" spacing={1}>
                    <EventAvailableIcon
                        style={{ fontSize: '18px', color: iconColor }}
                    />
                    <Typography
                        fontSize={{ xs: '10px', md: '14px' }}
                        fontWeight={{ xs: '400', md: '600' }}
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Campaign Schedule :')}
                    </Typography>
                    <Typography
                        fontSize={{ xs: '10px', md: '14px' }}
                        fontWeight={{ xs: '400', md: '600' }}
                        color={theme.palette.primary.main}
                    >
                        {moment(campaignsDetails?.available_date_starts).format(
                            'MMMM Do YYYY'
                        )}
                        -
                        {moment(campaignsDetails?.available_date_ends).format(
                            'MMMM Do YYYY'
                        )}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <AccessTimeIcon
                        style={{ fontSize: '18px', color: iconColor }}
                    />
                    <Typography
                        fontSize={{ xs: '10px', md: '14px' }}
                        color={theme.palette.neutral[1000]}
                        fontWeight={{ xs: '400', md: '600' }}
                    >
                        {t('Daily time: ')}
                    </Typography>
                    {campaignsDetails ? (
                        <Typography
                            fontSize={{ xs: '10px', md: '14px' }}
                            color={theme.palette.primary.main}
                            fontWeight={{ xs: '400', md: '600' }}
                        >
                            {moment(campaignsDetails?.start_time, [
                                'HH:mm',
                            ]).format('hh:mm a')}{' '}
                            -{' '}
                            {moment(campaignsDetails?.end_time, [
                                'HH:mm',
                            ]).format('hh:mm a')}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width="100px" />
                    )}
                </Stack>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default MiddleSection
