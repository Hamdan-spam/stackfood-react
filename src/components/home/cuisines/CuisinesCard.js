import React, { useState } from 'react'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import { Stack, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'

const CuisinesCard = ({ item }) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [hover, setHover] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    return (
        <>
            <Link href={`cuisines/${item?.id}?name=${item?.name}`}>
                <Stack sx={{ overflow: 'hidden' }} spacing={1}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        paddingY={{ xs: '5px', md: '12px' }}
                        borderRadius="50%"
                        sx={{
                            transition: `${theme.transitions.create(
                                ['background-color', 'transform'],
                                {
                                    duration:
                                        theme.transitions.duration.standard,
                                }
                            )}`,
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <CustomImageContainer
                            src={`${global?.base_urls?.cuisine_image_url}/${item?.image}`}
                            height="100px"
                            maxWidth="100px"
                            width="100%"
                            borderRadius="50%"
                            objectFit="contained"
                            smMb="5px"
                            smHeight="50px"
                            smMaxWidth="50px"
                            cursor="pointer"
                        />
                    </Stack>{' '}
                    <Typography
                        textAlign="center"
                        fontSize={{ xs: '13px', sm: '14px', md:"14px" }}
                        fontWeight="400"
                        sx={{
                            color: (theme) => theme.palette.neutral[1000],
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {item?.name}
                    </Typography>
                </Stack>
            </Link>
        </>
    )
}

export default CuisinesCard
