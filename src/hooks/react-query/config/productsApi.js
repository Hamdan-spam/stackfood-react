import MainApi from '../../../api/MainApi'

export const MostReviewedApi = {
    reviewed: () => MainApi.get('/api/v1/products/most-reviewed'),
}
export const PopularFoodNearbyApi = {
    popularFood: () => MainApi.get('/api/v1/products/popular'),
}
export const ProductApis = {
    latestFood: ({ restaurant_id, category_id, type, offset, page_limit }) => {
        return MainApi.get(
            `/api/v1/products/latest?restaurant_id=${restaurant_id}&category_id=${category_id}&type=${type}&offset=${offset}&limit=${page_limit}`
        )
    },
    searchlatestFood: ({
        restaurant_id,
        searchKey,
        type,
        offset,
        page_limit,
    }) => {
        return MainApi.get(
            `/api/v1/products/search?restaurant_id=${restaurant_id}&name=${searchKey}&type=${type}&offset=${offset}&limit=${page_limit}`
        )
    },
}

export const ProductsApi = {
    reviewed: () => MainApi.get('/api/v1/products/most-reviewed'),
    popularFood: () => MainApi.get('/api/v1/products/popular'),
    latestFood: ({
        restaurant_id,
        category_id,
        type,
        pageOffset,
        pageLimit,
    }) => {
        return MainApi.get(
            `/api/v1/products/latest?restaurant_id=${restaurant_id}&category_id=${category_id}&type=${type}&offset=${pageOffset}&limit=${pageLimit}`
        )
    },

    products: (product_type, offset, page_limit, type) =>
        MainApi.get(
            `/api/v1/products/${product_type}?offset=${offset}&limit=${page_limit}&type=${type}`
        ),
    productSearch: (search_type, value, offset, page_limit,filterData) => {

        const type=filterData?.filterBy?.veg?"veg":filterData?.filterBy?.nonVeg?"non_veg":null
        if (value !== '') {
            return MainApi.get(
                `/api/v1/${search_type}/search?name=${value===undefined?null:value}&offset=${offset}&limit=${page_limit}&type=${type}&new=${filterData?.filterBy?.new?1:0}&popular=${filterData?.filterBy?.popular?1:0}&rating=${filterData?.filterBy?.rating?1:0}&discounted=${filterData?.filterBy?.discounted?1:0}&sort_by=${filterData?.sortBy}`
            )
        }
    },

    addFavorite: (product_id) => {
        return MainApi.post(
            `/api/v1/customer/wish-list/add?food_id=${product_id}`
        )
    },
    suggestedProducts: () => MainApi.get(`/api/v1/customer/suggested-foods`),
}
