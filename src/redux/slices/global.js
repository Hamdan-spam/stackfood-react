import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    global: undefined,
    couponInfo: null,
    couponType: '',

    zoneData: null,
    handleHomePage: false,
}

export const globalSettingSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setGlobalSettings: (state, action) => {
            state.global = action.payload
        },
        setCustomerProfile: (state, action) => {
            state.customerProfile = action?.payload
        },
        setCouponInfo: (state, action) => {
            state.couponInfo = action?.payload
        },
        setCouponType: (state, action) => {
            state.couponType = action?.payload
        },
        setZoneData: (state, action) => {
            state.zoneData = action?.payload
        },
        setHandleHomePage: (state, action) => {
            state.handleHomePage = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setGlobalSettings,

    setCustomerProfile,
    setCouponInfo,
    setCouponType,
    setZoneData,
    setHandleHomePage,
} = globalSettingSlice.actions
export default globalSettingSlice.reducer
