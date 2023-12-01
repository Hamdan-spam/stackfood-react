import React from 'react'
import {
    alpha,
    Box,
    Button,
    Card,
    Grid,
    Stack,
    styled,
    Typography,
} from '@mui/material'
import VirtaulRestaurant from '../../../../public/static/Waiters-pana 1.svg'
import DeliveryMan from '../../../../public/static/Take Away-rafiki 1.svg'
import Waves from '../Waves'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { CustomCard, PrimaryButton } from './Linksection.style'
import CustomContainer from '../../container'
import bg from '../../../../public/static/join.png'
import { useTheme } from '@mui/material/styles'
import bg1 from '../../../../public/static/deliveryjoin.svg'
import CustomImageContainer from '../../CustomImageContainer'

const LinkSection = (props) => {
    const {
        self_registration_restaurant,
        self_registration_deliveryMan,
        restaurant_registration_image_url,
        deliveryman_registration_image_url,
    } = props

    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const router = useRouter()
    const deliveryManRegister = () => {
        const delivery_section_link =
            self_registration_deliveryMan?.react_delivery_section_link_data
                ?.react_delivery_section_link
        window.open(`${delivery_section_link}`)
    }
    const RestaurantRegister = () => {
        const restaurant_section_link =
            self_registration_restaurant?.react_restaurant_section_link_data
                ?.react_restaurant_section_link
        window.open(`${restaurant_section_link}`)
    }

    return (
        <>
            <CustomContainer mt="70px">
                <Grid
                    container
                    spacing={2}
                    className="link-section"
                    sx={{ my: 1 }}
                >
                    <Grid item xs={12} sm={12} md={6}>
                        <CustomCard
                            sx={{
                                background: `url(${
                                    bg.src
                                }) no-repeat center center/cover ,${alpha(
                                    theme.palette.primary.light,
                                    0.07
                                )}`,
                            }}
                        >
                            <Stack
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={{ xs: 0.5, sm: 2, md: 2 }}
                                direction="row"
                                height="100%"
                                padding={{ xs: '10px', sm: '1rem', md: '1rem' }}
                            >
                                <CustomImageContainer
                                    src={`${restaurant_registration_image_url}/${self_registration_restaurant?.react_restaurant_section_image}`}
                                    alt="icon"
                                    maxWidth="150px"
                                    smMaxWidth="75px"
                                    height="150px"
                                    mdHeight="130px"
                                    smHeight="80px"
                                    objectFit="contain"
                                />
                                <Stack>
                                    <Typography
                                        fontSize={{
                                            xs: '12px',
                                            sm: '18px',
                                            md: '18px',
                                        }}
                                        fontWeight="600"
                                        textAlign="left"
                                    >
                                        {
                                            self_registration_restaurant?.react_restaurant_section_title
                                        }
                                    </Typography>
                                    <Typography
                                        fontSize={{
                                            xs: '10px',
                                            sm: '14px',
                                            md: '14px',
                                        }}
                                        textAlign="left"
                                        color={theme.palette.neutral[600]}
                                    >
                                        {
                                            self_registration_restaurant?.react_restaurant_section_sub_title
                                        }
                                    </Typography>
                                </Stack>
                                {self_registration_restaurant
                                    ?.react_restaurant_section_link_data
                                    ?.react_restaurant_section_button_status ===
                                    '1' && (
                                    <PrimaryButton
                                        onClick={RestaurantRegister}
                                        sx={{
                                            borderRadius: '40px',
                                            paddingY: {
                                                xs: '5px',
                                                sm: '10px',
                                                md: '10px',
                                            },
                                            paddingX: {
                                                xs: '10px',
                                                sm: '30px',
                                                md: '35px',
                                            },
                                            marginLeft: '0px',
                                        }}
                                    >
                                        <Typography
                                            fontSize={{
                                                xs: '12px',
                                                sm: '14px',
                                                md: '16px',
                                            }}
                                            fontWeight="500"
                                            color={
                                                theme.palette.whiteContainer
                                                    .main
                                            }
                                        >
                                            {
                                                self_registration_restaurant?.react_restaurant_section_button_name
                                            }
                                        </Typography>
                                    </PrimaryButton>
                                )}
                            </Stack>
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CustomCard
                            elevation={0}
                            sx={{
                                background: `url(${
                                    bg.src
                                }) no-repeat center center/cover ,${alpha(
                                    theme.palette.primary.light,
                                    0.07
                                )}`,
                            }}
                        >
                            <Stack
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={{ xs: 0.5, sm: 2, md: 2 }}
                                direction="row"
                                height="100%"
                                padding={{ xs: '10px', sm: '1rem', md: '1rem' }}
                            >
                                <CustomImageContainer
                                    src={`${deliveryman_registration_image_url}/${self_registration_deliveryMan?.react_delivery_section_image}`}
                                    alt="icon"
                                    maxWidth="150px"
                                    smMaxWidth="75px"
                                    height="150px"
                                    mdHeight="130px"
                                    smHeight="80px"
                                    objectFit="contain"
                                />
                                <Stack>
                                    <Typography
                                        fontSize={{
                                            xs: '12px',
                                            sm: '18px',
                                            md: '18px',
                                        }}
                                        fontWeight="600"
                                        textAlign="left"
                                    >
                                        {
                                            self_registration_deliveryMan?.react_delivery_section_title
                                        }
                                    </Typography>
                                    <Typography
                                        fontSize={{
                                            xs: '10px',
                                            sm: '14px',
                                            md: '14px',
                                        }}
                                        textAlign="left"
                                        color={theme.palette.neutral[600]}
                                    >
                                        {
                                            self_registration_deliveryMan?.react_delivery_section_sub_title
                                        }
                                    </Typography>
                                </Stack>
                                {self_registration_deliveryMan
                                    ?.react_delivery_section_link_data
                                    ?.react_delivery_section_button_status ===
                                    '1' && (
                                    <PrimaryButton
                                        onClick={deliveryManRegister}
                                        sx={{
                                            borderRadius: '40px',
                                            paddingY: {
                                                xs: '5px',
                                                sm: '10px',
                                                md: '10px',
                                            },
                                            paddingX: {
                                                xs: '10px',
                                                sm: '30px',
                                                md: '35px',
                                            },
                                            marginLeft: '0px',
                                        }}
                                    >
                                        <Typography
                                            fontSize={{
                                                xs: '12px',
                                                sm: '14px',
                                                md: '16px',
                                            }}
                                            fontWeight="500"
                                            color={
                                                theme.palette.whiteContainer
                                                    .main
                                            }
                                        >
                                            {' '}
                                            {
                                                self_registration_deliveryMan?.react_delivery_section_button_name
                                            }
                                        </Typography>
                                    </PrimaryButton>
                                )}
                            </Stack>
                        </CustomCard>
                    </Grid>
                </Grid>
            </CustomContainer>
        </>
    )
}

export default LinkSection
