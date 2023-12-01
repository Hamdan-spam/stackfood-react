import React, { memo, useRef, useState } from 'react'
import { Box, Skeleton, Stack, Typography, styled } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'
import fire_image from '../../../../public/static/fire.svg'
import FoodCard from '../../food-card/FoodCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'

import { AllRoutes } from '../../../AllRoutes'
import { useTranslation } from 'react-i18next'

import CustomImageContainer from '../../CustomImageContainer'

import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FoodCardHorizontalShimmer from '../../food-card/FoodCardHorizontalShimmer'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import { HandleNext, HandlePrev } from '../../CustomSliderIcon'

const SliderCustom = styled(Stack)(
    ({ theme, language_direction, nopadding }) => ({
        position: "relative",
        width: "100%",
        paddingY: "10px",
        "& .slick-slider": {
            "& .slick-slide": {
                padding: "6px",
            },
            "& .slick-list": {
                paddingY: nopadding !== "true" && "8px",
                "& .slick-track": {
                    //float: theme.direction === "ltr" ? "left" : "right",
                    gap: "5px",
                },
            },
        },
    })
);

const NearbyPopularFood = ({ data, isLoading, isFetching }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [hoverOn, setHoverOn] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    const { popularFood } = useSelector((state) => state.storedData)
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const limit = 6
    const handleClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        router.push(
            {
                pathname:
                    router.pathname === '/home'
                        ? window.location.pathname
                        : 'search',
                query: {
                    page: 'popular',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' ? true : false }
        )
    }
    const settings = {
        speed: 500,
        slidesPerRow: 1,
        rows: 2,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: hoverOn && <HandlePrev />,
        nextArrow: hoverOn && <HandleNext />,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: .8,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1.05,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1.2,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.5,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1.6,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1.8,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2.1,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2.4,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2.7,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3.5,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>

            <Grid
                container
                paddingTop={popularFood.length > 0 && '1.9rem'}
                gap="1.4rem"
                onMouseEnter={() => setHoverOn(true)}
                onMouseLeave={() => setHoverOn(false)}
            >
                {(popularFood.length > 0 && !isLoading) && (
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        lg={12}
                    >
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <CustomImageContainer
                                    src={fire_image.src}
                                    width="26px"
                                    height="26px"
                                />
                                <Typography
                                    fontSize={{ xs: "16px", md: "20px" }}
                                    fontWeight={{ xs: "500", md: "700" }}
                                    color={theme.palette.neutral[1000]}
                                >
                                    {t('Popular  Foods Nearby')}
                                </Typography>
                            </Stack>
                            <CustomViewAll
                                onClick={handleClick}
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <Typography fontSize="14px" fontWeight="500" >{t('View all')}</Typography>

                            </CustomViewAll>
                        </CustomStackFullWidth>
                    </Grid>
                )}
                {!isLoading ? (
                    <CustomStackFullWidth>
                        <SliderCustom
                            gap="12px"
                            paddingBottom={isSmall ? "10px" : "20px"}
                            languageDirection={languageDirection}
                        >
                            <Slider {...settings}>
                                {popularFood?.map((product) => {
                                    if (
                                        product?.variations === null ||
                                        product?.variations[0]?.values ||
                                        product?.variations?.length === 0
                                    ) {
                                        return (
                                            <Stack pb="1rem" key={product?.id}>
                                                <FoodCard
                                                    product={product}
                                                    productImageUrl={
                                                        global?.base_urls?.product_image_url
                                                    }
                                                    horizontal="true"
                                                    hasBackGroundSection="true"
                                                />
                                            </Stack>
                                        );

                                    }
                                })}
                            </Slider>
                        </SliderCustom>
                    </CustomStackFullWidth>
                ) : (
                    <CustomStackFullWidth>
                        <SliderCustom nopadding="true">
                            <Slider {...settings}>
                                {[...Array(12)].map((item, index) => (
                                    <FoodCardHorizontalShimmer key={index} maxWidth="375px" />
                                ))}
                            </Slider>
                        </SliderCustom>
                    </CustomStackFullWidth>
                )

                }
            </Grid>
        </>
    )
}

export default memo(NearbyPopularFood)