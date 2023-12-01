import React from 'react'
import { CustomHeader } from '../../api/Headers'
import HeroSectionWithSearch from '../../components/home/hero-section-with-search'
import { useRouter } from 'next/router'
import ProductSearchPage from '../../components/products-page/ProductSearchPage'
import CustomContainer from '../../components/container'
import ScrollToTop from '../../components/scroll-top/ScrollToTop'

const SearchPage = ({ configData }) => {
    const router = useRouter()
    const { query } = router.query
    return (
        <>
            <ScrollToTop />
            <HeroSectionWithSearch query={query} />
            <CustomContainer>
                <ProductSearchPage query={query} configData={configData} />
            </CustomContainer>
        </>
    )
}

export default SearchPage
export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    return {
        props: {
            configData: config,
        },
    }
}
