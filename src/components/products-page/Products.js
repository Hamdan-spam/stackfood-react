import React from 'react'
import { CssBaseline, Container } from '@mui/material'
import ProductPage from './ProductPage'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Meta from '../Meta'
import CategoryDetailsPage from '../category/CategoryDetailsPage'
import CustomPageTitle from '../CustomPageTitle'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import CustomContainer from '../container'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'

const Products = ({ type, title, description }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <>
            <CssBaseline />
            <CustomContainer>
                <CustomStackFullWidth>
                    <CustomPaperBigCard
                        padding={!isSmall ? '1.8rem' : '1rem'}
                        sx={{
                            marginTop: '1rem',
                            minHeight: '70vh',
                            marginBottom: '1rem',
                        }}
                    >
                        <CustomStackFullWidth>
                            <CustomPageTitle title={title} />
                            <Box sx={{ marginTop: '1.2rem' }}>
                                <ProductPage product_type={type} />
                            </Box>
                        </CustomStackFullWidth>
                    </CustomPaperBigCard>
                </CustomStackFullWidth>
            </CustomContainer>
        </>
    )
}

export default Products
