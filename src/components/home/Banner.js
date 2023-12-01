import React, { useEffect, useState } from 'react'
import {
    CustomStackFullWidth,
    SliderCustom,
} from '../../styled-components/CustomStyles.style'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Typography } from '@mui/material'
import BannerCard from './Banner/BannerCard'
import { bannerSettings } from './Banner/bannerSettings'
import { setBannerFoodByDispatch } from '../../redux/slices/searchFilter'
import { useRouter } from 'next/router'
import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import { useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton'
import { handleBadge } from '../../utils/customFunctions'
const Banner = () => {
    const router = useRouter()
    const { banners } = useSelector((state) => state.storedData)
    const [allBanners, setAllBanners] = useState()
    const [FoodBannerData, setFoodBannerData] = useState(null)
    const bannerData = allBanners?.concat(banners?.campaigns)
    const [openModal, setOpenModal] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    const globalImageUrl = global?.base_urls?.banner_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    useEffect(() => {
        const foodBanners = banners?.banners.filter(
            (item) => item?.type === 'item_wise'
        )
        const isOldVariations = foodBanners?.filter(
            (ite) =>
                ite?.food?.variations === null ||
                ite?.food?.variations[0]?.values ||
                ite?.food?.variations?.length === 0
        )

        const restaurantBanners = banners?.banners.filter(
            (item) => item?.type === 'restaurant_wise'
        )

        setAllBanners(isOldVariations.concat(restaurantBanners))
    }, [banners])

    const handleBannerClick = (banner) => {
        if (banner.type === 'restaurant_wise') {
            router.push(
                {
                    pathname: '/restaurant/[id]',
                    query: {
                        id: `${
                            banner?.restaurant?.slug
                                ? banner?.restaurant?.slug
                                : banner?.restaurant?.id
                        }`,
                    },
                },
                undefined,
                { shallow: true }
            )
        } else if (banner?.available_date_ends) {
            router.push(
                {
                    pathname: `campaigns/${
                        banner?.slug ? banner?.slug : banner?.id
                    }`,
                },
                undefined,
                { shallow: true }
            )
        } else {
            setFoodBannerData(banner?.food)
            setOpenModal(true)
        }
    }
    const handleModalClose = () => {
        setOpenModal(false)
        setFoodBannerData(null)
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <CustomStackFullWidth
            sx={{ paddingTop: {xs:bannerData?.length > 0 && '15px',md:bannerData?.length > 0 && '10px'},paddingBottom: { xs:"30px",md:"20px" } }}
        >
            {banners ? (
                <SliderCustom languageDirection={languageDirection} gap='.8rem'>
                    <Slider {...bannerSettings}>
                        {bannerData?.slice(0, 8).map((banner) => {
                            return (
                                <BannerCard
                                    banner={banner}
                                    key={banner?.id}
                                    handleBannerClick={handleBannerClick}
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                    handleModalClose={handleModalClose}
                                    FoodBannerData={FoodBannerData}
                                />
                            )
                        })}
                    </Slider>
                </SliderCustom>
            ) : (
                <SliderCustom>
                    <Slider {...bannerSettings}>
                        <Skeleton
                            maxWidth="390px"
                            width="100%"
                            height="151px"
                            variant="rectangular"
                        />
                        <Skeleton
                            maxWidth="390px"
                            width="100%"
                            height="151px"
                            variant="rectangular"
                        />
                        <Skeleton
                            maxWidth="390px"
                            width="100%"
                            height="151px"
                            variant="rectangular"
                        />
                    </Slider>
                </SliderCustom>
            )}
            {FoodBannerData && openModal && (
                <FoodDetailModal
                    product={FoodBannerData}
                    image={`${global?.base_urls?.product_image_url}/${FoodBannerData?.image}`}
                    open={openModal}
                    handleModalClose={handleModalClose}
                    setOpen={setOpenModal}
                    currencySymbolDirection={currencySymbolDirection}
                    currencySymbol={currencySymbol}
                    digitAfterDecimalPoint={digitAfterDecimalPoint}
                    handleBadge={handleBadge}
                />
            )}
        </CustomStackFullWidth>
    )
}

export default Banner
