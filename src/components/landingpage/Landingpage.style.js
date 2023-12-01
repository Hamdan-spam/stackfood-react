import {
    alpha,
    Button,
    Paper,
    styled,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { CustomButtonPrimary } from '../../styled-components/CustomButtons.style'

export const CustomBox = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
    },
}))
export const CustomSearchField = styled(Paper)(({ theme }) => ({
    width: '100%',
    border: 'none',
    borderBottomRightRadius: '0px',
    borderTopRightRadius: '0px',
    height: '44px',
}))
export const StyledButton = styled(CustomButtonPrimary)(
    ({ theme, radiuschange, languageDirection }) => ({
        color: `${theme.palette.whiteContainer.main} !important`,
        //textColor:'red',
        width: '500px',
        padding: '11px 7px 12px 7px',

        marginLeft: languageDirection === 'rtl' && '15px',
        borderTopLeftRadius:
            (languageDirection === 'ltr' || !languageDirection) &&
            radiuschange === 'true'
                ? '0px'
                : '6px',
        borderBottomLeftRadius:
            (languageDirection === 'ltr' || !languageDirection) &&
            radiuschange === 'true'
                ? '0px'
                : '6px',
        borderTopRightRadius:
            languageDirection === 'rtl' && radiuschange === 'true'
                ? '0px'
                : '6px',
        borderBottomRightRadius:
            languageDirection === 'rtl' && radiuschange === 'true'
                ? '0px'
                : '6px',
    })
)
export const CssTextField = styled(TextField)(
    ({ theme, languageDirection, mobileview }) => ({
        width: '100%',
        '& label.Mui-focused': {
            color: theme.palette.primary.main,
            background: theme.palette.neutral[100],
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.main,
            background: theme.palette.neutral[100],
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border:
                mobileview === 'true'
                    ? `.5px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    : 'none',
        },
        '& .MuiOutlinedInput-root': {
            paddingTop: '0px',
            paddingBottom: '0px',
            borderTopRightRadius:
                mobileview === 'true'
                    ? '5px'
                    : (languageDirection === 'ltr' || !languageDirection) &&
                      '0px',
            borderBottomRightRadius:
                mobileview === 'true'
                    ? '5px'
                    : (languageDirection === 'ltr' || !languageDirection) &&
                      '0px',
            borderTopLeftRadius:
                mobileview === 'true'
                    ? '5px'
                    : languageDirection === 'rtl' && '0px',
            borderBottomLeftRadius:
                mobileview === 'true'
                    ? '5px'
                    : languageDirection === 'rtl' && '0px',
            // border: '2px solid',
            // borderColor: theme.palette.primary.main,
            '& fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
    })
)

export const CustomCardLinkSection = styled(Paper)(({ theme }) => ({
    width: '100%',
    border: 'none',
}))
export const CustomButton = styled(Paper)(({ theme }) => ({
    width: '153px',
    height: '50px',
    borderRadius: '5px',
    overflow: 'hidden',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
        width: '120px',
        height: '40px',
    },
}))
export const HeroCardTypography = styled(Typography)(({ theme, fontsize }) => ({
    textAlign: 'center',
    color: theme.palette.customColor.seven,
    fontWeight: 600,
    letterSpacing: '0.05em',
}))
export const LandingHeroBox = styled(Box)(({ theme, fontsize }) => ({}))
