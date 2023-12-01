import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'

export const getData = async (orderId) => {
    if (orderId) {
        const { data } = await MainApi.get(
            `/api/v1/customer/order/send-notification/${orderId}`
        )
        return data
    }
}
export const useGetOrderPlaceNotification = (orderId) => {
    return useQuery('api-for-notification-count', () => getData(orderId))
}
