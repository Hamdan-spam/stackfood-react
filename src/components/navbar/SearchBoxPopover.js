import React from 'react'
import { Stack } from '@mui/system'
import HeroSectionWithSearch from '../home/hero-section-with-search'

const SearchBoxPopover = (props) => {
    const { anchorEl, onClose, open, searchRef, query } = props

    return (
        <Stack
            ref={searchRef}
            width="100%"
            sx={{
                position: 'absolute',
                top: '60px',
                left: 'unset',
                right: '50%',
                transform: 'translateX(50%)',
                background: (theme) => theme.palette.background.paper,
                animation: 'fadeIn .4s',
                '@keyframes fadeIn ': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(50%)translateY(-10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(50%)translateY(0)',
                    },
                },
            }}
        >
            <HeroSectionWithSearch query={query} />
        </Stack>
    )
}

export default SearchBoxPopover
