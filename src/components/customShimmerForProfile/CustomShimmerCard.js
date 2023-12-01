import React from 'react'
import { CustomBoxFullWidth } from '../../styled-components/CustomStyles.style'
import { Grid } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
const CustomShimmerCard = () => {
    return (
        <CustomBoxFullWidth >
            <Grid container spacing={3}>
                {[...Array(6)].map((item, index) => {
                    return (
                        <Grid item xs={12} sm={12} md={12} key={index}>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width="100%"
                                height="6rem"
                                style={{
                                    borderRadius:"6px",

                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </CustomBoxFullWidth>
    )
}
export default CustomShimmerCard
