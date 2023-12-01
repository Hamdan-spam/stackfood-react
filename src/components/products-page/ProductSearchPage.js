import React, { useEffect, useState } from 'react'

import { useQuery } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import Loading from '../custom-loading/Loading'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

import SearchFilterWithResults from './SearchFilterWithResults'
import Skeleton from '@mui/material/Skeleton'
import { getFilterChoices } from './getFilterChoices'
import Meta from '../Meta'
import { onErrorResponse } from '../ErrorResponse'
import CustomContainer from '../container'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { searchMockData } from './SearchMockData'
import { setFilterbyByDispatch } from '../../redux/slices/searchFilter'
import { setSearchTagData } from "../../redux/slices/searchTagSlice";

const ProductSearchPage = ({
    product_type,
    configData,
    query,
    page,
    restaurantType,
                               tags
}) => {
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const router = useRouter()
    const [type, setType] = useState('all')
    const {searchTagData}=useSelector((state) => state.searchTags)
    // const pageLimitFromAdmin = global.
    const [page_limit, setPageLimit] = useState(12)
    const [offset, setOffset] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [checkfilter, setCheckfilter] = useState(false)
    const [pageData, setPageData] = useState({})
    const [searchOrPage, setSearchOrPage] = useState({})
    const [totalData,setTotalData] = useState(null)
    const activeFilters = searchTagData.filter((item) => item.isActive === true)
    const apiKey =
        foodOrRestaurant === 'products'
            ? 'products-search'
            : 'restaurant-search'
    const handleAPiCallOnSuccess = (res) => {
        if (restaurantType) {
            setFoodOrRestaurant('restaurants')
            setPageData({
                ...res,
                data: {
                    ...res,
                    restaurants: res.data,
                    total_size: res?.data?.length,
                },
            })
            setSearchOrPage({
                ...res,
                data: {
                    ...res,
                    restaurants: res.data,
                    total_size: res?.data?.length,
                },
            })
        } else {
            if (page) {
                setFoodOrRestaurant('products')
            }
            setPageData(res)
            setSearchOrPage(res)
        }
        setTotalData(res?.data?.total_size)
    }

    const { isLoading, data, isError, error, refetch, isRefetching } = useQuery(
        [apiKey, foodOrRestaurant, searchValue, offset, page_limit],
        () =>
            ProductsApi.productSearch(
                foodOrRestaurant,
                searchValue,
                offset,
                page_limit,
                filterData
            ),
        {
            retry:1,
            enabled: false,
            onSuccess: handleAPiCallOnSuccess,
            onError: onErrorResponse,
        }
    )
    //POPULAR AND BEST REVIEW FOOD API
    const {
        isLoading: popularFoodisLoading,
        data: popularData,
        refetch: popularRefetch,
    } = useQuery(
        ['popular-food', offset, page_limit, type],
        () => ProductsApi.products(page, offset, page_limit, type),
        {
            enabled: false,
            onSuccess: handleAPiCallOnSuccess,
        }
    )
    const {
        isLoading: restaurantIsLoading,
        data: restaurantData,
        refetch: restaurantRefetch,
    } = useQuery(
        [`restaurant-list`, restaurantType],
        () => RestaurantsApi.typeWiseRestaurantList({ restaurantType, type }),
        {
            enabled: false,
            onSuccess: handleAPiCallOnSuccess,
            onError: onErrorResponse,
        }
    )

    useEffect(() => {
        if (restaurantType !== undefined) {
            restaurantRefetch()
        }
    }, [restaurantType,offset])

    useEffect(() => {
        if (page !== undefined) {
            popularRefetch()
        }
    }, [page,offset])


    useEffect(() => {
        if (query || page || restaurantType) {
            setSearchValue(query)
        } else {
            if(tags) {
                setSearchValue(null)

            }else{
                router.push('/home')
            }
        }
    }, [query,tags])


//     const condition = (obj) => obj;
// // Use Object.keys() and Object.assign() to filter the object
//     const filteredObject = Object.assign(
//         {},
//         ...Object.keys(filterData?.filterBy)
//             .filter((key) => condition(filterData?.filterBy[key]))
//             .map((key) => ({ [key]: filterData?.filterBy[key] }))
//     );
//
//     function isObjectEmpty(obj) {
//         return !Object.keys(obj).length;
//     }


    useEffect(() => {
        if(activeFilters?.length===0 && !query && !page && !restaurantType && !searchValue){
            router.push('/home')
        }
    }, [searchTagData]);
    useEffect(async () => {
        if(searchValue){
            await refetch()
        }else if(tags && page){
            await refetch()
        }else if(tags){
            if(activeFilters?.length>0){
                await refetch()
            }
        }

    }, [searchValue,filterData,tags,offset])

    useEffect(() => {
        setOffset(1)
        if (searchValue !== undefined) {
            refetch()
        }
    }, [foodOrRestaurant])

    if (isError) {
        return <h1>{error.messages}</h1>
    }
    //const searchOrPage = All ? popularData : data
    useEffect(() => {
        handleFilteredData()
    }, [checkfilter])

    const handleFilter = () => {
        setCheckfilter((prevState) => !prevState)
    }
    const handleClearAll = async () => {
        await refetch()
    }

    const handleFilteredData = () => {
        let filteredData = getFilterChoices(
            filterData,
            searchOrPage,
            foodOrRestaurant
        )

        setPageData({
            ...searchOrPage,
            data:
                foodOrRestaurant === 'products'
                    ? {
                          ...pageData?.data,
                          products: filteredData,
                          total_size: filteredData?.length,
                      }
                    : {
                          ...pageData.data,
                          restaurants: filteredData,
                          total_size: filteredData?.length,
                      },
        })
    }

    useEffect(() => {
        const temPage=page==="most-reviewed"?"rating":page
        const temRestaurantType=restaurantType==="latest"?"new_arrivals":restaurantType
        const newArr = searchTagData.map((item) =>
            item.value === (temPage ||temRestaurantType) ? { ...item, isActive: true } : item
        );
        dispatch(setSearchTagData(newArr))
    }, [page,restaurantType]);


    return (
        <>
            <Meta
                title={`${searchValue ? searchValue : 'Searching...'} on ${
                    configData?.business_name
                }`}
            />
            <CustomStackFullWidth mb="5rem" sx={{ minHeight: '70vh' }}>
                {pageData && (
                    <SearchFilterWithResults
                        searchValue={searchValue}
                        foodOrRestaurant={foodOrRestaurant}
                        setFoodOrRestaurant={setFoodOrRestaurant}
                        isLoading={isLoading}
                        isNetworkCalling={isRefetching}
                        data={pageData}
                        page_limit={page_limit}
                        offset={offset}
                        setOffset={setOffset}
                        global={global}
                        handleFilter={handleFilter}
                        handleClearAll={handleClearAll}
                        page={page === 'most-reviewed' ? 'most_reviewed' : page}
                        popularFoodisLoading={popularFoodisLoading}
                        restaurantType={restaurantType}
                        restaurantIsLoading={restaurantIsLoading}
                        totalData={totalData}

                    />
                )}
            </CustomStackFullWidth>
        </>
    )
}

export default ProductSearchPage
