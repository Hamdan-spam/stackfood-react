import { useQuery } from 'react-query'

import MainApi from '../../../api/MainApi'
import { onSingleErrorResponse } from '../../../components/ErrorResponse'

export const getData = async (pageParams) => {
    const { restaurantId, page_limit, offset, searchKey } = pageParams

    const { data } = await MainApi.get(
        `api/v1/products/recommended?restaurant_id=${restaurantId}&name=${searchKey}&limit=${page_limit}&offset=${offset}`
    )
    return data
}
export const useGetRecommendProducts = (pageParams) => {
    return useQuery('recommend-products', () => getData(pageParams), {
        enabled: false,
        onError: onSingleErrorResponse,
    })
}
