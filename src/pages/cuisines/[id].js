import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import CuisinesDetailsPage from '../../components/cuisines-page/CuisinesDetailsPage'
import { useRouter } from 'next/router'
import { useGetCuisinesDetails } from '../../hooks/react-query/cuisines/useGetCuisinesDetails'
import { CustomHeader } from '../../api/Headers'
import { landingPageApi } from '../../components/landingpage/Api'
import Meta from '../../components/Meta'
import { t } from 'i18next'
import CustomContainer from '../../components/container'

const Index = ({ configData, landingPageData, pathName }) => {
    const [offset, setOffset] = useState(1)
    const [page_limit, setPageLimit] = useState(10)
    const router = useRouter()
    const { id, name } = router.query
    const { data, refetch, isLoading } = useGetCuisinesDetails({
        id,
        page_limit,
        offset,
    })

    useEffect(() => {
        refetch()
    }, [id])
    return (
        <>
            <Meta
                title={`${name} on ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
            <CustomContainer>
                <CustomStackFullWidth>
                    <CustomPaperBigCard
                        sx={{ marginTop:{xs: '1.5rem',sm:"2rem",md:"5rem"}, marginBottom: '1rem' }}
                        padding="1rem"
                    >
                        <CuisinesDetailsPage
                            data={data}
                            isLoading={isLoading}
                        />
                    </CustomPaperBigCard>
                </CustomStackFullWidth>
            </CustomContainer>
        </>
    )
}

export default Index

export const getServerSideProps = async (context) => {
    const { req, resolvedUrl } = context
    const language = req.cookies.languageSetting
    const domain = req.headers.host
    const pathName = 'https://' + domain + resolvedUrl
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: {
                'X-software-id': 33571750,
                'X-server': 'server',
                'X-localization': language,
                origin: process.env.NEXT_CLIENT_HOST_URL,
            },
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
