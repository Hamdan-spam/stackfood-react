import React, { useEffect } from 'react'
import FooterLg from './FooterLg'
import FooterSm from './FooterSm'
import footerBg from './footerBg.svg'
import { StyledFooterBackground } from './Footer.style'
import { Container } from '@mui/material'
import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle'
import FooterBottom from './FooterBottom'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'
import FooterTopSection from './FooterTopSection'
import { landingPageApi } from '../landingpage/Api'
import { useQuery } from 'react-query'
import { onErrorResponse } from '../ErrorResponse'
import { useDispatch, useSelector } from 'react-redux'

import { useGetLandingPageData } from '../../hooks/react-query/landing-page/useGetLandingPageData'
import { setLandingPageData } from '../../redux/slices/storedData'
const Footer = ({ languageDirection }) => {
    const dispatch = useDispatch()
    const { landingPageData } = useSelector((state) => state.storedData)
    const router = useRouter()
    const onSuccessHandler = (res) => {
        dispatch(setLandingPageData(res))
    }

    const { data, refetch, isLoading } = useGetLandingPageData(onSuccessHandler)
    useEffect(() => {
        if (!landingPageData) {
            refetch()
        }
    }, [])

    return (
        <>
            <FooterTop landingPageData={landingPageData} />
            <StyledFooterBackground router={router.pathname}>
                <CustomStackFullWidth
                    height="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingTop="50px"
                >
                    <FooterTopSection />
                    <FooterMiddle
                        landingPageLink={landingPageData.landing_page_links}
                        landingPageData={landingPageData}
                    />
                    <FooterBottom />
                </CustomStackFullWidth>
            </StyledFooterBackground>
        </>
    )
}

export default Footer
