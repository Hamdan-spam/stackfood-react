import MainApi from '../../../api/MainApi'
import { getToken } from "../../../components/checkout-page/functions/getGuestUserId";

let token = undefined
if (typeof window != 'undefined') {
    token = localStorage.getItem('token')
}
export const OrderApi = {
    placeOrder: (formData) => {
        return MainApi.post('/api/v1/customer/order/place', formData)
    },
    orderHistory: (orderType, limit, offset) => {
        return MainApi.get(
            `/api/v1/customer/order/${orderType}?limit=${limit}&offset=${offset}`
        )
    },
    orderDetails: (order_id, phone, guestId) => {
        const params = !getToken()
            ? `?order_id=${order_id}&guest_id=${guestId}&contact_number=${phone}`
            : `?order_id=${order_id}`;
        if (getToken()) {
            return MainApi.get(`/api/v1/customer/order/details${params}`)
        } else {
            if (phone) {
                return MainApi.get(`/api/v1/customer/order/details${params}`)
            }

        }

    },
    foodLists: (foodId) => {
        return MainApi.post(`/api/v1/customer/food-list?food_id=${foodId}`)
    },
    orderTracking: (order_id, phone, guestId) => {
        const params = !getToken()
            ? `?order_id=${order_id}&guest_id=${guestId}&contact_number=${phone}`
            : `?order_id=${order_id}`;
        if (getToken()) {
            return MainApi.get(`/api/v1/customer/order/track${params}`)
        } else {
            if (phone) {
                return MainApi.get(`/api/v1/customer/order/track${params}`)
            }

        }

    },
    CancelOrder: (formData) => {
        return MainApi.post('/api/v1/customer/order/cancel', formData)
    },
    FailedPaymentMethodUpdate: (formData) => {
        return MainApi.post('/api/v1/customer/order/payment-method', formData)
    },
}
