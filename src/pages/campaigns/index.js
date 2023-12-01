import React from 'react'
import Products from '../../components/products-page/Products'
import CampaignsPage from '../../components/products-page/CampaignsPage'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Meta from '../../components/Meta'
import CategoryDetailsPage from '../../components/category/CategoryDetailsPage'
import { Container, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomPageTitle from '../../components/CustomPageTitle'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { landingPageApi } from '../../components/landingpage/Api'
import { CustomHeader } from '../../api/Headers'
import CustomContainer from '../../components/container'

const index = ({ configData, landingPageData, pathName }) => {
    const { t } = useTranslation()
    return (
        <CustomContainer>
            <CustomStackFullWidth marginBottom="1.6rem">
                <CustomPaperBigCard
                    padding="1rem"
                    sx={{ marginTop: '1rem', minHeight: '70vh' }}
                >
                    <Meta
                        title={`${t('Campaigns')} on ${
                            configData?.business_name
                        }`}
                        ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                        pathName={pathName}
                    />
                    <CustomStackFullWidth spacing={2}>
                        <CustomPageTitle title={t('Special Food Offers')} />
                        <CampaignsPage />
                    </CustomStackFullWidth>
                </CustomPaperBigCard>
            </CustomStackFullWidth>
        </CustomContainer>
    )
}

export default index
export const getServerSideProps = async ({ params, req, resolvedUrl }) => {
    const domain = req.headers.host
    const pathName = 'https://' + domain + resolvedUrl
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    const landingPageData = await landingPageApi.getLandingPageImages()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData.data,
            pathName: pathName,
        },
    }
}
