import React from 'react'
import { CssBaseline, Container } from '@mui/material'
import ProductSearchPage from './ProductSearchPage'
import HomeSearch from "../home/HomeSearch";
import {Box} from "@mui/system";
import CustomContainer from "../container";

const ProductSearch = ({ type,configData }) => {
    return (
        <>
            <CssBaseline />
            <CustomContainer
                maxWidth="lg"
                sx={{
                    mt: { xs: '5rem', md: '9rem' },
                    mb: { xs: '72px', md: '0' },
                }}
            >

                <ProductSearchPage product_type={type} configData={configData} />
            </CustomContainer>
        </>
    )
}

export default ProductSearch
