import React, { useEffect } from 'react'
import { Container, CssBaseline, Grid } from '@mui/material'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomPageTitle from '../CustomPageTitle'
import ResturantList from '../type-wise-resturant-page/ResturantList'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useRecentlyViewRestaurants } from '../../hooks/react-query/recently-view-restaurants/useRecentlyViewRestaurants'
import { useSelector } from 'react-redux'
import CustomShimmerCategories from '../CustomShimmer/CustomShimmerCategories'

import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'

const RecentlyViewRestaurantsPage = () => {
    const { global } = useSelector((state) => state.globalSettings)
    const { data, isLoading, refetch, isRefetching } =
        useRecentlyViewRestaurants()
    let token = undefined
    if (typeof window != 'undefined') {
        token = localStorage.getItem('token')
    }
    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [])
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    mb: { xs: '72px', md: '30px' },
                    mt: { xs: '0px', md: '150px' },
                }}
            >
                <CustomPaperBigCard sx={{ minHeight: '70vh' }}>
                    <CustomPageTitle title="Recently View Restaurants" />
                    <Grid container spacing={1} sx={{ marginTop: '20px' }}>
                        {data?.length > 0 &&
                            data?.map((restaurant) => {
                                return (
                                    <Grid
                                        item
                                        xs={4}
                                        sm={3}
                                        md={1.5}
                                        key={restaurant?.id}
                                    >
                                        <RestaurantBoxCard
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
                                            restaurantDiscount={
                                                restaurant?.discount
                                            }
                                            freeDelivery={
                                                restaurant?.free_delivery
                                            }
                                            rating_count={restaurant?.rating_count}
                                        />
                                    </Grid>
                                )
                            })}
                        {isLoading && <CustomShimmerRestaurant />}
                    </Grid>
                </CustomPaperBigCard>
            </Container>
        </>
    )
}

export default RecentlyViewRestaurantsPage
