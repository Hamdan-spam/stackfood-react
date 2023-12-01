import { styled } from '@mui/material/styles'
import { alpha, Chip } from '@mui/material'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { Stack } from '@mui/system'
import { CustomButtonPrimary } from '../../styled-components/CustomButtons.style'
// import {
//     CustomColouredTypography,
//     ImageContainer,
// } from '../../styled-components/CustomStyles.style'

export const CustomCardContent = styled(CardContent)(
    ({ theme, minHeight, minHeightForCustomCard }) => ({
        borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,

        borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        textAlign: 'center',
        padding: '10px',
    })
)

export const CustomCardButton = styled(Button)(({ theme, disabled }) => ({
    background: theme.palette.neutral[100],
}))
export const RestaurantDetailsNavButton = styled(Button)(
    ({
        theme,
        color,
        background,
        languageDirection,
        borderRigthTop,
        borderRightBottom,
        borderLeftBottom,
        borderLeftTop,
    }) => ({
        backgroundColor: background ? theme.palette.primary.main : 'inherit',
        color: background
            ? theme.palette.whiteContainer.main
            : theme.palette.neutral[1000],
        borderRadius: languageDirection !== 'rtl' ? '15px' : '0px',
        borderBottomLeftRadius: borderLeftBottom && borderLeftBottom,

        '&:hover': {
            backgroundColor: background && theme.palette.primary.light,
        },
    })
)
export const FoodTitleTypography = styled(Typography)(
    ({ theme, textAlign, fontWeight }) => ({
        // eslint-disable-next-line no-mixed-operators
        fontSize: '16px',
        fontWeight: fontWeight ? fontWeight : '400',
        padding: 0,
        margin: 0,
        textAlign: textAlign ? textAlign : 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '5px',
        },
    })
)
export const FoodTitleTypographyDetails = styled(Typography)(({ theme }) => ({
    // eslint-disable-next-line no-mixed-operators
    fontSize: '20px',
    padding: 0,
    margin: 0,
    textAlign: 'left',

    [theme.breakpoints.down('md')]: {
        fontSize: '16px',
        padding: 0,
        margin: 0,
    },
}))

export const FoodSubTitleTypography = styled(Typography)(({ theme }) => ({
    // eslint-disable-next-line no-mixed-operators
    fontSize: '14px',
    padding: 0,
    lineHeight: 1.3,
    letterSpacing: '0.00938em',
    fontWeight: '400',

    color: theme.palette.neutral[500],
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
    },
}))

export const CustomFoodCard = styled(Card)(({ theme }) => ({
    // eslint-disable-next-line no-mixed-operators
    borderRadius: '10px',
    position: 'relative',
    margin: '0 auto',
    marginBottom: '10px',
    overflow: 'hidden',
    maxWidth: '230px',
    cursor: 'pointer',
    //height:"100%",
    [theme.breakpoints.down('sm')]: {
        maxWidth: '150px',
        // height:" 351px"
    },
}))
export const CustomFoodCardNew = styled(Card)(
    ({ theme,width, maxwidth, height, smheight, background, horizontal }) => ({
        backgroundColor: background,

        // eslint-disable-next-line no-mixed-operators
        position: 'relative',
        // margin: horizontal ? '10px' : '0 auto',
        padding: '10px',
        overflow: 'hidden',
        width: horizontal ? width : '100%',
        maxWidth: maxwidth,
        cursor: 'pointer',
        borderRadius: horizontal ? '8px' : '15px',
        boxShadow: `0px 0px 2px ${theme.palette.neutral[300]}, 0px 5px 20px ${theme.palette.paperBoxShadow}`,
        // border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        height: height ? height : '100%',
        [theme.breakpoints.down('sm')]: {
            height: smheight ? smheight : '100%',
            padding: '5px',
        },
    })
)

