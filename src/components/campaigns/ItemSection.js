import React from 'react'
import { Grid } from '@mui/material'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import noData from '../../../public/static/no-data-images/no restaurants.png'
import { noRestaurantsImage } from '../../utils/LocalImages'

const ItemSection = ({
    campaignsDetails,
    isLoading,
    isRefetching,
    configData,
}) => {
    return (
        <>
            <Grid container spacing={{ xs: 0.5, md: 2 }}>
                {campaignsDetails?.restaurants?.length > 0 &&
                    campaignsDetails?.restaurants?.map((restaurant) => {
                        return (
                            <Grid
                                key={restaurant?.id}
                                item
                                md={3}
                                sm={4}
                                xs={6}
                            >
                                <RestaurantBoxCard
                                    image={restaurant?.cover_photo}
                                    name={restaurant?.name}
                                    rating={restaurant?.avg_rating}
                                    restaurantImageUrl={
                                        configData?.base_urls
                                            ?.restaurant_cover_photo_url
                                    }
                                    id={restaurant?.id}
                                    active={restaurant?.active}
                                    open={restaurant?.open}
                                    restaurantDiscount={restaurant?.discount}
                                    freeDelivery={restaurant?.free_delivery}
                                    delivery_time={restaurant?.delivery_time}
                                    rating_count={restaurant?.rating_count}
                                />
                            </Grid>
                        )
                    })}
                {/*{isLoading && <StoreShimmer />}*/}
            </Grid>
            {campaignsDetails?.restaurants?.length === 0 && (
                <CustomEmptyResult
                    label="No store found"
                    image={noRestaurantsImage}
                />
            )}
        </>
    )
}

export default ItemSection
