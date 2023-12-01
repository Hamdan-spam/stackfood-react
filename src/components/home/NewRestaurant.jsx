import React, { memo, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Grid, IconButton, Stack, Typography } from "@mui/material";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Skeleton from '@mui/material/Skeleton'
import { CustomStackFullWidth, CustomViewAll, SliderCustom } from "../../styled-components/CustomStyles.style";
import FoodCardShimmer from '../food-card/FoodCarShimmer'
import { HandleNext, HandlePrev } from '../CustomSliderIcon'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { onErrorResponse } from "../ErrorResponse";
import LatestRestaurantCard from "../restaurant-details/LatestRestaurantCard";
import { CustomGridWithBgColor, CustomSideOverLay } from './food-campaign/FoodCampaign.style'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Router from "next/router";

const NewRestaurant = () => {
    const { t } = useTranslation()
    const [hoverOn, setHoverOn] = useState(false)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    const { global } = useSelector((state) => state.globalSettings)
    const languageDirection = localStorage.getItem('direction')
    const {
        isLoading,
        data: newRestuarants,
        isError,
        error,
        refetch,
    } = useQuery(
        ['latest-restaurants'],
        () => RestaurantsApi?.latestRestaurants(),
        { enabled: false, onError: onErrorResponse }
    )

    useEffect(async () => {
        await refetch()
    }, [])

    const settings = {
        speed: 500,
        slidesToShow: 3.4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 3.7,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3.6,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 3.1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1.6,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1.4,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 370,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
        ],
    }
    const handleClick=()=>{
        Router.push({
            pathname: '/home',

            query: {
                restaurantType: "latest",
            },
        })
    }

    return (
        <Grid
            container
            paddingTop={newRestuarants?.data?.length > 0 && '1.9rem'}
            gap="1.4rem"
        >
            <CustomGridWithBgColor
                foodsize={newRestuarants?.data?.length}
                padding="23px 0 0 23px"
                item
                xs={12}
                md={12}
                sm={12}
                lg={12}
                onMouseEnter={() => setHoverOn(true)}
                onMouseLeave={() => setHoverOn(false)}
            >
                {newRestuarants?.data?.length > 0 && (
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingBottom="20px"
                    >
                        <Stack direction="row" spacing={1}>

                            <Typography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontSize={{ xs: "16px", md: "20px" }}
                                fontWeight={{ xs: "500", md: "700" }}
                            >
                                {t('New on Stackfood')}
                            </Typography>
                        </Stack>
                        <CustomViewAll
                            onClick={handleClick}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            marginRight="2rem"
                        >

                                <Typography fontSize="14px" fontWeight="500" >{t('View all')}</Typography>

                        </CustomViewAll>
                    </CustomStackFullWidth>
                )}
                {hoverOn && newRestuarants?.data?.length >= 4 && (
                    <CustomSideOverLay left="unset" right="0" />
                )}
                {!isLoading ? (
                    <CustomStackFullWidth>
                        <SliderCustom
                            languageDirection={languageDirection}
                            gap="12px"
                            paddingBottom={isSmall ? "10px" : "20px"}
                        >
                            <Slider {...settings}>
                                {newRestuarants?.data?.map((restaurantData) => {

                                    return (
                                        <Stack>
                                            <LatestRestaurantCard
                                                key={restaurantData?.id}
                                                id={restaurantData.id}
                                                image={restaurantData?.cover_photo}
                                                logo={restaurantData?.logo}
                                                name={restaurantData?.name}
                                                restaurantImageUrl={
                                                    global?.base_urls
                                                }
                                                restaurantDiscount={
                                                    restaurantData.discount &&
                                                    restaurantData.discount
                                                }
                                                delivery_fee={
                                                    restaurantData?.delivery_fee
                                                }
                                                open={restaurantData?.open}
                                                active={restaurantData?.active}
                                                delivery_time={
                                                    restaurantData?.delivery_time
                                                }

                                                discount={restaurantData?.discount}
                                                cuisines={restaurantData?.cuisine}
                                                coupons={restaurantData?.coupons}
                                                slug={restaurantData?.slug}
                                                zone_id={restaurantData?.zone_id}
                                                distance={restaurantData?.distance}
                                                foods_count={restaurantData?.foods_count}
                                            />

                                        </Stack>
                                    )

                                })}
                            </Slider>
                        </SliderCustom>
                    </CustomStackFullWidth>
                ) : (
                    <Stack marginTop="40px" spacing={2}>
                        <Skeleton
                            variant="rectangular"
                            width="40%"
                            height="20px"
                        />
                        <SliderCustom
                            languageDirection={languageDirection}
                            gap="12px"
                            paddingBottom={isSmall ? "10px" : "20px"}>
                            <Slider {...settings}>
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                            </Slider>
                        </SliderCustom>
                    </Stack>
                )}
            </CustomGridWithBgColor>
        </Grid>
    )
}

export default memo(NewRestaurant)