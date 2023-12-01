import React, { useEffect, useState } from 'react'
import { Box, Container, Tabs } from '@material-ui/core'
import FoodOrRestaurant from '../../components/products-page/FoodOrRestaurant'
import ProductList from '../products-page/ProductList'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Grid, NoSsr, Typography } from '@mui/material'
import FoodNavigation from '../restaurant-details/foodSection/FoodNavigation'
import { RestaurantDetailsNavButton } from '../food-card/FoodCard.style'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import RestaurantList from '../restaurant-page/RestaurantList'
import RestaurantCard from '../restaurant-details/RestaurantCard'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import CustomePagination from '../pagination/Pagination'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import noData from '../../../public/static/no-data-images/no food.png'
import {
    CustomStackFullWidth,
    FlexContainerCenter,
} from '../../styled-components/CustomStyles.style'
import FilterButtons from './FilterButtons'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import CustomShimmerForCard from '../CustomShimmer/CustomShimmerForCard'
import FoodCard from '../food-card/FoodCard'
import Image from 'next/image'
import RestaurantsData from './RestaurantsData'
import noRestaurants from '../../../public/static/no-data-images/no restaurants.png'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { RTL } from '../RTL/RTL'
import no_restaurant_image from '../../../public/static/no-data-images/no restaurants.png'
import no_food_found_image from '../../../public/static/no-data-images/no food.png'
import { noFoodFoundImage, noRestaurantsImage } from '../../utils/LocalImages'
const CategoryDetailsPage = ({
    data,
    id,
    category_id,
    setCategoryId,
    resData,
    offset,
    page_limit,
    type,
    setOffset,
    setType,
}) => {
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const [catetoryMenus, setCategoryMenus] = useState([])
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const {
        isLoading: isLoadingChilds,
        data: childesData,
        isError,
        error,
        refetch,
    } = useQuery([`category-Childes`, id], () =>
        CategoryApi.categoriesChildes(id)
    )
    useEffect(() => {
        if (childesData && id?.length > 0) {
            // const catetoryMenu = childesData?.data?.filter((item) =>
            //     id.includes(item.id)
            // )

            setCategoryMenus(childesData.data)
        }
        setCategoryId(id)
    }, [childesData, id])
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    return (
        <>
            <Grid container spacing={{ xs: 3, sm: 3, md: 4 }}>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <NoSsr>
                        <FoodOrRestaurant
                            foodOrRestaurant={foodOrRestaurant}
                            setFoodOrRestaurant={setFoodOrRestaurant}
                        />
                    </NoSsr>
                </Grid>
                <Grid item xs={12} sm={12} md={12} align="left">
                    <FoodNavigation
                        catetoryMenus={catetoryMenus}
                        setCategoryId={setCategoryId}
                        category_id={category_id}
                        id={id}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <CustomStackFullWidth
                        alignItems="center"
                        justifyContent="center"
                    >
                        <RTL direction={languageDirection}>
                            <GroupButtons setType={setType} type={type} />
                        </RTL>
                    </CustomStackFullWidth>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    spacing={{ xs: 1, md: 2 }}
                >
                    {foodOrRestaurant === 'products' &&
                        (data?.data ? (
                            <>
                                <ProductList
                                    product_list={data?.data?.data}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                />
                                {data?.data?.data.products.length === 0 && (
                                    <CustomEmptyResult
                                        image={noFoodFoundImage}
                                        label=" No Food Found"
                                    />
                                )}
                            </>
                        ) : (
                            <CustomShimmerForBestFood />
                        ))}

                    {foodOrRestaurant === 'restaurants' &&
                        (resData ? (
                            <>
                                <RestaurantsData
                                    resData={resData}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                    global={global}
                                />
                                {resData.data.total_size === 0 && (
                                    <CustomStackFullWidth sx={{ mt: '10px' }}>
                                        <CustomEmptyResult
                                            image={noRestaurantsImage}
                                            label="No Restaurants Found"
                                        />
                                    </CustomStackFullWidth>
                                )}
                            </>
                        ) : (
                            <>
                                <CustomShimmerRestaurant />
                            </>
                        ))}
                </Grid>
            </Grid>
        </>
    )
}

export default CategoryDetailsPage
