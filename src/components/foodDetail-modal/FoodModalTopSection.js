import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@mui/material/styles'
import { CustomStackForFoodModal } from './FoodModalStyle'
import { CustomFavICon } from '../food-card/FoodCard.style'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FoodRating from '../food-card/FoodRating'
import { useRouter } from 'next/router'
import Link from 'next/link'
const FoodModalTopSection = ({
    product,
    image,
    handleModalClose,
    isInList,
    addToFavorite,
    deleteWishlistItem,
}) => {
    const router = useRouter()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const theme = useTheme()
    const starColor = theme.palette.neutral[100]
    const handleClick = () => {
        router.push(`/restaurant/${product?.restaurant_id}`)
        handleModalClose()
    }
    return (
        <CustomStackFullWidth sx={{ position: 'relative' }}>
            <button onClick={handleModalClose} className="closebtn">
                <CloseIcon sx={{ fontSize: '16px' }} />
            </button>
            <CustomImageContainer
                src={image}
                width="100%"
                height="167px"
                borderRadius="10px"
                objectFit="cover"
            />
            <CustomStackForFoodModal width="100%" spacing={2}>
                <Stack
                    spacing={1.4}
                    alignItems={languageDirection === 'rtl' ? 'end' : 'start'}
                >
                    {!product?.available_date_ends && (
                        <FoodRating product_avg_rating={product?.avg_rating} />
                    )}
                    {router.pathname !== `/restaurant/[id]` ? (
                        <Typography
                            sx={{ cursor: 'pointer' }}
                            fontSize="14px"
                            fontWeight="400"
                            color={theme.palette.whiteContainer.main}
                            onClick={handleClick}
                        >
                            {product?.restaurant_name}
                        </Typography>
                    ) : (
                        <Typography
                            fontSize="14px"
                            fontWeight="400"
                            color={theme.palette.whiteContainer.main}
                        >
                            {product?.restaurant_name}
                        </Typography>
                    )}
                </Stack>
                {!product?.available_date_ends && (
                    <>
                        {!isInList(product.id) ? (
                            <CustomFavICon
                                languageDirection={languageDirection}
                            >
                                <IconButton onClick={addToFavorite}>
                                    <FavoriteBorderIcon color="primary" />
                                </IconButton>
                            </CustomFavICon>
                        ) : (
                            <CustomFavICon
                                languageDirection={languageDirection}
                            >
                                <IconButton
                                    onClick={() =>
                                        deleteWishlistItem(product.id)
                                    }
                                >
                                    <FavoriteIcon color="primary" />
                                </IconButton>
                            </CustomFavICon>
                        )}
                    </>
                )}
            </CustomStackForFoodModal>
        </CustomStackFullWidth>
    )
}

export default FoodModalTopSection
