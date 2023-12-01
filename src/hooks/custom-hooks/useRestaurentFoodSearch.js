import { ProductApis } from '../react-query/config/productsApi'
import { useQuery } from 'react-query'
import { useEffect } from 'react'

export const useRestaurentFoodSearch = (
    id,
    searchKey,
    handleOnSuccess,

    searchOffset
) => {
    const restaurant_id = id
    const category_id = 0
    const type = 'all'
    const offset = 1
    const page_limit = 100
    const { data, refetch, isLoading } = useQuery(
        ['search-latest-food', restaurant_id, type],
        () =>
            ProductApis.searchlatestFood({
                restaurant_id,
                searchKey,
                type,
                offset,
                page_limit,
            }),
        {
            enabled: false,
            onSuccess: handleOnSuccess,
        }
    )
    const handleApiCall = async () => await refetch()
    useEffect(() => {
        searchKey !== '' && handleApiCall()
    }, [searchKey])

    return data?.data?.products
}
