import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    landingPage: undefined,
}

export const landingPageSlice = createSlice({
    name: 'landingPage',
    initialState,
    reducers: {
        setLandingPageData: (state, action) => {
            state.landingPage = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLandingPageData } = landingPageSlice.actions
export default landingPageSlice.reducer
