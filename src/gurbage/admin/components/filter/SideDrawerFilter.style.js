import { Stack } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { CustomColouredTypography } from '../../../../styled-components/CustomStyles.style'

export const CustomAppbarFilter = styled(MuiAppBar)(({ theme, loyalty }) => ({
    height: '3.75rem',
    width: '25rem',
    backgroundColor: theme.palette.neutral[200],
    [theme.breakpoints.up('xs')]: {
        width: '17rem',
    },
    [theme.breakpoints.up('sm')]: {
        width: '17rem',
    },
    [theme.breakpoints.up('md')]: {
        width: '25rem',
    },
    [theme.breakpoints.down('sm')]: {
        width: '17rem',
    },
}))

export const CustomButtonContainer = styled(Stack)(({ theme }) => ({
    marginTop: '1rem',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
}))

export const CustomTypographyForSideDrawerFilter = styled(
    CustomColouredTypography
)(({ theme }) => ({
    fontSize: '1.125rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
}))

export const WrapperForSideDrawerFilter = styled(Box)(
    ({ theme, smminwith }) => ({
        paddingTop: '2rem',
        paddingBottom: '2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        minWidth: '250px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            minWidth: smminwith ? smminwith : '180px',
        },
    })
)
