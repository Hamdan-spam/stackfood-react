import { styled, Box, Card, alpha } from '@mui/material'

export const WalletBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(180deg, ${alpha(
        theme.palette.primary.main,
        0.8
    )} 0%, ${theme.palette.primary.main} 100%)`,
    borderRadius: '10px',
    padding: '25px',
}))

export const WalletBoxSection = styled(Box)((theme) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    padding: '20px',
    marginTop: '2rem',
}))
