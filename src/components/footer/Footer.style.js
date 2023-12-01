import { Paper, styled } from '@mui/material'
import { Box } from '@mui/system'
import footerBg from './footerBg.svg'
export const StyledFooterBackground = styled(Box)(({ theme, router }) => ({


    width: '100%',
    backgroundColor:"#141313",
    [theme.breakpoints.down('md')]: {
        marginBottom: router !== '/' && '4.5rem',
    },
}))
