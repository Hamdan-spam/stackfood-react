import { styled } from '@mui/material/styles'
import { alpha, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ImageNotFound from '../../../public/static/no-image-found.png'

export const LandingPageTypography = styled(Typography)(
    ({ theme, fontWeight, fontSize, color }) => ({
        color: color ? color : theme.palette.neutral[1000],
        fontWeight: fontWeight ? fontWeight : '400',
        fontSize: fontSize ? fontSize : '14px',
        textAlign: 'left',
    })
)
export const LandingPageTypographyWhite = styled(Typography)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' && '#b9b9b9 !important'}`,
}))

export const DiscountBannerBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    padding: '10px',
    //background: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    height: '250px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
        height: '68px',
    },
    '&::after': {
        content: '" "',
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 2px)',
        left: '0',
        backgroundColor: alpha(theme.palette.primary.dark, 0.1),
        zIndex: '-1',
        top: '1px',
    },
}))

export const LandingHeroBox = styled(Box)(
    ({
        theme,
        heroImg,
        banner_section_image_base_url,
        ImageNotFound,
        isXSmall,
    }) => ({
        backgroundImage: `url(${
            heroImg
                ? `${banner_section_image_base_url}/${heroImg}`
                : ImageNotFound.src
        })`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        backgroundPosition: 'center',
        marginInline: isXSmall && '15px',
        borderRadius: isXSmall && '5px',
        paddingTop: isXSmall ? "0px":"83px"
    })
)
