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
} from '../food-card/FoodCard.style'
import {
    getAmount,
    getDiscountForTag,
    getReviewCount,
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

const RestaurantBoxCard = (props) => {
    const {
        className,
        restaurantImageUrl,
        freeDelivery,
        image,
        name,
        rating,
        id,
        active,
        open,
        restaurantDiscount,
        delivery_time,
        cuisines,
        coupons,
        matchesToSmall,
        slug,
        zone_id,
        rating_count,
        visitAgain,
        foods
    } = props
    const { t } = useTranslation()
    const router = useRouter()
    const languageDirection = localStorage.getItem('direction')
    const { userData } = useSelector((state) => state.user)
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantIdOrSlug = slug ? slug : id
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const logo = `${restaurantImageUrl}/${image}`
    const theme = useTheme()

    const settings = {
        dots: false,
        infinite: true,
        fade: true,

        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    }
    const hasDiscount = restaurantDiscountTag(restaurantDiscount, freeDelivery)
    const restaurantCouponAndDiscount = () => {
        if (
            restaurantDiscountTag(restaurantDiscount, freeDelivery) ||
            coupons?.length > 0
        ) {
            return (
                <RestaurantDiscountStack
                    direction="row"
                    spacing={0.5}
                    justifyContent="center"
                    alignItems="center"
                >
                    {hasDiscount && (
                        <Typography fontSize="13px" fontWeight="700">
                            {restaurantDiscountTag(
                                restaurantDiscount,
                                freeDelivery,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                            {coupons?.length > 0 && (
                                <Typography
                                    fontWeight="700"
                                    component="span"
                                    fontSize="13px"
                                    marginLeft="5px"
                                >
                                    |
                                </Typography>
                            )}
                        </Typography>
                    )}
                    <SliderStack hasDiscount={hasDiscount}>
                        {coupons?.length > 0 && (
                            <Slider {...settings}>
                                {coupons?.map((coupon) => {
                                    return (
                                        <Typography
                                            fontSize="13px"
                                            align={
                                                hasDiscount
                                                    ? languageDirection ===
                                                        'rtl'
                                                        ? 'right'
                                                        : 'left'
                                                    : 'center'
                                            }
                                            fontWeight="700"
                                            marginBottom="auto"
                                            marginTop="auto"
                                            marginLeft="-3"
                                        >
                                            {coupon?.code}
                                        </Typography>
                                    )
                                })}
                            </Slider>
                        )}
                    </SliderStack>
                </RestaurantDiscountStack>
            )
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
        <Stack onClick={handleClick} className={className} height={visitAgain ? "250px" : "100%"}>
            <CustomPaperBigCard
                nopadding="true"
                sx={{
                    padding: '10px 10px 25px 10px',
                    cursor: 'pointer',
                    width: visitAgain ? '110%' : '100%',
                    height: '100%',
                    '&:hover': {
                        boxShadow: `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
                    },
                }}
            >
                <CustomStackFullWidth spacing={1}>
                    <Stack
                        sx={{ overflow: 'hidden', position: 'relative' }}
                    >
                        {restaurantCloseHandler()}
                        {!visitAgain && restaurantCouponAndDiscount()}

                        <Box
                            sx={{
                                width: '100%',
                                height: '130px',
                                transition: `${theme.transitions.create(
                                    ['background-color', 'transform'],
                                    {
                                        duration: theme.transitions.duration.standard,
                                    }
                                )}`,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <CustomImageContainer
                                src={`${restaurantImageUrl}/${image}`}
                                width="100%"
                                height="100%"
                                objectFit="contained"
                                borderRadius="8px"
                            />
                        </Box>
                    </Stack>
                    <CustomStackFullWidth paddingX="5px" spacing={0.4}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ position: 'relative' }}
                        >
                            <HomeTextTypography>
                                {name?.length > 15 ? `${name.slice(0, 15)}... ` : name}
                            </HomeTextTypography>
                            <Stack flexDirection="row" gap="5px">
                                <Typography
                                    fontSize="14px"
                                    fontWeight={400}
                                    color={theme.palette.text.secondary}
                                >
                                    {getReviewCount(rating_count)}
                                </Typography>
                                {rating !== 0 && <FoodRating product_avg_rating={rating} />}
                            </Stack>
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
                        {visitAgain && foods?.length > 0 &&
                            <Stack flexDirection="row" gap="3px">
                                {foods.slice(0, 3).map((item, index) => {
                                    return (
                                        <CustomImageContainer
                                            height="30px"
                                            width="30px"
                                            borderRadius="8px"
                                            objectFit="cover"
                                            src={`${global?.base_urls?.product_image_url}/${item?.image}`}
                                        />

                                    )
                                })}
                                {foods.length > 3 && <Stack
                                    height="30px"
                                    width="30px"
                                    borderRadius="8px"
                                    justifyContent="center"
                                    alignItems="center"
                                    backgroundColor={theme.palette.neutral[300]}
                                >
                                    <Typography fontSize="10px" fontWeight={700} color={theme.palette.whiteText.main}>{`${foods.length - 3}+`}</Typography>
                                </Stack>}
                            </Stack>


                        }
                        {!visitAgain &&
                            <Typography
                                align="left"
                                fontSize="12px"
                                color={theme.palette.neutral[600]}
                            >
                                {delivery_time}
                                {freeDelivery && (
                                    <Typography
                                        component="span"
                                        fontSize="12px"
                                        color={theme.palette.neutral[600]}
                                        marginLeft="5px"
                                    >
                                        {t('Free Delivery')}
                                    </Typography>
                                )}
                            </Typography>
                        }
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </CustomPaperBigCard>
        </Stack>
    )
}

export default RestaurantBoxCard
