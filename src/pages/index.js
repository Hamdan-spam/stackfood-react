import LandingPage from '../components/landingpage'
import React, { useEffect } from 'react'
import PushNotificationLayout from '../components/PushNotificationLayout'
import Meta from '../components/Meta'
import { setGlobalSettings } from '../redux/slices/global'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import { CustomHeader } from '../api/Headers'

const Home = ({ configData, landingPageData }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (configData && landingPageData) {
            if (configData.length === 0 && landingPageData.length === 0) {
                Router.push('/404')
            } else if (configData?.maintenance_mode) {
                Router.push('/maintenance')
            } else {
                dispatch(setGlobalSettings(configData))
            }
        } else {
        }
    }, [configData, landingPageData])

    useEffect(() => {
        dispatch(setGlobalSettings(configData));
    }, [configData]);

    return (
        <>
            <Meta
                title={configData?.business_name}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
            />
            <PushNotificationLayout>
                {configData && landingPageData && (
                    <LandingPage
                        global={configData}
                        landingPageData={landingPageData}
                    />
                )}
            </PushNotificationLayout>
        </>
    )
}
export default Home

export const getServerSideProps = async (context) => {
    const { req } = context
    const language = req.cookies.languageSetting
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
    const landingPageRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/landing-page`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const landingPageData = await landingPageRes.json()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData,
        },
    }
}
