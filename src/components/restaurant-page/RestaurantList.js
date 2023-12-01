import { Box, Grid, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useSelector } from 'react-redux'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { useQuery } from 'react-query'
//import LinearProgress from '@mui/material/LinearProgress'
import CustomePagination from '../pagination/Pagination'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomPageTitle from '../CustomPageTitle'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CustomSearch from '../custom-search/CustomSearch'
import { onErrorResponse } from '../ErrorResponse'
import RestaurantListShimmer from './RestaurantListShimmer'

const RestaurantList = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const orangeColor = theme.palette.primary.main
    const [alignment, setAlignment] = useState('web')
    const [page_limit, setPageLimit] = useState(16)
    const [offset, setOffset] = useState(1)
    const [type, setType] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const matchesToSmall = useMediaQuery('(min-width:400px)')
    const [reRenderSearch, setRerenderSearch] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const { global } = useSelector((state) => state.globalSettings)

    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['all-restaurant', offset, page_limit],
        () =>
            RestaurantsApi.restaurants({
                offset,
                page_limit,
                type,
                filterType,
                searchKey,
            }),
        {
            onError: onErrorResponse,
        }
    )

    if (data) {
    }
    const handleSelect = (e) => {
        setFilterType(e.target.value)
    }

    useEffect(() => {
        refetch().then()
    }, [filterType])
    useEffect(async () => {
        await refetch()
    }, [type])
    useEffect(async () => {
        await refetch()
    }, [searchKey])
    if (isLoading) {
        return (
            <Box mt={{ xs: '0px', md: '80px' }}>
                <RestaurantListShimmer />
            </Box>
        )
    }

    const handleType = (value) => {
        setType(value)
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
        <>
            {languageDirection && (
                <Box mt={{ xs: '0px', md: '7rem' }} mb="1rem">
                    <Grid
                        container
                        spacing={3}
                        alignItems="center"
                        justifyContent="center"
                        mt="1rem"
                    >
                        <Grid item xs={12} md={12}>
                            <CustomPageTitle title="Restaurant" />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            justifyContent="center"
                        >
                            <GroupButtons setType={handleType} type={type} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomSearch
                                key={reRenderSearch}
                                handleSearchResult={handleSearchResult}
                                label="Search a restaurant"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            align={
                                languageDirection === 'rtl' ? 'left' : 'right'
                            }
                        >
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">
                                    {t('Filter')}
                                </InputLabel>
                                <Select
                                    sx={{ width: '130px', height: '40px' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filterType}
                                    label="Age"
                                    onChange={handleSelect}
                                >
                                    <MenuItem
                                        value="all"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                        }}
                                    >
                                        {t('All')}
                                    </MenuItem>
                                    <MenuItem
                                        value="delivery"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                        }}
                                    >
                                        {t('Delivery')}
                                    </MenuItem>
                                    <MenuItem
                                        value="take_away"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                        }}
                                    >
                                        {t('Take Away')}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            container
                            spacing={1}
                        >
                            {data?.data?.restaurants?.map((restaurantData) => {
                                if (restaurantData) {
                                    return (
                                        <Grid
                                            item
                                            xs={matchesToSmall ? 6 : 12}
                                            sm={4}
                                            md={3}
                                        >
                                            <RestaurantBoxCard
                                                slug={restaurantData?.slug}
                                                image={
                                                    restaurantData?.cover_photo
                                                }
                                                name={restaurantData?.name}
                                                rating={
                                                    restaurantData?.avg_rating
                                                }
                                                restaurantImageUrl={
                                                    global?.base_urls
                                                        ?.restaurant_cover_photo_url
                                                }
                                                id={restaurantData?.id}
                                                active={restaurantData.active}
                                                open={restaurantData.open}
                                                restaurantDiscount={
                                                    restaurantData.discount &&
                                                    restaurantData.discount
                                                }
                                                freeDelivery={
                                                    restaurantData.free_delivery
                                                }
                                                delivery_time={
                                                    restaurantData?.delivery_time
                                                }
                                                cuisines={
                                                    restaurantData?.cuisine
                                                }
                                                rating_count={restaurantData?.rating_count}
                                            />
                                        </Grid>
                                    )
                                }
                            })}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <CustomePagination
                                total_size={data?.data?.total_size}
                                page_limit={page_limit}
                                offset={offset}
                                setOffset={setOffset}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default RestaurantList
