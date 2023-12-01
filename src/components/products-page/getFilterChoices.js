import React from 'react'
import { isAvailable, isProductAvailable } from '../../utils/customFunctions'
import moment from 'moment'

export const getFilterChoices = (filterData, data, foodOrRestaurant) => {
    let productsList =
        foodOrRestaurant === 'products'
            ? data?.data?.products
            : data?.data?.restaurants

    if (productsList && productsList.length > 0) {
        if (filterData.rating !== '') {
            productsList = productsList.filter(
                (product) =>
                    Number(product.avg_rating) >= Number(filterData.rating)
            )
        }
        if (filterData?.filterBy?.popular) {
            productsList = productsList
                ?.sort((a, b) => Number(b.order_count) - Number(a.order_count))
                .slice(0, 16)
        }
        if (filterData?.filterBy?.most_reviewed) {
            productsList = productsList
                .slice(0, 16)
                ?.sort(
                    (a, b) => Number(b.rating_count) - Number(a.rating_count)
                )
                .slice(0, 16)
        }
        if (filterData?.filterBy?.new) {
            productsList = productsList
                .map((dateTime) => {
                    return {
                        ...dateTime,
                        created_at: moment(
                            (dateTime && dateTime.created_at) || null,
                            'YYYY-MM-DD hh:mm A'
                        ),
                    }
                })
                .sort((a, b) => b.created_at - a.created_at)
                .map((momentObject) => {
                    return {
                        ...momentObject,
                        created_at:
                            momentObject.created_at?.format(
                                'YYYY-MM-DD hh:mm A'
                            ),
                    }
                })
                .slice(0, 16)
        }
        if (filterData?.filterByCuisine?.length > 0) {
            productsList = productsList?.filter((product) =>
                product.cuisine?.find((item) =>
                    filterData?.filterByCuisine?.includes(item?.name)
                )
            )
        }
        if (!filterData.filterBy.veg && filterData.filterBy.nonVeg) {
            productsList = productsList.filter((product) => product.veg === 0)
        }
        if (!filterData.filterBy.nonVeg && filterData.filterBy.veg) {
            productsList = productsList.filter((product) => product.veg === 1)
        }
        if (filterData.filterBy.currentlyAvailable) {
            productsList = productsList.filter((product) => {
                if (foodOrRestaurant === 'products') {
                    return isAvailable(
                        product.available_time_starts,
                        product.available_time_ends
                    )
                } else {
                    return product?.active && product?.open === 1
                }
            })
        }
        if (foodOrRestaurant === 'products') {
            if (filterData.price !== '') {
                productsList = productsList.filter(
                    (product) =>
                        Math.floor(product.price) >=
                            Math.floor(filterData.price[0]) &&
                        Math.floor(product.price) <=
                            Math.floor(filterData.price[1])
                )
            }
        }
    }

    return productsList
}
