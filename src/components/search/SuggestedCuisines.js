import React, { useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import { useGetCuisines } from '../../hooks/react-query/cuisines/useGetCuisines'
import { useSelector } from 'react-redux'
import { t } from 'i18next'

const SuggestedCuisines = ({ routeHandler }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const { cuisines } = useSelector((state) => state.storedData)
    // const { data, refetch } = useGetCuisines()
    // useEffect(async () => {
    //     await refetch()
    // }, [])

    return (
        <>
            {cuisines?.length > 0 && (
                <Stack spacing={2} mt="10px">
                    <Typography variant="h4">{t('Popular Cuisine')}</Typography>
                    <Stack
                        direction="row"
                        justifyContent="start"
                        gap={{ xs: '1rem', sm: '1rem', md: '2rem' }}
                        flexWrap="wrap"
                    >
                        {cuisines &&
                            cuisines?.length > 0 &&
                            cuisines?.map((item, index) => {
                                return (
                                    <Stack
                                        justifyContent="center"
                                        alignItems="center"
                                        key={index}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            routeHandler?.(item?.name)
                                        }
                                    >
                                        <CustomImageContainer
                                            src={`${global?.base_urls?.cuisine_image_url}/${item?.image}`}
                                            width="57px"
                                            height="57px"
                                            borderRadius="50%"
                                            objectFit="cover"
                                        />
                                        <Typography>{item?.name}</Typography>
                                    </Stack>
                                )
                            })}
                    </Stack>
                </Stack>
            )}
        </>
    )
}

export default SuggestedCuisines
