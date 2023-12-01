import React from 'react'
import CustomContainer from '../../container'
import { Box, Stack } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import ImageNotFound from '../../../../public/static/no-image-found.png'
import heroImg from '../../../../public/static/heroHome.svg'
import SearchSection from './SearchSection'
import FeatureCatagories from '../featured-categories/FeatureCatagories'
import { useSelector } from 'react-redux'
import { alpha } from '@mui/material'

const HeroSectionWithSearch = ({ query, noCategories, page }) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                backgroundColor: `${
                    theme.palette.mode === 'light' &&
                    alpha(theme.palette.primary.light, 0.1)
                }`,
            }}
        >
            <CustomContainer>
                <Stack
                    sx={{
                        backgroundImage: `url(${
                            heroImg ? heroImg.src : ImageNotFound.src
                        })`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        justifyContent: 'center',
                        paddingTop: '50px',
                        paddingBottom: '34px',
                    }}
                    spacing={4}
                >
                    <SearchSection query={query} />
                    {!page && !query && <FeatureCatagories height="70px" />}
                </Stack>
            </CustomContainer>
        </Box>
    )
}

export default HeroSectionWithSearch
