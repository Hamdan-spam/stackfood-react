import { AppBar, styled, Typography } from '@mui/material'
import { Stack } from '@mui/system'

export const LocationView = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    flex: '1 0',
    maxWidth: '750px',
    width: '100%',
    background: theme.palette.neutral[100],
    color: theme.palette.neutral[1000],
    top: '15%',
    height: '48px',
    padding: '22px 22px 22px 0px',
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
        top: '22%',
        padding: '0px 0px 0px 20px',
    },
    [theme.breakpoints.down('sm')]: {
        top: '32%',
        padding: '0px 0px 0px 20px',
        fontSize: '12px',
    },
}))
