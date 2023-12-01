import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    featuredCategories: [],
    cuisines: [],
    popularRestaurants: [],
    campaignFoods: [],
    banners: {
        banners: [],
        campaigns: [],
    },
    bestReviewedFoods: [],
    popularFood: [],
    suggestedKeywords: [],
    landingPageData: {},
}

export const storedDataSlice = createSlice({
    name: 'stored-data',
    initialState,
    reducers: {
        setFeaturedCategories: (state, action) => {
            state.featuredCategories = action.payload
        },
        setCuisines: (state, action) => {
            state.cuisines = action.payload
        },
        setPopularRestaurants: (state, action) => {
            state.popularRestaurants = action.payload
        },
        setCampaignFoods: (state, action) => {
            state.campaignFoods = action.payload
        },
        setBanners: (state, action) => {
            state.banners.banners = action.payload.banners
            state.banners.campaigns = action.payload.campaigns
        },
        setBestReviewedFood: (state, action) => {
            state.bestReviewedFoods = action.payload
        },
        setPopularFood: (state, action) => {
            state.popularFood = action.payload
        },
        setSuggestedKeywords: (state, action) => {
            state.suggestedKeywords = action.payload
        },
        setLandingPageData: (state, action) => {
            state.landingPageData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setLandingPageData,
    setFeaturedCategories,
    setCuisines,
    setPopularRestaurants,
    setCampaignFoods,
    setBanners,
    setBestReviewedFood,
    setPopularFood,
    setSuggestedKeywords,
} = storedDataSlice.actions
export default storedDataSlice.reducer
