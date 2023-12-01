import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Grid,
    IconButton,
    Pagination,
    Stack,
    Typography,
} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useWishListResDelete } from '../../hooks/react-query/config/wish-list/useWishListResDelete'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeWishListFood,
    removeWishListRes,
} from '../../redux/slices/wishList'
import emptyFood from '../../../public/static/resturants.png'

import {
    WishlistGrid,
    IconButtonGrid,
    WishlistBox,
    ArrowButton,
} from './WishList.style'
import WishListShimmer from './WishListShimmer'
import WishlistCard from './WishlistCard'
import WishListRestaurantCard from './WishListRestaurantCard'
import { useTranslation } from 'react-i18next'
import FoodOrRestaurant from '../products-page/FoodOrRestaurant'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import ScrollerProvider from '../scroller-provider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'
import Meta from '../Meta'
import { noFoodFoundImage, noRestaurantsImage } from '../../utils/LocalImages'

const WishlistPage = () => {
    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const matches = useMediaQuery('(max-width:655px)')
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const { wishLists } = useSelector((state) => state.wishList)

    const onSuccessHandlerForResDelete = (res) => {
        if (res) {
            dispatch(removeWishListRes(res))
        }
    }
    const { mutate: restaurantMutate } = useWishListResDelete(
        onSuccessHandlerForResDelete
    )
    const deleteWishlistRes = (id) => {
        restaurantMutate(id, {
            onSuccess: onSuccessHandlerForResDelete(id),
        })
    }

    useEffect(() => {}, [wishLists])

    return (
        <>
            {' '}
            <Meta
                title={` My Wish List-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard
                padding={isXSmall ? '1rem' : '2rem'}
                sx={{ minHeight: '77vh' }}
            >
                <Box>
                    <FoodOrRestaurant
                        foodOrRestaurant={foodOrRestaurant}
                        setFoodOrRestaurant={setFoodOrRestaurant}
                    />
                    {wishLists ? (
                        <>
                            {foodOrRestaurant === 'products' && (
                                <>
                                    <ScrollerProvider maxHeight="60vh">
                                        <Grid
                                            container
                                            item
                                            md={12}
                                            xs={12}
                                            spacing={2}
                                            sx={{ paddingBlockStart: '1rem' }}
                                        >
                                            {wishLists?.food?.map((product) => {
                                                return (
                                                    <Grid
                                                        item
                                                        md={6}
                                                        sm={matches ? 12 : 6}
                                                        xs={12}
                                                        key={product?.id}
                                                    >
                                                        <WishlistCard
                                                            product={product}
                                                            productImageUrl={
                                                                global
                                                                    ?.base_urls
                                                                    ?.product_image_url
                                                            }
                                                            // deleteWishlistItem={
                                                            //     deleteWishlistItem
                                                            // }
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </ScrollerProvider>
                                    {wishLists?.food?.length === 0 && (
                                        <CustomEmptyResult
                                            label={t('No Favourite Food Found')}
                                            image={noFoodFoundImage}
                                        />
                                    )}
                                </>
                            )}
                            {foodOrRestaurant === 'restaurants' && (
                                <ScrollerProvider maxHeight="60vh">
                                    <Grid
                                        container
                                        item
                                        md={12}
                                        xs={12}
                                        spacing={2}
                                        sx={{ paddingBlockStart: '1rem' }}
                                    >
                                        {wishLists?.restaurant?.map(
                                            (restaurantItem) => {
                                                return (
                                                    <Grid
                                                        item
                                                        md={6}
                                                        sm={6}
                                                        xs={12}
                                                    >
                                                        <WishListRestaurantCard
                                                            key={
                                                                restaurantItem?.id
                                                            }
                                                            restaurant={
                                                                restaurantItem
                                                            }
                                                            deleteWishlistRes={
                                                                deleteWishlistRes
                                                            }
                                                            restaurantImageUrl={
                                                                global
                                                                    ?.base_urls
                                                                    ?.restaurant_image_url
                                                            }
                                                        />
                                                    </Grid>
                                                )
                                            }
                                        )}
                                        {wishLists?.restaurant?.length ===
                                            0 && (
                                            <CustomEmptyResult
                                                label={t(
                                                    'No Favourite Restaurant Found'
                                                )}
                                                image={noRestaurantsImage}
                                            />
                                        )}
                                    </Grid>
                                </ScrollerProvider>
                            )}
                        </>
                    ) : (
                        <WishListShimmer />
                    )}

                    {/*<Box*/}
                    {/*    sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        padding: '30px 0px 70px 0px',*/}
                    {/*    }}*/}
                    {/*>*/}

                    {/*</Box>*/}
                </Box>
            </CustomPaperBigCard>
        </>
    )
}

export default WishlistPage
