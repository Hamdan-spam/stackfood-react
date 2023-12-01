import { Box } from '@mui/material'
import React from 'react'
import HeroLocationForm from './HeroLocationForm'

const HeroSectionSm = (props) => {
    return (
        <>
            <Box {...props}>
                <HeroLocationForm handleModalClose={props.handleModalClose} />
            </Box>
        </>
    )
}

export default HeroSectionSm
