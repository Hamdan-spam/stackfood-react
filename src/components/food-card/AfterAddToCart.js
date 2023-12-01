import React from 'react'
import FoodCardIncrementAndDecrement from './FoodCardIncrementAndDecrement'
import { IconButton } from '@mui/material'
import { Stack } from '@mui/system'

const AfterAddToCart = ({
    incrOpen,
    isInCart,
    getQuantity,
    product,
    setIncrOpen,
    handleClickQuantityButton,
    position,
    addToCartLoading
}) => {
    const handleHover = () => { }

    return (
        <Stack>
            {incrOpen && isInCart && (
                <FoodCardIncrementAndDecrement
                    getQuantity={getQuantity}
                    product={product}
                    setIncrOpen={setIncrOpen}
                    incrOpen={incrOpen}
                    isInCart={isInCart}
                    position={position}
                />
            )}
            {isInCart && !incrOpen && (
                <IconButton
                    onClick={(e) => handleClickQuantityButton(e)}
                    sx={{
                        background: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.whiteContainer.main,
                        fontSize: '14px',
                        fontWeight: '700',
                        width: '36px',
                        height: '36px',
                        borderRadius: '5px',

                        '&:hover': {
                            background: (theme) => theme.palette.primary.dark,
                            color: (theme) => theme.palette.neutral[100],
                        },
                    }}
                >
                    {getQuantity(product?.id)}
                </IconButton>
            )}
        </Stack>
    )
}

export default AfterAddToCart
