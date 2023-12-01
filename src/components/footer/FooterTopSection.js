import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import SocialLinks from './SocialLinks'
import { useSelector } from 'react-redux'
import { Typography, useMediaQuery } from '@mui/material'
import { RouteLinksData } from './RouteLinksData'
import { t } from 'i18next'
import { useTheme } from '@mui/material/styles'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import { RTL } from '../RTL/RTL'

const FooterTopSection = () => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleClick = (href, value) => {
        if (value === 'profile') {
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
        } else {
            Router.push(href)
        }
    }
    return (
        <RTL direction={languageDirection}>
            <CustomStackFullWidth spacing={4}>
                <SocialLinks global={global} />
                <CustomStackFullWidth
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    direction={{ xs: 'column', md: 'row' }}
                >
                    {RouteLinksData.map((item, index) => {
                        return (
                            <CustomColouredTypography
                                key={index}
                                variant="h5"
                                color="whiteContainer.main"
                                onClick={() =>
                                    handleClick(item.link, item.value)
                                }
                                sx={{
                                    cursor: 'pointer',
                                    borderLeft:
                                        index !== 0 &&
                                        !isSmall &&
                                        `2px solid ${theme.palette.text.footerText}`,
                                    paddingLeft: '10px',

                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {t(item.name)}
                            </CustomColouredTypography>
                        )
                    })}
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </RTL>
    )
}

export default FooterTopSection
