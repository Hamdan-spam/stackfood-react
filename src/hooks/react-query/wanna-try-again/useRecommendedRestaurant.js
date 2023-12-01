import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import {onSingleErrorResponse} from "../../../components/ErrorResponse";

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/restaurants/recommended')
    return data
}
export const useRecommendedRestaurant = (handleSuccess) => {
    return useQuery('recommended-restaurants', () => getData(), {
        enabled:false,
        onError:onSingleErrorResponse,
        retry:1,
        onSuccess: handleSuccess,
    })
}