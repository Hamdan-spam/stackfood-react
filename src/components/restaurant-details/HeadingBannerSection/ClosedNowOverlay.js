import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'

const ClosedNowOverlay = (props) => {
    const { t, theme, scrollPosition, isSmall } = props
    return (
        <Stack
            sx={{
                position: 'absolute',
                bottom: isSmall && scrollPosition === 0 && 35,
                left: 0,
                width: '100%',
                background: (theme) => theme.palette.primary.overLay,
                opacity: '0.5',
                color: (theme) => theme.palette.whiteContainer.main,
                padding: '10px',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                zIndex: 99999,
            }}
        >
            <Typography
                variant="h5"
                align="center"
                color={theme.palette.neutral[100]}
            >
                {t('Closed Now')}
            </Typography>
        </Stack>
    )
}

ClosedNowOverlay.propTypes = {}

export default ClosedNowOverlay
