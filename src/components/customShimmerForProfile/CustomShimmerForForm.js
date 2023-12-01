import React from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    CustomBoxFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

const CustomShimmerForForm = () => {
    return (
        <CustomBoxFullWidth mt="20px">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <CustomStackFullWidth height="100%" spacing={3}>
                        <Skeleton variant="rounded" width="100%" height={140} />
                    </CustomStackFullWidth>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <CustomStackFullWidth height="100%" spacing={3}>
                        <Skeleton variant="rounded" width="100%" height={200} />
                    </CustomStackFullWidth>
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}

export default CustomShimmerForForm
