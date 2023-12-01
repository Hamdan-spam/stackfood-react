import React from 'react'
import { Container, CssBaseline } from '@mui/material'
import RestaurantList from './RestaurantList'
import CustomContainer from "../container";

const Restaurant = () => {
    return (
        <>
            <CssBaseline />
            <CustomContainer >
                <RestaurantList />
            </CustomContainer>
        </>
    )
}

export default Restaurant
