import MainApi from '../../../api/MainApi'

export const CouponApi = {
    couponList: () => MainApi.get('/api/v1/coupon/list'),
    applyCoupon: (code, restaurant_id) =>
        MainApi.get(`/api/v1/coupon/apply?code=${code}&restaurant_id=${restaurant_id}`),
    restaurantCoupon:(customer_id,restaurant_id)=>MainApi.get(`/api/v1/restaurants/get-coupon?restaurant_id=${restaurant_id}&customer_id=${customer_id?customer_id:null}`)
}
