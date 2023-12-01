import { useInfiniteQuery, useQuery } from 'react-query'

import { onErrorResponse } from '../../../components/ErrorResponse'
import MainApi from '../../../api/MainApi'

const getData = async (params, pageParam) => {
    const { foodOrRestaurant, searchValue, offset, page_limit } = params
    const { data } = await MainApi.get(
        `/api/v1/${foodOrRestaurant}/search?name=${searchValue}&offset=${offset}&limit=${page_limit}`
    )
    return data
}
export const useGetSearchResult = (params, handleAPiCallOnSuccess) => {
    const { apiKey, foodOrRestaurant, searchValue, offset, page_limit } = params
    return useInfiniteQuery(
        [foodOrRestaurant],
        ({ pageParam = params.offset }) => getData(params, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const maxPages = lastPage.total_size / params?.page_limit
                const nextPage = allPages.length + 1

                return lastPage?.restaurants?.length > 0 ? nextPage : undefined
            },
            enabled: false,
            onError: onErrorResponse,
            onSuccess: handleAPiCallOnSuccess,
        }
    )
}
