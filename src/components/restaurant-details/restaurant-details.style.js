import { alpha, Button, Chip, Grid, styled, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import discountBanner from '../../../public/static/restaurantDiscountBanner.svg'
import ImageNotFound from '../../../public/static/no-image-found.png'

export const CategoryButton = styled(Button)(({ theme, active }) => ({
    cursor: 'pointer',

    color: theme.palette.customColor.six,
    borderBottom:
        active === 'true' && `3px solid ${theme.palette.primary.main}`,
    minWidth: 'auto',
    borderRadius: '0px',
    //padding: '0px 0px',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
        minWidth: 'auto',
        padding: '8px 10px',
        // height:" 351px"
    },
}))

export const CloseOverlay = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: (theme) => theme.palette.primary.main,
    opacity: '0.5',
    color: 'white',
    height: '100%',
    justifyContent: 'center',
    zIndex: 1,
}))
export const DiscountImageGrid = styled(Grid)(
    ({ theme, discountBanner, ImageNotFound }) => ({
        backgroundImage: `url(${
            discountBanner ? discountBanner.src : ImageNotFound.src
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        //background: 'rgba(75, 86, 107, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        borderRadius: '5px',
        position: 'relative',
        zIndex: 1,
        '&::after': {
            content: '" "',
            position: 'absolute',
            width: '100%',
            height: 'calc(100% - 2px)',
            left: '0',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            zIndex: '-1',
            top: '1px',
        },
    })
)
export const RestaurantCommonTypography = styled(Typography)(
    ({ theme, fontSize, smFontSize, fontWeight }) => ({
        fontSize: fontSize ? fontSize : '1.5rem',
        fontWeight: fontWeight ? fontWeight : '800',
        color: theme.palette.neutral[900],
        [theme.breakpoints.down('md')]: {
            // styles
            fontSize: smFontSize ? smFontSize : '1rem',
        },
    })
)
export const RestaurantStickyBar = styled(Grid)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.borderBottomBg}`,

    background: (theme) => theme.palette.neutral[1800],
    padding: {
        xs: '5px 5px 0px 10px',
        sm: '20px 5px 0px 0px',
        md: '20px 5px 0px 0px',
    },
    zIndex: 999,
    boxShadow: `0px 4px 15px ${alpha(theme.palette.primary.main, 0.1)}`,
}))
export const RestaurantCouponStack = styled(Stack)(({ theme, isSmall }) => ({
    maxWidth: '373px',
    width: '100%',
    position: !isSmall && 'absolute',
    bottom: '2%',
    left: 'unset',
    right: '1%',
    borderRadius: '5px',
    // height:"100%"
}))
export const CouponStack = styled(Stack)(({ theme }) => ({
    background: alpha(theme.palette.neutral[200], 0.9),
    boxShadow: '0px 2px 10px -3px rgba(27, 127, 237, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: '1rem',
    borderRadius: '5px',
    width: '100%',
}))
export const CouponCodeBorderBox = styled(Stack)(({ theme, borderColor }) => ({
    paddingLeft: '14px',
    paddingRight: '14px',
    paddingTop: '18px',
    paddingBottom: '5px',
    border: `1px solid ${borderColor}`,
    minWidth: '111px',
    background: (theme) => theme.palette.neutral[100],
    position: 'relative',
    borderRadius: '5px',
    flexWrap: 'wrap',
}))
