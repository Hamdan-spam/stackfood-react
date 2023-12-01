import { Container, CssBaseline } from '@mui/material'
import React from 'react'
import CategoryList from './CategoryList'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomContainer from '../container'

const Category = () => {
    return (
        <>
            <CssBaseline />
            <CustomContainer>
                <CustomPaperBigCard
                    sx={{ marginTop: {xs:"5rem",md:"8rem"}, marginBottom: '1rem' }}
                >
                    <CategoryList />
                </CustomPaperBigCard>
            </CustomContainer>
        </>
    )
}

export default Category
