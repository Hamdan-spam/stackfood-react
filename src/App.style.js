import { styled } from '@mui/material'

export const WrapperForApp = styled('div')(({ theme }) => ({
    direction: theme.direction,
    backgroundColor: theme.palette.neutral[1800],
}))
