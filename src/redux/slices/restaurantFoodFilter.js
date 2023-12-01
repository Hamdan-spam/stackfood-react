import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        filterBy: {
            veg: false,
            nonVeg: false,
            currentAvailable: false,
            discount: false
    }
}

export const restaurantFoodFilterSlice = createSlice({
    name: 'food-filter',
    initialState,
    reducers: {
        setFilterByDispatch: (state, action) => {
            state.filterBy = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    setFilterByDispatch
} = restaurantFoodFilterSlice.actions
export default restaurantFoodFilterSlice.reducer
