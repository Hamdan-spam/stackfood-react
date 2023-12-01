import React, { useEffect, useState } from 'react'
import { CardMedia, IconButton, Typography, useMediaQuery } from '@mui/material'
import { CustomCardMedia, CustomChip, OfferTypography, TypographyText } from './FoodCard.style'
import { t } from 'i18next'
import CustomImageContainer from '../CustomImageContainer'
import { Box, Stack } from '@mui/system'
import { useSelector } from 'react-redux'
import { getAmount, isAvailable } from '../../utils/customFunctions'
import { CustomOverLay, CustomOverlayBox } from '../../styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import test_image from '../../../public/static/testImage.svg'
import { CustomStackForFoodModal } from '../foodDetail-modal/FoodModalStyle'
import FoodRating from './FoodRating'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import QuickView from './QuickView'

const ProductCardMedia = (props) => {
    const {
        id,
        image,
        onClick,
        available_time_starts,
        available_time_ends,
        available_date_ends,
        imageUrl,
        alt,
        addToFavorite,
        isInList,
        deleteWishlistItem,
        handleBadge,
        product,
        isInCart,
        incrOpen,
        getQuantity,
        setIncrOpen,
        handleClickQuantityButton,
        addToCart,
        isTransformed,
        isRestaurantDetails,
        rating_count,
    } = props
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, []);

    return (
        <>
            {!image && (
                <Stack sx={{ overflow: 'hidden' }}>
                    <Box
                        onClick={onClick}
                        sx={{
                            position: 'relative',
                            maxHeight: '190px',

                            [theme.breakpoints.down('sm')]: {
                                maxHeight: '140px',
                                // height:" 351px"
                            },
                        }}
                    >
                        {/* {!available_date_ends && (
                            <Stack
                                position="absolute"
                                top="5%"
                                right="5%"
                                zIndex="99"
                            >
                                {!isInList(id) ? (
                                    <IconButton
                                        onClick={(e) => addToFavorite(e)}
                                    >
                                        <FavoriteBorderIcon color="primary" />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={(e) =>
                                            deleteWishlistItem(id, e)
                                        }
                                    >
                                        <FavoriteIcon color="primary" />
                                    </IconButton>
                                )}
                            </Stack>
                        )} */}

                        <Stack
                            position="absolute"
                            bottom="10%"
                            left="0"
                            zIndex="1"
                        >

                            {handleBadge(
                                product,
                                currencySymbol,
                                currencySymbolDirection,
                                digitAfterDecimalPoint,
                                available_date_ends
                            )}

                        </Stack>
                        {(isRestaurantDetails && isSmall && product?.avg_rating !== 0) && <Stack
                            position="absolute"
                            top="5%"
                            right="5%"
                            zIndex="1"
                        >

                            <FoodRating product_avg_rating={rating_count} />

                        </Stack>}
                        <CustomOverLay hover={isTransformed} border_radius="10px">
                            <QuickView
                                id={id}
                                isInList={isInList}
                                quickViewHandleClick={onClick}
                                addToWishlistHandler={addToFavorite}
                                removeFromWishlistHandler={deleteWishlistItem}
                                isInCart={isInCart}
                                product={product}
                                getQuantity={getQuantity}
                                handleClickQuantityButton={
                                    handleClickQuantityButton
                                }
                                setIncrOpen={setIncrOpen}
                                incrOpen={incrOpen}
                                addToCart={addToCart}
                            />
                        </CustomOverLay>
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
                        <Box
                            sx={{
                                transition: `${theme.transitions.create(
                                    ['background-color', 'transform'],
                                    {
                                        duration:
                                            theme.transitions.duration.standard,
                                    }
                                )}`,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <CustomImageContainer
                                src={imageUrl}
                                alt={alt}
                                width="100%"
                                height="170px"
                                borderRadius="8px"
                                objectFit="contained"
                                smHeight="130px"
                            />
                        </Box>
                        {
                        product.free_delivery === 1 &&
                            <CustomStackForFoodModal
                                padding="12px"
                                direction="row"
                                width="100%"
                                right='0'
                                spacing={1}
                                justifyContent="flex-end"
                                alignItems="flex-end"

                            >
                                <Typography
                                    fontSize="12px"

                                    color={theme.palette.whiteContainer.main}
                                >
                                    {t('Free Delivery')}
                                </Typography>
                            </CustomStackForFoodModal>
                        }
                    </Box>
                </Stack>
            )}
        </>
    )
}

export default ProductCardMedia
