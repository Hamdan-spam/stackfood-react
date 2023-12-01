import { alpha, Grid, Stack, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import Link from 'next/link'
import { HomeTextTypography } from '../home/HomeStyle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import {
    RestaurantDiscountStack,
    OfferTypography,
    CustomChip,
} from '../food-card/FoodCard.style'
import {
    DistanceCalculate,
    getAmount,
    getDiscountForTag,
    handleBadge,
    restaurantDiscountTag,
} from '../../utils/customFunctions'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import placeholder from '../../../public/static/no-image-found.png'
import Card from '@mui/material/Card'
import CustomImageContainer from '../CustomImageContainer'
import FoodRating from '../food-card/FoodRating'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import { useQuery } from 'react-query'
import { CouponApi } from '../../hooks/react-query/config/couponApi'
import { onErrorResponse } from '../ErrorResponse'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import 'react-multi-carousel/lib/styles.css'
import DelivaryTruckIcon from "../../assets/images/icons/DelivaryTruckIcon";
import DistanceIcon from '../../assets/images/icons/DistanceIcon'
import RestaurantItemsIcon from '../../assets/images/icons/RestaurantItemsIcon'

export const SliderStack = styled(Stack)(
    ({ theme, languageDirection, gap, hasDiscount }) => ({
        '& .slick-slider': {
            width: hasDiscount ? '60px !important' : '100px !important',
            alignItems: 'center',
            '& .slick-list': {
                width: hasDiscount ? '75px !important ' : '100% !important ',
                '& .slick-track': {
                    width: '215px !important',
                    gap: '0px',
                },
            },
        },
    })
)
const ProfilePhotoWrapper = styled(Stack)(
    ({ theme }) => ({
        justifyContent: "center",
        alignItems: "center",
        // height:"100%",
        // width:"100%",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        borderRadius: "100%",
    })
)

