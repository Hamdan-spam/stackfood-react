import { createSlice } from '@reduxjs/toolkit'
import products from "../../components/products-page/Products";

const initialState = {
    searchTagData: [],
    isProductsOrRestaurants: "products",
}

export const searchTag = createSlice({
    name: 'storeData',
    initialState,
    reducers: {
        setSearchTagData: (state, action) => {
            state.searchTagData = action.payload
        },
        setProductsOrRestaurants: (state, action) => {
            state.isProductsOrRestaurants = action.payload
        },

        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setSearchTagData,setProductsOrRestaurants } = searchTag.actions
export default searchTag.reducer
