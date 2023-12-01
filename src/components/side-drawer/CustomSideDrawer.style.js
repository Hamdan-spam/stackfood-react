import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Drawer } from '@mui/material'

export const CustomDrawerForSideDrawer = styled(Drawer)(({ theme }) => ({
    display: 'flex',
}))

export const SideDrawerWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '18.5rem',
    padding: '15px',
    [theme.breakpoints.up('md')]: {
        width: '25rem',
    },
}))
