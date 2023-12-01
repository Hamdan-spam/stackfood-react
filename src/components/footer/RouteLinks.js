import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'

import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import { Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { t } from 'i18next'
import { router } from 'next/client'

const RouteLinks = (props) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const { token, global, title, RouteLinksData } = props
    const { t } = useTranslation()
    const handleClick = (href, value) => {
        if (value === 'loyalty' || value === 'wallets') {
            if (token) {
                Router.push(
                    {
                        pathname: '/info',
                        query: { page: value },
                    },
                    undefined,
                    { shallow: true }
                )
            } else {
                toast.error(t('You must be login to access this page.'))
            }
        } else if (
            value === 'campaigns' ||
            value === 'popular' ||
            value === 'latest'
        ) {
            const zoneId = localStorage.getItem('zoneid')
            if (zoneId) {
                Router.push({
                    pathname: '/home',

                    query: {
                        restaurantType: value,
                    },
                })
            } else {
                toast.error(t('You must pick a zone to access this page.'))
            }
            window.scrollTo(0, 0)
        } else if (value === 'best-reviewed-foods') {
            const zoneId = localStorage.getItem('zoneid')
            if (zoneId) {
                router.push({
                    pathname: '/home',
                    query: {
                        page: 'most-reviewed',
                    },
                })
            } else {
                toast.error(t('You must pick a zone to access this page.'))
            }

            window.scrollTo(0, 0)
        } else if (value === 'restaurant_owner') {
            window.open(href)
        } else if (value === 'delivery_man') {
            window.open(href)
        } else {
            Router.push(href, undefined, { shallow: true })
        }
    }
    const languageDirection = localStorage.getItem('direction')
    const handleClickToRoute = (href) => {
        router.push(href, undefined, { shallow: true })
    }

    return (
        <CustomStackFullWidth spacing={2}>
            <Typography
                color={theme.palette.whiteContainer.main}
                fontSize="14px"
                fontWeight="600"
            >
                {t(title)}
            </Typography>

            {RouteLinksData.map((item, index) => {
                return (
                    <CustomColouredTypography
                        key={index}
                        fontsize={isXSmall ? '14px' : '14px'}
                        color="whiteContainer.main"
                        onClick={() => handleClick(item.link, item.value)}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {t(item.name)}
                    </CustomColouredTypography>
                )
            })}
            {title === 'Other' && global?.refund_policy_status !== 0 && (
                <CustomColouredTypography
                    fontsize={isXSmall ? '13px' : '14px'}
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/refund-policy')}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Refund Policy')}
                </CustomColouredTypography>
            )}
            {title === 'Other' && global?.cancellation_policy_status !== 0 && (
                <CustomColouredTypography
                    fontsize={isXSmall ? '13px' : '14px'}
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/cancellation-policy')}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Cancellation Policy')}
                </CustomColouredTypography>
            )}
            {title === 'Other' && global?.shipping_policy_status !== 0 && (
                <CustomColouredTypography
                    fontsize={isXSmall ? '13px' : '14px'}
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/shipping-policy')}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Shipping Policy')}
                </CustomColouredTypography>
            )}

        </CustomStackFullWidth>
    )
}

RouteLinks.propTypes = {}

export default RouteLinks
