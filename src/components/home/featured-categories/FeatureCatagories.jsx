import React, { memo, useEffect, useRef } from 'react'
import { Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import FeaturedCategoryCard from '../../featured-category-item/FeaturedCategoryCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import 'react-multi-carousel/lib/styles.css'
import CustomShimmerCategories from '../../CustomShimmer/CustomShimmerCategories'
import { useRouter } from 'next/router'
import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../custom-tables/Tables.style'

import { useTheme } from '@mui/material/styles'
import { onErrorResponse } from '../../ErrorResponse'
import useScrollSticky from "../Search-filter-tag/useScrollSticky";
import Card from "@mui/material/Card";
import CustomContainer from "../../container";
import { Stack } from "@mui/system";

const FeatureCatagories = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const router = useRouter()
    const { catOffsetElementRef } = useScrollSticky();
    const { global } = useSelector((state) => state.globalSettings)
    const { featuredCategories } = useSelector((state) => state.storedData)
    const {categoryIsSticky,foodTypeIsSticky}=useSelector((state) => state.scrollPosition)
    const sliderRef = useRef(null)
    const searchKey = ''
    const settings = {
        dots: false,
        infinite: featuredCategories?.length > 7 && true,
        speed: 500,
        slidesToShow:categoryIsSticky?12: 7,
        slidesToScroll: 3,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 8 && true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 6 && true,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 5 && true,
                    // dots: true
                },
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow:7,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 4.5 && true,
                },
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 7 && true,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 5 && true,
                },
            },
        ],
    }

    return (
      <Card sx={{
          paddingTop:categoryIsSticky && ".5rem",
          position: "sticky",
          top:{xs:"91px",md:"108px"},
          zIndex:1100,
          //transform: foodTypeIsSticky ? 'translateY(-100%)':'',
          //transition:"all ease .5s",
          background:theme=>theme.palette.neutral[1800],
          boxShadow:categoryIsSticky ?"0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)"
            : "none",
          // "*":{
          //     animation : 'fadeInRight 2s  1'
          // }
      }}>
          <CustomContainer >
            <Grid container ref={catOffsetElementRef}  gap={{ xs: ".3rem", md: ".5rem" }}>
                {!categoryIsSticky &&
                   <Grid item xs={12} md={12}>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Typography fontSize={{xs:"16px",md:"20px"}} fontWeight={{xs:"500",md:"700"}}>{t("What’s on Your Mind?")}</Typography>
                        <CustomViewAll onClick={() => router.push('/categories')} sx={{marginInlineEnd:"10px"}}><Typography fontSize="14px" fontWeight="500" >{t("Explore More")}</Typography></CustomViewAll>
                    </Stack>
                </Grid> }
                <Grid item xs={12} md={12} >
                    {featuredCategories?.length > 0 ? (
                        <Slider
                            className="slick__slider"
                            {...settings}
                            ref={sliderRef}
                        >
                            {featuredCategories.map((categoryItem) => (
                                <FeaturedCategoryCard
                                    key={categoryItem?.id}
                                    id={categoryItem?.id}
                                    categoryImage={categoryItem?.image}
                                    name={categoryItem?.name}
                                    categoryImageUrl={
                                        global?.base_urls?.category_image_url
                                    }
                                    height="40px"
                                    categoryIsSticky={categoryIsSticky}
                                />
                            ))}
                        </Slider>
                    ) : (
                        <CustomShimmerCategories
                            noSearchShimmer="true"
                            itemCount="7"
                            smItemCount="5"
                        />
                    )}
                </Grid>
            </Grid>
          </CustomContainer>
        </Card>
    )
}

export default memo(FeatureCatagories)