export const CustomMoreButtonContainer = styled(Card)(({ theme }) => ({
    maxWidth: '237px',
    borderRadius: '10px',
    position: 'relative',
    height: '306px',
    textAlign: 'center',
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '150px',
        height: ' 226px',
    },
}))
export const CustomCardMedia = styled(CardMedia)(({ theme, height }) => ({
    height: height,
    [theme.breakpoints.down('sm')]: {
        height: '100px',
    },
}))
export const CustomMoreButton = styled(Card)(({ theme }) => ({
    position: 'absolute',
    color: theme.palette.primary.main,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
}))
export const StyledButton = styled(Button)(({ theme, languageDirection }) => ({
    color: theme.palette.primary.main,
    // borderRadius: '30px 0 0 0 ',
    borderTopLeftRadius: `${languageDirection === 'rtl' ? '0' : '30px'}`,
    borderTopRightRadius: `${languageDirection === 'rtl' ? '30px' : '0'}`,
    borderBottomLeftRadius: `${languageDirection === 'rtl' ? '12px' : '0'}`,
    borderBottomRightRadius: `${languageDirection === 'rtl' ? '0' : '12px'}`,
    // borderTopLeftRadius: '30px',
    // borderTopRightRadius: '0',
    // borderBottomLeftRadius: '0',
    // borderBottomRightRadius: '12px',
    border: `1px solid ${theme.palette.primary.main}`,
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 9,
    right: `${languageDirection === 'rtl' ? '' : 0}`,
    left: `${languageDirection === 'rtl' ? 0 : ''}`,
    bottom: 0,
    // backgroundColor: '#fff',
    '&:hover': {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}))
export const RatingWrapTypography = styled(Typography)(({ theme }) => ({
    // eslint-disable-next-line no-mixed-operators
    fontSize: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 600,
    lineHeight: 'normal',
    // color: 'rgba(0, 0, 0, 0.87)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
}))
export const RatingStarIcon = styled(StarIcon)((color) => ({
    // eslint-disable-next-line no-mixed-operators
    fontSize: '16px',
    // color: color ? color : '',
}))

export const PricingCardActions = styled(CardActions)(
    ({ languageDirection, theme, discount }) => ({
        padding: '8px',
        alignItems: 'flex-end',
        paddingTop: '10px',
        paddingBottom: 0,
        justifyContent: 'center',
        '& .MuiCardActions-root': {
            padding: '0px',
            paddingTop: '12px',
        },
        // justifyContent: languageDirection === 'rtl' ? 'right' : 'left',
        [theme.breakpoints.down('sm')]: {
            padding: '0px',

            alignItems: 'center',
        },
    })
)

export const OfferTypography = styled(Typography)(
    ({ theme, languageDirection }) => ({
        cursor: 'pointer',
        position: 'absolute',
        right: languageDirection === 'rtl' ? '0px' : null,
        background: theme.palette.primary.main,
        color: theme.palette.whiteContainer.main,
        zIndex: 9,
        padding:
            languageDirection === 'rtl'
                ? '10px 15px 10px 22px'
                : '10px 30px 10px 15px ',
        // borderRadius: '10px 0px 50px',
        borderRadius: `${languageDirection === 'rtl' ? '0px 10px 0px 50px' : '10px 0px 50px'
            }`,
        // borderRadius: '0px 10px 0px 50px',
        fontWeight: 500,
        // justifyContent: `${languageDirection === 'rtl' ? 'right' : 'left'}`,
        [theme.breakpoints.down('sm')]: {
            padding: '5px 15px 5px 10px !important',
            fontWeight: 400,
            fontSize: '13px',
        },
    })
)
export const RestaurantDiscountStack = styled(Stack)(
    ({ theme, languageDirection }) => ({
        //maxWidth: '140px',
        width: 'auto',
        position: 'absolute',
        bottom: 0,
        left: 'unset',
        right: 0,

        background: theme.palette.error.pureRed,
        color: theme.palette.whiteContainer.main,
        zIndex: 1,

        padding:
            languageDirection === 'rtl'
                ? '5px 5px 5px 14px'
                : '5px 6px 5px 24px',
        borderRadius:
            languageDirection === 'rtl'
                ? '37px 0px 0px 0px'
                : '38px  0px 0px  0px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    })
)
export const CustomRestaurantCardCoupon = styled(Stack)(
    ({ theme, languageDirection }) => ({
        position: 'absolute',
        bottom: 0,
        left: 'unset',
        right: 0,
        background: theme.palette.error.pureRed,
        color: theme.palette.whiteContainer.main,
        zIndex: 9,
        padding:
            languageDirection === 'rtl'
                ? '5px 5px 5px 14px'
                : '5px 10px 5px 12px',
        borderRadius:
            languageDirection === 'rtl'
                ? '19px 0px 0px 0px'
                : '20px  0px 0px  0px',
        fontWeight: 500,
        fontSize: '13px',

        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    })
)

export const TypographyText = styled(Typography)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
}))
export const StyleThemBox = styled(Box)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' && '#9b9b9b'}`,
}))

export const CatMessageStyle = styled(Box)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    margin: '20px 0',
}))

export const CustomFavButton = styled(Button)(({ theme }) => ({
    background: theme.palette.neutral[300],
    padding: '0px 0px',

    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
    },
}))
export const CustomFavICon = styled(Box)(({ theme, languageDirection }) => ({
    position: 'absolute',
    top: '20px',
    right: languageDirection === 'rtl' ? null : '20px',
    left: languageDirection === 'rtl' ? '20px' : null,
    width: '34px',
    height: '34px',
    background: theme.palette.neutral[100],
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',

    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        top: '10px',
        right: '10px',
    },
}))
export const CustomChip = styled(Chip)(({ theme, background, discount, campaign }) => ({
    height: '22px',
    // alignItems: "center",
    // textAlign: "center",
    // padding: "2px 3px",
    backgroundColor: "unset !important",
    '& .MuiChip-label': {
        backgroundColor: background
            ? background
            : theme.palette.customColor.two,
        color: theme.palette.whiteContainer.main,
        paddingBlockStart: '2px',
        borderRadius: discount ? '0 4px 4px 0' : "6px",
        fontSize: '14px',
        fontWeight: 400,
        paddingInline: '5px',
        //alignItems: 'center',
        marginBottom: 'auto',
        marginTop: 'auto',
    },
}))
