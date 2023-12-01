import { Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CustomImageContainer from '../CustomImageContainer'
import { CustomColouredPaper, FeatureImageBox } from './FeaturedCategory.style'
import Router, { useRouter } from 'next/router'
import { Box } from '@mui/system'

const FeaturedCategoryCard = ({
    categoryImage,
    name,
    id,
    categoryImageUrl,
    height, categoryIsSticky
}) => {
    const theme = useTheme()
    const router = useRouter()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const image = `${categoryImageUrl}/${categoryImage}`
    const handleClick = () => {
        Router.push(
            {
                pathname: `/category/${id}`,
                query: { name: name },
            },
            undefined,
            { shallow: true }
        )
    }
    return (
        <Grid item sx={{ overflow: 'hidden' }} onClick={handleClick}>
            <FeatureImageBox
                justifyContent="center"
                alignItems="center"
                spacing={{xs:.5,md:1}}

            >
                <Box
                    sx={{
                      height:{xs:"55px",md:categoryIsSticky?"50px":"100px"},
                      display:"flex",
                        maxWidth:"100px",
                      border:"1px solid",
                        borderColor:theme=>theme.palette.neutral[200],
                      borderRadius:"32px",
                        transition: `all ease 0.5s`,
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                        animation : 'fadeInRight 2s  1'
                    }}
                >
                    <CustomImageContainer
                        src={image}
                        alt={name}
                        height="100%"

                        width="100%"
                        objectFit="cover"
                        smMb="5px"
                        smHeight="100%"
                        smMaxWidth="55px"
                        cursor="pointer"
                        borderRadius="32px"
                    />
                </Box>
                <Typography
                    sx={{
                        color: (theme) => theme.palette.neutral[1200],
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                    }}
                    fontSize={{ xs: '13px', sm: '14px', md:"14px" }}
                    fontWeight="400"
                >
                    {name}
                </Typography>
            </FeatureImageBox>
        </Grid>
    )
}

export default FeaturedCategoryCard
