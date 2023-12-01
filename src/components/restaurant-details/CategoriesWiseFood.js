import React, { useEffect, useRef, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { restaurantDiscountTag } from '../../utils/customFunctions'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import FoodCard from '../food-card/FoodCard'

import { Stack } from '@mui/system'
import CustomImageContainer from '../CustomImageContainer'
import fire_image from '../../../public/static/fire.svg'
import { useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { RTL } from '../RTL/RTL'
import discountBanner from '../../../public/static/discount.svg'
import heroImg from '../../../public/static/heroHome.svg'
import ImageNotFound from '../../../public/static/no-image-found.png'
import { DiscountImageGrid } from './restaurant-details.style'
const CategoriesWiseFood = ({
    data,
    handleFocusedSection,
    indexNumber,
    restaurantDiscount,
}) => {
    const theme = useTheme()
    const ref2 = useRef(null)
    const { global } = useSelector((state) => state.globalSettings)
    const [isInPosition, setIsInPosition] = useState(false)
    let i = 0

    const scrollHandler = () => {
        const element = ref2.current
        const rect = element?.getBoundingClientRect()
        const targetPosition = 360

        if (rect?.top <= targetPosition && rect?.bottom >= targetPosition) {
            setIsInPosition(true)
        } else {
            setIsInPosition(false)
        }
    }
    useEffect(() => {
        if (isInPosition) {
            const a = {
                id: data?.id,
            }
            handleFocusedSection?.(a)
        }
    }, [isInPosition])

    useEffect(() => {
        //ref2.current.scrollIntoView({ behavior: 'smooth' })
        window.addEventListener('scroll', scrollHandler, true)
        return () => {
            window.removeEventListener('scroll', scrollHandler, true)
        }
    }, [])

    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <Grid container ref={ref2} gap="1rem">
            <>
                {data?.isBgColor ? (
                    <>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            align="left"
                            paddingTop="5px"
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                            >
                                <CustomImageContainer
                                    src={fire_image.src}
                                    width="26px"
                                    height="26px"
                                />
                                <Typography
                                    fontWeight="700"
                                    fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
                                    color={theme.palette.neutral[1000]}
                                >
                                    {data?.name}
                                </Typography>
                            </Stack>
                        </Grid>
                        {data?.products?.length > 0 && (
                            <Grid
                                item
                                container
                                xs={12}
                                sm={12}
                                md={12}
                                sx={{
                                    padding: {
                                        xs: '10px',
                                        sm: '1rem',
                                        md: '1rem',
                                    },
                                    background: (theme) =>
                                        theme.palette.sectionBg,
                                    marginTop: '1rem',
                                }}
                            >
                                {data?.products?.map((food) => {
                                    if (
                                        food?.variations === null ||
                                        food?.variations[0]?.values ||
                                        food?.variations?.length === 0
                                    ) {
                                        return (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                spacing={2}
                                                key={food?.id}
                                                sx={{
                                                    paddingInlineEnd: {
                                                        xs: '0px',
                                                        sm: '8px',
                                                    },
                                                    paddingBlockEnd: {
                                                        xs: '5px',
                                                        sm: '8px',
                                                    },
                                                }}
                                            >
                                                <FoodCard
                                                    product={food}
                                                    horizontal="true"
                                                    isRestaurantDetails={true}
                                                    isShop={true}
                                                    productImageUrl={
                                                        global?.base_urls
                                                            ?.product_image_url
                                                    }
                                                    hasBackGroundSection="true"
                                                />
                                            </Grid>
                                        )
                                    }
                                })}
                            </Grid>
                        )}
                        {indexNumber === 0 && restaurantDiscount && (
                            <DiscountImageGrid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                discountBanner={discountBanner}
                                ImageNotFound={ImageNotFound}
                            >
                                <Typography
                                    color={theme.palette.primary.main}
                                    textAlign="center"
                                    fontSize="27px"
                                    fontWeigth="600"
                                >
                                    {restaurantDiscount}
                                </Typography>
                            </DiscountImageGrid>
                        )}
                    </>
                ) : (
                    <>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            align={
                                languageDirection === 'rtl' ? 'right' : 'left'
                            }
                            paddingTop="5px"
                        >
                            <Typography
                                fontWeight="700"
                                fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
                                color={theme.palette.neutral[1000]}
                            >
                                {data?.name}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            container
                            spacing={2}
                        >
                            {data?.products?.length > 0 &&
                                data?.products.map((food) => {
                                    if (
                                        food?.variations === null ||
                                        food?.variations[0]?.values ||
                                        food?.variations?.length === 0
                                    ) {
                                        return (
                                            <Grid
                                                item
                                                xs={6}
                                                sm={4}
                                                md={3}
                                                align="left"
                                                pb={{ xs: "0rem", sm: ".5rem", md: "1.2rem" }}
                                            >
                                                <FoodCard
                                                    product={food}
                                                    key={food.id}
                                                    horizontal="false"
                                                    isRestaurantDetails={true}
                                                    productImageUrl={
                                                        global?.base_urls
                                                            ?.product_image_url
                                                    }
                                                />
                                            </Grid>
                                        )
                                    }
                                })}
                        </Grid>
                    </>
                )}
            </>
        </Grid>
    )
}

export default CategoriesWiseFood
