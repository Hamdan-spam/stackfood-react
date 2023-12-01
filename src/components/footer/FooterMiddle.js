import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import {
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import LogoSide from '../navbar/second-navbar/LogoSide'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'
import AppLinks from '../landingpage/AppLinks'
import RouteLinks from './RouteLinks'
import { useTheme } from '@mui/material/styles'
import { QuickLinkData } from './QuickLinkData'
import { OtherData } from './OtherData'
import { QuickLinkData1 } from './QuickLinkData1'
import ContactInfo from './ContactInfo'
import CustomContainer from '../container'

const FooterMiddle = ({ landingPageLink, landingPageData }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const { t } = useTranslation()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const businessLogo = global?.logo
    return (
        <CustomStackFullWidth alignItems="center" pt="3rem">
            <CustomContainer>
                <Grid
                    container
                    spacing={{ xs: 2, md: 4 }}
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        align={isSmall && 'center'}
                    >
                        <CustomStackFullWidth
                            spacing={4}
                            alignItems={{
                                xs: 'center',
                                sm: 'center',
                                md: 'flex-start',
                            }}
                            justifyContent="flex-start"
                        >
                            <Link href={zoneid ? '/home' : '/'}>
                                <LogoSide
                                    global={global}
                                    businessLogo={businessLogo}
                                />
                            </Link>
                            <Typography
                                fontSize="14px"
                                color={theme.palette.whiteContainer.main}
                            >
                                {landingPageData?.footer_data}
                            </Typography>
                            <ContactInfo global={global} />
                            <AppLinks
                                global={global}
                                download_app_data={
                                    landingPageData?.download_app_section
                                }
                                width="140px"
                            />
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2}
                        align={isSmall && 'center'}
                    >
                        <RouteLinks
                            token={token}
                            global={global}
                            title="Quick Links"
                            RouteLinksData={QuickLinkData}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        align={isSmall && 'center'}
                    >
                        <RouteLinks
                            token={token}
                            global={global}
                            title={isXSmall ? '' : 'Quick Links'}
                            RouteLinksData={QuickLinkData1}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        align={isSmall && 'center'}
                    >
                        <RouteLinks
                            token={token}
                            global={global}
                            title="Other"
                            RouteLinksData={OtherData}
                        />
                    </Grid>
                </Grid>
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

FooterMiddle.propTypes = {}

export default FooterMiddle
