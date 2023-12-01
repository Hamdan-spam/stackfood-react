import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import FeaturedCategoryCard from '../featured-category-item/FeaturedCategoryCard'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'
import CustomShimmerCategories from '../CustomShimmer/CustomShimmerCategories'
import CustomPageTitle from '../CustomPageTitle'
import CustomSearch from '../custom-search/CustomSearch'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import useMediaQuery from '@mui/material/useMediaQuery'

const CategoryList = () => {
    const matches = useMediaQuery('(max-width:1180px)')
    const { t } = useTranslation()
    const { featuredCategories } = useSelector((state) => state.storedData)
    const { global } = useSelector((state) => state.globalSettings)
    const [page_limit, setPageLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const [searchKey, setSearchKey] = useState('')

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['category'],
        () => CategoryApi.categories(searchKey),
        {
            onError: onErrorResponse,
        }
    )

    useEffect(async () => {
        await refetch()
    }, [searchKey])

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CustomShimmerCategories
                    itemCount="20"
                    smItemCount="9"
                    gridControl="true"
                />
            </Box>
        )
    }
    const handleSearchResult = async (values) => {
        if (values === '') {
            await refetch()
            setSearchKey('')
        } else {
            //setType('all')
            setSearchKey(values)
        }
    }
    return (
        <Box minHeight="70vh">
            <Grid
                container
                item
                spacing={{ xs: 1, md: 2, lg: 2 }}
                mb="30px"

                // sx={{ padding: '20px 0px' }}
            >
                <Grid item xs={12} md={6} justify="center">
                    <CustomPageTitle title="Categories" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomSearch
                        // key={reRenderSearch}
                        handleSearchResult={handleSearchResult}
                        label={t('Search a category')}
                        // isLoading={isLoadingSearchFood}
                        // setOnSearchdiv={setOnSearchdiv}
                        // setOpenSearchSuggestions={setOpenSearchSuggestions}
                        // searchFrom="restaurantDetails"
                    />
                </Grid>
                {data?.data?.map((categoryItem) => (
                    <Grid item md={matches ? 2 : 1.7} sm={3} xs={4} mt=".5rem">
                        <FeaturedCategoryCard
                            key={categoryItem?.id}
                            id={categoryItem?.id}
                            categoryImage={categoryItem?.image}
                            name={categoryItem?.name}
                            categoryImageUrl={
                                global?.base_urls?.category_image_url
                            }
                            height="55px"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default CategoryList
