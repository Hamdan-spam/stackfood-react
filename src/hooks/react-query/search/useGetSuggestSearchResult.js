import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import { onSingleErrorResponse } from '../../../components/ErrorResponse'

export const getData = async (searchValue) => {
    if (searchValue.trim().length >= 1) {
        const { data } = await MainApi.get(
            `/api/v1/products/food-or-restaurant-search?name=${searchValue}`
        )
        return data
    }
}
export const useGetSuggestSearchResult = (searchValue) => {
    return useQuery('suggest-search', () => getData(searchValue), {
        enabled: false,
        onError: onSingleErrorResponse,
    })
}
