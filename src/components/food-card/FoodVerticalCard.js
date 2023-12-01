import React, { useState } from 'react'
import { CustomFoodCard, CustomFoodCardNew } from './FoodCard.style'
import CustomImageContainer from '../CustomImageContainer'
import test_image from '../../../public/static/testImage.svg'
import { CustomStackForFoodModal } from '../foodDetail-modal/FoodModalStyle'
import { Chip, IconButton, Typography, useMediaQuery } from '@mui/material'
import ProductCardMedia from './ProductCardMedia'
import VagSvg from '../foodDetail-modal/VagSvg'
import { Stack } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../error/Errors.style'
import StartPriceView from '../foodDetail-modal/StartPriceView'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { useSelector } from 'react-redux'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import AfterAddToCart from './AfterAddToCart'
import { HomeTextTypography } from '../home/HomeStyle'
import { getReviewCount } from '../../utils/customFunctions'
import FoodRating from './FoodRating'
import { t } from 'i18next'
const FoodVerticalCard = (props) => {
    const {
        product,
        setOpenModal,
        productImageUrl,
        handleFoodDetailModal,
        deleteWishlistItem,
        isInList,
        addToFavorite,
        imageUrl,
        handleBadge,
        addToCart,
        isInCart,
        getQuantity,
        incrOpen,
        setIncrOpen,
        handleClickQuantityButton,
        hasBackGroundSection,
        isRestaurantDetails,
    } = props

    const [isTransformed, setIstransformed] = useState(false);
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <CustomFoodCardNew
            height="293px"
            smheight={(isRestaurantDetails && isSmall) ? "245px" : "230px"}
            maxwidth="250px"
            onClick={(e) => handleFoodDetailModal(e)}
            onMouseEnter={() =>
                setIstransformed(true)
            }
            onMouseDown={() =>
                setIstransformed(true)
            }
            onMouseLeave={() =>
                setIstransformed(false)}
            background={
                hasBackGroundSection === 'true'
                    ? theme.palette.cardBackground1
                    : theme.palette.cardBackground2
            }
        >
            <CustomStackFullWidth spacing={1.3}>
                <ProductCardMedia
                    id={product?.id}
                    onClick={handleFoodDetailModal}
                    available_time_starts={product?.available_time_starts}
                    available_time_ends={product?.available_time_ends}
                    available_date_ends={product?.available_date_ends}
                    imageUrl={imageUrl}
                    alt={product?.name}
                    addToFavorite={addToFavorite}
                    isInList={isInList}
                    deleteWishlistItem={deleteWishlistItem}
                    handleBadge={handleBadge}
                    product={product}
                    isInCart={isInCart}
                    getQuantity={getQuantity}
                    setIncrOpen={setIncrOpen}
                    handleClickQuantityButton={handleClickQuantityButton}
                    addToCart={addToCart}
                    isTransformed={isTransformed}
                    incrOpen={incrOpen}
                    isRestaurantDetails={isRestaurantDetails}
                    rating_count={product?.rating_count}
                />
                <CustomStackFullWidth sx={{ padding: '5px' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap="5px"
                        sx={{ position: 'relative' }}
                    >
                        <Stack flexDirection="row" alignItems="center" gap="5px">
                            <Typography fontSize={{ xs: "13px", sm: "14px", md: "15px" }} fontWeight={500} whiteSpace="nowrap">
                                {product?.name.length > 13 ? `${product?.name.slice(0, 13)}... ` : product?.name}
                            </Typography>
                            <VagSvg
                                color={
                                    Number(product?.veg) === 0
                                        ? theme.palette.nonVeg
                                        : theme.palette.success.light
                                }
                            />
                        </Stack>
                        <Stack flexDirection="row" gap="5px">
                            <Typography
                                fontSize={{ xs: "12px", md: "14px" }}
                                fontWeight={400}
                                color={theme.palette.text.secondary}
                            >
                                {getReviewCount(product?.rating_count)}
                            </Typography>
                            {((product?.avg_rating !== 0 && isRestaurantDetails && !isSmall) || (!isRestaurantDetails && product?.avg_rating !== 0)) ? <FoodRating product_avg_rating={product?.avg_rating} /> : ""}
                        </Stack>
                    </Stack>


                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '3px',
                            width: '100%',
                        }}
                    >
                        {product?.cuisines?.length > 0 &&
                            product?.cuisines?.map((cuisine, index) => (
                                <Typography
                                    key={index}
                                    align="left"
                                    fontSize="12px"
                                    color={theme.palette.neutral[600]}
                                >
                                    {' '}
                                    {cuisine?.name}{' '}
                                    {product?.cuisines?.length - 1 === index
                                        ? ''
                                        : ','}
                                </Typography>
                            ))}
                    </div>

                    <Stack
                        width="100%"
                        justifyContent="space-between"
                        direction={(isRestaurantDetails && isSmall) ? "column" : "row"}
                        alignItems={(isRestaurantDetails && isSmall) ? "start" : "center"}
                        position="relative"
                        mt={{ xs: '0px', sm: '2px', md: '4px' }}
                    >
                        <Stack>
                            <Typography
                                fontSize="12px"
                                fontWeight={500}
                                color={theme.palette.text.custom}
                            >
                                {product?.min_delivery_time}-{product?.max_delivery_time} {t('min')}
                            </Typography>
                        </Stack>
                        <StartPriceView
                            data={product}
                            handleBadge={handleBadge}
                            available_date_ends={product?.available_date_ends}
                        />
                    </Stack>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomFoodCardNew>
    )
}

export default FoodVerticalCard
