import { alpha, Button, Paper, styled } from '@mui/material'
import { Stack } from '@mui/system'

export const CustomColouredPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    maxWidth: '120px',
    width: '100%',
    minHeight: '120px',
    height: '100%',
    borderRadius: '20px',
    padding: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderRadius: '10px',
        minHeight: '40px',
    },
    '&:hover': {
        boxShadow: `0px 0px 10px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
        // color: 'red',
    },
}))

export const FeatureImageBox = styled(Stack)(({ theme }) => ({
    width: '100%',
    paddingTop: '10px',
    borderRadius: '32px',
    [theme.breakpoints.down('md')]: {
        paddingTop: '2px',
        //backgroundColor: theme.palette.secondary.main,
    },

    //filter: 'drop-shadow(0px 2px 5px rgba(255, 138, 0, 0.3))',
}))
