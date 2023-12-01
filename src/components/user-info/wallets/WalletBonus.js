/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Box, Stack, alpha } from '@mui/system'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import img from '../../../../public/static/profile/walletbonus.png'
import { t } from 'i18next'

import useWalletBonus from '../../../hooks/react-query/useGetWalletBonus'
import { getAmount } from '../../../utils/customFunctions'
import { CustomDateFormat } from '../../../utils/CustomDateAndTimeFormat'
const WalletFundBonus = () => {
    const { data, refetch, isLoading } = useWalletBonus()

    useEffect(() => {
        refetch()
    }, [])

    const settings = {
        dots: false,
        //infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        //autoplay: true,
        //speed: 800,
        //autoplaySpeed: 4000,
        //cssEase: "linear",

        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    initialSlide: 1,
                },
            },
        ],
    }

    const valid_till = t('Valid till')
    const you_have_to_add_min = t('You have to add min')
    const fund_to_get_max_of = t('fund to get max of')

    return !isLoading ? (
        <Stack>
            <Slider {...settings}>
                {data?.map((item, i) => (
                    <Box key={i} pr={1.4}>
                        <CustomWalletStack>
                            <Box>
                                <Typography
                                    fontSize={{ xs: '14px', md: '16px' }}
                                    fontWeight="600"
                                >
                                    {item?.title}
                                </Typography>
                                <Typography variant="body2">
                                    {valid_till}{' '}
                                    {CustomDateFormat(item?.end_date)}
                                </Typography>
                                <Typography fontSize="12px">
                                    {you_have_to_add_min}{' '}
                                    {getAmount(item?.minimum_add_amount)}{' '}
                                    {fund_to_get_max_of}{' '}
                                    {getAmount(item?.maximum_bonus_amount)}
                                </Typography>
                            </Box>
                            <Image src={img.src} width="100" height="100" />
                        </CustomWalletStack>
                    </Box>
                ))}
            </Slider>
        </Stack>
    ) : (
        ''
    )
}
const CustomWalletStack = styled(Stack)(({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '25px 0 25px 15px',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0 15px 15px',
    },
    '.MuiBox-root': {
        width: '0',
        flexGrow: '1',
    },
    '.MuiTypography-h6': {
        fontSize: '16px',
        fontWeight: '500',
        color: theme.palette.primary.main,
    },
    '.MuiTypography-body2': {
        display: 'block',
        marginBlock: '10px',
    },
    '.MuiTypography-body1': {
        fontSize: '14px',
        lineHeight: '1.3',
        display: 'block',
        color: theme.palette.primary.main,
    },
}))

export default WalletFundBonus
