import React, { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import {
    CustomBoxFullWidth,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Box, Grid, Typography, Stack, Paper } from '@mui/material'
import {
    CustomCardContent,
    CustomFoodCard,
    FoodSubTitleTypography,
    FoodTitleTypography,
    RatingWrapTypography,
    RatingStarIcon,
    PricingCardActions,
    StyledButton,
} from '../food-card/FoodCard.style'
import useMediaQuery from '@mui/material/useMediaQuery'
const CustomShimmerRestaurant = () => {
    const [count, setCount] = useState(8)
    const matchesToSmall = useMediaQuery('(min-width:400px)')
    return (
        <CustomBoxFullWidth align="center" sx={{ minHeight: '70vh' }}>
            <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
                paddingTop="30x"
                paddingLeft="10px"
            >
                {[...Array(count)].map((i, index) => {
                    return (
                        <Grid
                            item
                            lg={3}
                            sm={4}
                            xs={matchesToSmall ? 6 : 12}
                            textAlign="-webkit-center"
                            key={index}
                        >
                            <CustomPaperBigCard padding="10px">
                                <CustomStackFullWidth spacing={2}>
                                    <Skeleton
                                        variant="rectangular"
                                        animation="wave"
                                        height={130}
                                        width="100%"
                                        sx={{ borderRadius: '3px' }}
                                    />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            animation="wave"
                                            width={130}
                                            height={25}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width={40}
                                            animation="wave"
                                            height={25}
                                        />
                                    </Stack>
                                    <Skeleton
                                        variant="rectangular"
                                        animation="wave"
                                        width={130}
                                        height={15}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        animation="wave"
                                        width={130}
                                        height={15}
                                    />
                                </CustomStackFullWidth>
                            </CustomPaperBigCard>
                        </Grid>
                    )
                })}
            </Grid>
        </CustomBoxFullWidth>
    )
}

export default CustomShimmerRestaurant