const LatestRestaurantCard = (props) => {
    const {
        restaurantImageUrl,
        image,
        logo,
        name,
        id,
        active,
        open,
        restaurantDiscount,
        delivery_time,
        cuisines,
        coupons,
        slug,
        zone_id,
        distance,
        discount,
        foods_count,
        delivery_fee,
    } = props
    const { t } = useTranslation()
    const theme = useTheme()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    const percentOff = t('% OFF')
    const OFF = t('OFF')
    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const discountChip = () => {
        if (Number.parseInt(discount?.discount) > 0) {
            if (discount?.discount_type === 'percent') {
                return (
                    <CustomChip
                        discount
                        label={
                            !discount.end_date
                                ? `${discount?.discount} %`
                                : ` ${discount?.discount} ${percentOff}`
                        }
                        campaign={discount.end_date}
                    />
                )
            } else {
                return (
                    <CustomChip
                        discount
                        label={
                            !discount.end_date
                                ? ` ${getAmount(
                                    discount?.discount,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}`
                                : ` ${getAmount(
                                    discount?.discount,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )} ${OFF}`
                        }
                        campaign={discount.end_date}
                    />
                )
            }
        }
    }

    const restaurantCloseHandler = () => {
        if (active) {
            if (open === 0) {
                return (
                    <Stack
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: (theme) =>
                                alpha(theme.palette.primary.overLay, 0.5),

                            color: 'theme.palette.whiteContainer.main',
                            height: '100%',
                            justifyContent: 'center',
                            zIndex: 1,
                            backdropFilter: 'blur(1.5px)',
                            borderRadius: '5px',
                        }}
                    >
                        <Typography
                            variant="h4"
                            align="center"
                            color={theme.palette.whiteContainer.main}
                            sx={{
                                textTransform: 'uppercase',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            {t('Closed Now')}
                        </Typography>
                    </Stack>
                )
            }
        } else {
            return (
                <Stack
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: (theme) =>
                            alpha(theme.palette.primary.overLay, 0.5),

                        color: 'theme.palette.whiteContainer.main',
                        height: '100%',
                        justifyContent: 'center',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        color={theme.palette.whiteContainer.main}
                        sx={{ textTransform: 'uppercase', fontWeight: '700' }}
                    >
                        {t('Closed Now')}
                    </Typography>
                </Stack>
            )
        }
    }
    const handleClick = () => {
        router.push({
            pathname: `/restaurant/[id]`,
            query: {
                id: `${slug ? slug : id}`,
                restaurant_zone_id: zone_id,
            },
        })
    }
    return (
        <>
            <Stack maxWidth={{ xs: "290px", sm: "310px", md: "320px" }} height={{ xs: "195px", md: "210px" }} onClick={handleClick}>

                <CustomPaperBigCard
                    nopadding="true"
                    border
                    sx={{
                        // margin: "20px",
                        padding: '10px',
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        '&:hover': {
                            boxShadow: `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
                        },
                    }}
                >
                    <CustomStackFullWidth spacing={1}>
                        <Stack
                            sx={{ overflow: 'hidden', position: 'relative', borderRadius: "8px" }}
                        >
                            {restaurantCloseHandler()}

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100px',
                                    transition: `${theme.transitions.create(
                                        ['background-color', 'transform'],
                                        {
                                            duration:
                                                theme.transitions.duration
                                                    .standard,
                                        }
                                    )}`,
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >{discount &&
                                <Stack
                                    position="absolute"
                                    bottom="10%"
                                    left="0"
                                    zIndex="1"
                                >

                                    {discountChip()}
                                </Stack>

                                }
                                <CustomImageContainer
                                    src={`${restaurantImageUrl?.restaurant_cover_photo_url}/${image}`}
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                    borderRadius="8px"
                                />
                            </Box>
                        </Stack>
                        <Stack flexDirection="row" gap={{ xs: "5px", md: "13px" }} alignItems="center" marginTop="17px">
                            <ProfilePhotoWrapper
                                width={{ xs: "50px", md: "70px" }}
                                height={{ xs: "42px", md: "70px" }}
                                padding={{ xs: "5px", md: "10px" }}
                            >
                                <CustomImageContainer
                                    src={`${restaurantImageUrl?.restaurant_image_url}/${logo}`}
                                    width={{ xs: "30px", md: "50px" }}
                                    height={{ xs: "30px", md: "50px" }}
                                    objectFit="cover"
                                    borderRadius="100%"
                                />

                            </ProfilePhotoWrapper>
                            <CustomStackFullWidth paddingX="5px" spacing={0.4} justifyContent="center">
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    sx={{ position: 'relative' }}
                                >
                                    <HomeTextTypography>
                                        {name.length > 30 ? `${name.slice(0, 30)}... ` : name}
                                    </HomeTextTypography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    flexWrap="wrap"
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {cuisines?.length > 0 &&
                                        cuisines?.map((cuisine, index) => (
                                            <CustomTypographyEllipsis
                                                align="left"
                                                fontSize="12px"
                                                color={theme.palette.neutral[600]}
                                            >
                                                {' '}
                                                {cuisine?.name}{' '}
                                                {cuisines.length - 1 === index
                                                    ? ''
                                                    : ','}
                                            </CustomTypographyEllipsis>
                                        ))}
                                </Stack>
                                <Stack flexDirection="row" gap="7px" >
                                    {!(delivery_fee === "out_of_range" || delivery_fee === "0") &&
                                        <Stack flexDirection="row" alignItems="center" gap="3px">
                                            <DelivaryTruckIcon />
                                            <Typography fontSize="12px" fontWeight={400}>
                                                {delivery_fee === "free_delivery" ? t("Free") : (
                                                    getAmount(
                                                        delivery_fee,
                                                        currencySymbolDirection,
                                                        currencySymbol,
                                                        0
                                                    )
                                                )}
                                            </Typography>
                                        </Stack>

                                    }
                                    <Stack flexDirection="row" alignItems="center" gap="3px">
                                        <DistanceIcon />
                                        <Typography fontSize="12px" fontWeight={400}>
                                            <DistanceCalculate distance={distance} />
                                        </Typography>
                                    </Stack>
                                    <Stack flexDirection="row" alignItems="center" gap="3px">
                                        <RestaurantItemsIcon />
                                        <Typography fontSize="12px" fontWeight={400}>
                                            {foods_count.length > 99 ? `${foods_count}+` : `${foods_count}` + `items`}
                                        </Typography>
                                    </Stack>

                                </Stack>
                                {/*<Typography*/}
                                {/*    align="left"*/}
                                {/*    fontSize="12px"*/}
                                {/*    color={theme.palette.neutral[600]}*/}
                                {/*>*/}
                                {/*    {delivery_time}*/}
                                {/*    {freeDelivery && (*/}
                                {/*        <Typography*/}
                                {/*            component="span"*/}
                                {/*            fontSize="12px"*/}
                                {/*            color={theme.palette.neutral[600]}*/}
                                {/*            marginLeft="5px"*/}
                                {/*        >*/}
                                {/*            {t('Free Delivery')}*/}
                                {/*        </Typography>*/}
                                {/*    )}*/}
                                {/*</Typography>*/}
                            </CustomStackFullWidth>

                        </Stack>
                    </CustomStackFullWidth>
                </CustomPaperBigCard>
            </Stack>
        </>
    )
}

export default LatestRestaurantCard
