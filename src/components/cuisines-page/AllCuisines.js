import { Box, Container, CssBaseline, Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'

import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import { useGetCuisines } from '../../hooks/react-query/cuisines/useGetCuisines'
import CustomPageTitle from '../CustomPageTitle'

import CuisinesCard from '../home/cuisines/CuisinesCard'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomShimmerCategories from '../CustomShimmer/CustomShimmerCategories'
import CustomContainer from '../container'
import { useSelector } from 'react-redux'

const AllCuisines = () => {
    const matches = useMediaQuery('(max-width:1180px)')
    const { cuisines } = useSelector((state) => state.storedData)
    return (
        <>
            <CssBaseline />
            <CustomContainer>
                <CustomPaperBigCard sx={{ marginTop:{xs:"4rem",sm:"4rem",md:"8rem"}}}>
                    <Box minHeight="70vh">
                        <Grid
                            container
                            spacing={{ xs: 1, md: 2, lg: 2 }}
                            mb="30px"
                        >
                            <Grid item xs={12} sm={12} md={12} justify="center">
                                <CustomPageTitle title="Cuisines" />
                            </Grid>
                            {cuisines?.map((item, index) => (
                                <Grid
                                    item
                                    md={matches ? 2 : 1.7}
                                    sm={3}
                                    xs={3}
                                    mt=".5rem"
                                >
                                    <CuisinesCard item={item} key={index} />
                                </Grid>
                            ))}
                            {!cuisines && (
                                <Stack
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    paddingX="20px"
                                >
                                    <CustomShimmerCategories
                                        noSearchShimmer="true"
                                        itemCount="14"
                                        smItemCount="5"
                                    />
                                </Stack>
                            )}
                            {/*{isRefetching &&(<Stack justifyContent="center" alignItems="center">*/}
                            {/*    <CustomShimmerCategories   noSearchShimmer="true"*/}
                            {/*                               itemCount="9"*/}
                            {/*                               smItemCount="5"/>*/}
                            {/*</Stack>)}*/}
                        </Grid>
                    </Box>
                </CustomPaperBigCard>
            </CustomContainer>
        </>
    )
}

export default AllCuisines
