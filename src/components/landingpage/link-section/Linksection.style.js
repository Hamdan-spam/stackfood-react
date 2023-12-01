import { Button, Paper, styled } from '@mui/material'

export const CustomCard = styled(Paper)(({ theme }) => ({
    width:"100%",

    // padding: '1rem',
    height: '100%',
}))


export const PrimaryButton = styled(Button)(({ theme }) => ({
    color: theme.palette.whiteContainer.main,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}))
