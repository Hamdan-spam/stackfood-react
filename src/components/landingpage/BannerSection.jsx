import React, { useEffect, useRef, useState } from 'react'
import { Box, Card, Grid, NoSsr, Stack, Typography } from '@mui/material'
import LandingBannerOne from '../../../public/static/banners/BannerOne.png'
import LandingBannerTwo from '../../../public/static/banners/BannerTwo.png'
import LandingHomeBannerLg from '../../../public/static/banners/HomeBannerLg.png'
import { LandingPageTypography } from './landingPageStyle'
import { useTranslation } from 'react-i18next'
import ImageNotFound from '../../../public/static/no-image-found.png'
import Skeleton from '@mui/material/Skeleton'
import { useRouter } from 'next/router'
import CustomContainer from '../container'
import {
    CustomStackFullWidth,
    SliderCustom,
} from '../../styled-components/CustomStyles.style'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { RTL } from '../RTL/RTL'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { HandleNext, HandlePrev } from '../CustomSliderIcon'
import { useTheme } from '@emotion/react'

const demoData = [
    {
        title: '',
        img: ImageNotFound,
        sub_title: '',
    },
    {
        title: '',
        img: ImageNotFound,
        sub_title: '',
    },
]
const BannerSection = ({
    banner_section_half,
    discount_banner,
    global,
    isLoading,
    promotional_banner_image_url,
}) => {
    const { t } = useTranslation()
    const [data, setData] = useState([])
    const [hoverOn, setHoverOn] = useState(false)
    const discountRef = useRef(null)
    const theme = useTheme()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const title = ''
    const subTitle = ''
    const discountUpTo = ''
    const discountItem = ''
    const router = useRouter()
    const styles = {
        maxWidth: 1200,
        width: '100%',
    }
    const settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: 'true',
        infinite: 'true',
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        responsive: [
            {
                breakpoint: 3600,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 3200,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 2800,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 2400,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // initialSlide: 2
                    infinite: true,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    className: 'center',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                    // dots: true
                    initialSlide: 0,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    }
    return (
        <RTL direction={languageDirection}>
            <CustomContainer>
                <Stack width="100%" direction="row" sx={{ marginTop: '25px' }}>
                    <CustomStackFullWidth
                        onMouseEnter={() => setHoverOn(true)}
                        onMouseLeave={() => setHoverOn(false)}
                    >
                        {!isLoading ? (
                            <SliderCustom
                                languageDirection={languageDirection}
                                gap="0px"
                            >
                                <Slider ref={discountRef} {...settings}>
                                    {banner_section_half?.map((item, index) => {
                                        return (
                                            <>
                                                <Stack
                                                    height={{
                                                        xs: '131px',
                                                        sm: '155px',
                                                    }}
                                                    key={index}
                                                    sx={{
                                                        paddingInlineEnd: {
                                                            xs: '12px',
                                                            sm: '20px',
                                                            md: '20px',
                                                        },
                                                    }}
                                                >
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            backgroundImage: `url(${
                                                                typeof item.image ===
                                                                'string'
                                                                    ? `${promotional_banner_image_url}/${item.image}`
                                                                    : ImageNotFound.src
                                                            })`,
                                                            height: '100%',
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundRepeat:
                                                                'no-repeat',
                                                            borderRadius: '4px',

                                                            backgroundPosition:
                                                                'center',
                                                        }}
                                                    >
                                                        <Stack
                                                            width="250px"
                                                            padding="20px 26px 20px 26px"
                                                            justifyContent="center"
                                                            alignItems="flex-start"
                                                            height="100%"
                                                        >
                                                            <LandingPageTypography
                                                                fontWeight="700"
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .customColor
                                                                        .seven
                                                                }
                                                                fontSize="19px"
                                                                sx={{
                                                                    textTransform:
                                                                        'capitalize',
                                                                }}
                                                            >
                                                                {item.title}
                                                            </LandingPageTypography>
                                                            <LandingPageTypography
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .customColor
                                                                        .seven
                                                                }
                                                                sx={{
                                                                    mt: 1,

                                                                    textAlign:
                                                                        'left',
                                                                }}
                                                                fontWeight="400"
                                                                fontSize="16px"
                                                            >
                                                                {
                                                                    item.description
                                                                }
                                                            </LandingPageTypography>
                                                        </Stack>
                                                    </Card>
                                                </Stack>
                                            </>
                                        )
                                    })}
                                </Slider>
                            </SliderCustom>
                        ) : (
                            <Slider ref={discountRef} {...settings}>
                                {[...Array(3)].map((item) => {
                                    return (
                                        <Stack
                                            maxWidth="375px"
                                            width="100%"
                                            height="155px"
                                        >
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height="200px"
                                            />
                                        </Stack>
                                    )
                                })}
                            </Slider>
                        )}
                    </CustomStackFullWidth>
                </Stack>
            </CustomContainer>
        </RTL>
    )
}

export default BannerSection
