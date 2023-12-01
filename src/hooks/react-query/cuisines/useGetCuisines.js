import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import {
    onErrorResponse,
    onSingleErrorResponse,
} from '../../../components/ErrorResponse'

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/cuisine')
    return data
}
export const useGetCuisines = (handleSuccess) => {
    return useQuery('cuisines-list', () => getData(), {
        enabled: false,
        onError: onSingleErrorResponse,
        onSuccess: handleSuccess,
        staleTime: 1000 * 60 * 8,
        cacheTime: 8 * 60 * 1000,
    })
}
