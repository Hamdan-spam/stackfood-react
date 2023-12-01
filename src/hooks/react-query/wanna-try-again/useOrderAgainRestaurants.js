import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import {onSingleErrorResponse} from "../../../components/ErrorResponse";

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/customer/order-again')
    return data
}
export const useOrderAgainRestaurants = (handleSuccess) => {
    return useQuery('order-again-restaurants', () => getData(), {
        enabled:false,
        onError:onSingleErrorResponse,
        retry:1,
        onSuccess: handleSuccess,
    })
}