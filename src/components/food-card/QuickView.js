import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { IconButton, Tooltip, styled, useTheme } from '@mui/material';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { t } from 'i18next';
import AfterAddToCart from './AfterAddToCart';
import FavoriteIcon from "@mui/icons-material/Favorite";

const PrimaryToolTip = ({ theme, children, text }) => {
    return (
        <Tooltip
            title={t(text)}
            arrow
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: theme.palette.primary.main,
                        "& .MuiTooltip-arrow": {
                            color: theme.palette.primary.main,
                        },
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(2px)",
    borderRadius: "4px",
    padding: "4px",
    color: theme.palette.whiteContainer.main,
    height: "36px",
    width: "36px",
    marginInlineEnd: "6px",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        border: `0.5px solid ${theme.palette.neutral[100]}`,
    },
}));

const QuickView = (props) => {
    const {
        id,
        isInList,
        quickViewHandleClick,
        noQuickview,
        noWishlist,
        addToWishlistHandler,
        removeFromWishlistHandler,
        isInCart,
        product,
        getQuantity,
        handleClickQuantityButton,
        setIncrOpen,
        incrOpen,
        addToCart
    } = props;
    const theme = useTheme();
    return (
        <CustomStackFullWidth
            direction="row"
            alignItems="center"
            justifyContent="center"
            height="100%"
        >
            {!noQuickview && (
                <PrimaryToolTip theme={theme} text="Quick View">
                    <IconButtonStyled onClick={(e) => quickViewHandleClick(e)}>
                        <RemoveRedEyeIcon />
                    </IconButtonStyled>
                </PrimaryToolTip>
            )}
            {!noWishlist && (
                <>
                    {isInList(id) ? (
                        <PrimaryToolTip theme={theme} text="Remove from wishlist">
                            <IconButtonStyled onClick={(e) => removeFromWishlistHandler(id, e)}>
                                <FavoriteIcon />
                            </IconButtonStyled>
                        </PrimaryToolTip>
                    ) : (
                        <PrimaryToolTip theme={theme} text="Add to wishlist">
                            <IconButtonStyled onClick={(e) => addToWishlistHandler(e)}>
                                <FavoriteBorderIcon />
                            </IconButtonStyled>
                        </PrimaryToolTip>
                    )}
                </>
            )}

            {!isInCart ? (
                <PrimaryToolTip theme={theme} text="Add to cart">
                    <IconButtonStyled onClick={(e) => addToCart(e)}>
                        <AddShoppingCartIcon />
                    </IconButtonStyled>
                </PrimaryToolTip>
            ) : (
                <AfterAddToCart
                    isInCart={isInCart}
                    product={product}
                    getQuantity={getQuantity}
                    handleClickQuantityButton={
                        handleClickQuantityButton
                    }
                    setIncrOpen={setIncrOpen}
                    incrOpen={incrOpen}
                />
            )}
        </CustomStackFullWidth>
    )
}

export default QuickView