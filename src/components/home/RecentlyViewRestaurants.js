import React, {useEffect, useRef} from 'react';
import CustomShimmerCategories from "../CustomShimmer/CustomShimmerCategories";
import {Grid} from "@mui/material";
import {CustomStackFullWidth, CustomViewAll, SliderCustom} from "../../styled-components/CustomStyles.style";
import {CustomTypography} from "../custom-tables/Tables.style";
import {t} from "i18next";
import Slider from "react-slick";

import CuisinesCard from "./cuisines/CuisinesCard";
import {useRouter} from "next/router";

import {useRecentlyViewRestaurants} from "../../hooks/react-query/recently-view-restaurants/useRecentlyViewRestaurants";
import RestaurantCard from "../restaurant-details/RestaurantCard";
import RestaurantBoxCard from "../restaurant-details/RestaurantBoxCard";
import {useSelector} from "react-redux";
import {recentlySettings} from "./recentlySettings";

const RecentlyViewRestaurants = () => {
    const router=useRouter()
    const sliderRef = useRef(null);
    const { global } = useSelector((state) => state.globalSettings)
    const {data,isLoading,refetch,isRefetching}=useRecentlyViewRestaurants()
    let token = undefined
    if (typeof window != 'undefined') {
        token = localStorage.getItem('token')
    }
    useEffect(()=>{
        if(token){
            refetch()
        }
    },[token])
    return (
        <>
            {data?.length >0  && token && (
                    <Grid container sx={{paddingTop:"20px"}}>
                        <Grid item xs={12} md={12}>
                            <CustomStackFullWidth direction="row"
                                                  alignItems="center"
                                                  justifyContent="space-between"
                                                  padding="0px 10px"
                            >
                                <CustomTypography variant="h3" fontWeight="700">
                                    {t('Your Restaurants')}
                                </CustomTypography>
                                <CustomViewAll
                                    variant="text"
                                    onClick={() => router.push('/recently-view-restaurant')}
                                >
                                    {t('View all')}
                                </CustomViewAll>
                            </CustomStackFullWidth>
                        </Grid>
                        {data && data?.length > 0 && (
                            <Grid item xs={12} md={12}>
                                <SliderCustom gap="10px">
                                    <Slider {...recentlySettings} ref={sliderRef} className="slick__slider">
                                        {data?.map((restaurant,index)=>{
                                            return(
                                                <RestaurantBoxCard

                                                    rating_count={restaurant?.rating_count}
                                                    image={restaurant?.logo}
                                                    name={restaurant?.name}
                                                    rating={restaurant?.avg_rating}
                                                    restaurantImageUrl={
                                                        global?.base_urls
                                                            ?.restaurant_image_url
                                                    }
                                                    id={restaurant?.id}
                                                    active={restaurant?.active}
                                                    open={restaurant?.open}
                                                    restaurantDiscount={restaurant?.discount}
                                                    freeDelivery={restaurant?.free_delivery}
                                                    key={index}/>
                                            )
                                        })}
                                    </Slider>
                                </SliderCustom>
                            </Grid>
                        )}
                    </Grid>
            )}
            {isLoading && (<CustomShimmerCategories noSearchShimmer="true"
                                                    itemCount="10"
                                                    smItemCount="5"/>)}
        </>
    );
};

export default RecentlyViewRestaurants;
