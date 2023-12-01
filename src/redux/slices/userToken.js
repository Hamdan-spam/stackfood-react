import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
}
export const userTokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action?.payload
        },
        removeToken: (state) => {
            state.token = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken, removeToken } = userTokenSlice.actions
export default userTokenSlice.reducer
