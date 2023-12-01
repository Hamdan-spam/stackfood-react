import { useInfiniteQuery, useQuery } from 'react-query'

import MainApi from '../../../api/MainApi'
import { onErrorResponse } from '../../../components/ErrorResponse'

const getData = async (params, pageParam) => {
    const { filterByData, offset, page_limit, filterType, searchKey } = params
    const { data } = await MainApi.get(
        `/api/v1/restaurants/get-restaurants/all?offset=${offset}&limit=${page_limit}&filter_data=${filterType}&veg=${
            filterByData?.veg ? 1 : 0
        }&discount=${filterByData?.discount ? 1 : 0}&non_veg=${
            filterByData?.non_Veg ? 1 : 0
        }&top_rated=${filterByData?.top_rated ? 1 : 0}`
    )
    return data
}
export const useGetRestaurant = (params) => {
    const { filterByData, offset, page_limit, filterType, searchKey } = params
    return useInfiniteQuery(
        [filterByData, filterType, searchKey],
        ({ pageParam = params.offset }) => getData(params, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const maxPages = lastPage.total_size / params?.page_limit
                const nextPage = allPages.length + 1

                return lastPage?.restaurants?.length > 0 ? nextPage : undefined
            },
            enabled: false,
            onError: onErrorResponse,
            cacheTime: '0',
        }
    )
}
