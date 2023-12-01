import { ProductApis } from '../react-query/config/productsApi'
import { useQuery } from 'react-query'
import { useEffect } from 'react'

export const useGetAllProductsOfARestaurant = (id) => {
    const restaurant_id = id
    const category_id = 0
    const type = 'all'
    const offset = 1
    const page_limit = 1000
    const { data, refetch, isLoading } = useQuery(
        ['latest-food', restaurant_id, category_id, type, offset, page_limit],
        () =>
            ProductApis.latestFood({
                restaurant_id,
                category_id,
                type,
                offset,
                page_limit,
            })
    )
    const handleApiCall = async () => await refetch()
    useEffect(() => {
        handleApiCall()
    }, [])

    return data?.data?.products
}
