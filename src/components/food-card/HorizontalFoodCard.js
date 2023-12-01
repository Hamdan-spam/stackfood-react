import React from 'react'
import {
    CustomFavICon,
    CustomFoodCard,
    CustomFoodCardNew,
} from './FoodCard.style'
import { Box, Stack } from '@mui/system'
import CustomImageContainer from '../CustomImageContainer'
import test_image from '../../../public/static/testImage.svg'
import { IconButton, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import VagSvg from '../foodDetail-modal/VagSvg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    CustomOverlayBox,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {
    getAmount,
    getConvertDiscount,
    getReviewCount,
    isAvailable,
} from '../../utils/customFunctions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StartPriceView from '../foodDetail-modal/StartPriceView'
import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import { RTL } from '../RTL/RTL'
import { t } from 'i18next'
import FoodRating from './FoodRating'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import FoodCardIncrementAndDecrement from './FoodCardIncrementAndDecrement'
import AfterAddToCart from './AfterAddToCart'
import CartClearModal from '../foodDetail-modal/CartClearModal'
import CircularLoader from "../loader/CircularLoader";
import { useSelector } from 'react-redux'
import StarIcon from '@mui/icons-material/Star';

const HorizontalFoodCard = (props) => {
    const {
        setOpenModal,
        product,
        imageUrl,
        isInList,
        languageDirection,
        addToFavorite,
        deleteWishlistItem,
        available_time_starts,
        available_time_ends,
        handleFoodDetailModal,
        handleBadge,
        addToCart,
        isInCart,
        getQuantity,
        incrOpen,
        setIncrOpen,
        handleClickQuantityButton,
        addToCartLoading,
        isRestaurantDetails
    } = props
    const theme = useTheme();
    const { global } = useSelector((state) => state.globalSettings)
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    return (
        <>
            <RTL direction={languageDirection}>
                <CustomFoodCardNew
                    horizontal
                    onClick={handleFoodDetailModal}
                    background={theme.palette.cardBackground1}
                    width="100%"
                >
                    <Stack
                        direction="row"
                        spacing={1.5}
                        width="100%"
                        sx={{ overflow: 'hidden' }}
                    >
                        <Stack
                            position="relative"
                            sx={{
                                transition: `${theme.transitions.create(
                                    ['background-color', 'transform'],
                                    {
                                        duration:
                                            theme.transitions.duration.standard,
                                    }
                                )}`,
                                marginLeft:languageDirection==="rtl" && ".8rem !important",
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <CustomImageContainer
                                src={imageUrl}
                                width="115px"
                                smWidth="95px"
                                smHeight="95px"
                                height="95px"
                                borderRadius="3px"
                                objectFit="cover"
                            />
                            <Stack
                                position="absolute"
                                top="10%"
                                left="0"
                                zIndex="1"
                            >
                                {handleBadge(
                                    product,
                                    currencySymbol,
                                    currencySymbolDirection,
                                    digitAfterDecimalPoint,
                                    product?.available_date_ends
                                )}
                            </Stack>

                            {!isAvailable(
                                available_time_starts,
                                available_time_ends
                            ) && (
                                    <CustomOverlayBox>
                                        <Typography align="center" variant="h5">
                                            {t('Not Available now')}
                                        </Typography>
                                    </CustomOverlayBox>
                                )}
                        </Stack>
                        <Stack spacing={0.8} width="100%" >
                            <Typography
                                variant="subtitle2"
                                fontSize="12px"
                                fontWeight={400}
                                color={theme.palette.neutral[500]}
                            >
                                {product?.restaurant_name}
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                flexWrap="wrap"
                                spacing={0.5}
                            >
                                <CustomTypographyEllipsis
                                    variant="h5"
                                    fontWeight="500"
                                    maxWidth="125px"
                                >
                                    {product?.name?.length > 15 ? `${product?.name.slice(0, 12)}...` : product?.name}
                                </CustomTypographyEllipsis>
                                <VagSvg
                                    color={
                                        Number(product?.veg) === 0
                                            ? theme.palette.nonVeg
                                            : theme.palette.success.light
                                    }
                                />
                            </Stack>
                            <Stack flexDirection="row" gap="3px">
                                <Typography fontSize="11px">{product?.avg_rating}</Typography>
                                <StarIcon sx={{ fontSize: '14px', color: theme.palette.primary.main }} />
                                <Typography
                                    fontSize="11px"
                                    color={theme.palette.text.secondary}
                                >
                                    {getReviewCount(product?.rating_count)}
                                </Typography>
                            </Stack>
                            <StartPriceView
                                data={product}
                                hideStartFromText="true"
                                handleBadge={handleBadge}
                            />
                        </Stack>
                        <Stack
                            justifyContent="space-between"
                            alignItems=" flex-end"
                        >
                            {!product?.available_date_ends && (
                                <>
                                    {!isInList(product.id) ? (
                                        <IconButton
                                            onClick={(e) => addToFavorite(e)}
                                            sx={{ padding: '3px' }}
                                        >
                                            <FavoriteBorderIcon color="primary" />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={(e) =>
                                                deleteWishlistItem(
                                                    product.id,
                                                    e
                                                )
                                            }
                                            sx={{ padding: '3px' }}
                                        >
                                            <FavoriteIcon color="primary" />
                                        </IconButton>
                                    )}
                                </>
                            )}
                            {!isInCart && (
                                <IconButton
                                    onClick={(e) => addToCart(e)}
                                    sx={{ padding: '3px' }}
                                >
                                    {addToCartLoading ? <CircularLoader size="20px" /> : <AddShoppingCartIcon color="primary" />}

                                </IconButton>
                            )}
                            {isInCart && !incrOpen && (
                                <AfterAddToCart
                                    isInCart={isInCart}
                                    product={product}
                                    getQuantity={getQuantity}
                                    handleClickQuantityButton={
                                        handleClickQuantityButton
                                    }
                                    setIncrOpen={setIncrOpen}
                                    incrOpen={incrOpen}
                                    addToCartLoading={addToCartLoading}
                                />
                            )}
                        </Stack>
                    </Stack>
                    <Box
                        position="relative"
                        width="100%"
                        sx={{
                            width: {
                                xs: 'calc(100% - 85px)',
                                sm: 'calc(100% - 130px)',
                            },
                            marginInlineStart: 'auto',
                        }}
                    >
                        {isInCart && incrOpen && (
                            <AfterAddToCart
                                isInCart={isInCart}
                                product={product}
                                getQuantity={getQuantity}
                                handleClickQuantityButton={
                                    handleClickQuantityButton
                                }
                                setIncrOpen={setIncrOpen}
                                incrOpen={incrOpen}
                                position="-30px"
                            />
                        )}
                    </Box>
                </CustomFoodCardNew>
            </RTL>
        </>
    )
}

export default HorizontalFoodCard
