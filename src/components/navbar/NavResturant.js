import React, { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import {
    alpha,
    Button,
    Grid,
    Menu,
    MenuItem,
    Popover,
    Stack,
    Typography,
} from '@mui/material'
import nodata from '../../../public/static/nodata.png'
import Fade from '@mui/material/Fade'
import ResOffer from '../../../public/static/Menu/resturant.png'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { useTheme } from '@mui/material/styles'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { NavMenuLink } from './Navbar.style'
import { useTranslation } from 'react-i18next'
import ResShimmer from './ResShimmer'
import CustomImageContainer from '../CustomImageContainer'
import { RTL } from '../RTL/RTL'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { onErrorResponse } from '../ErrorResponse'
import {
    setPopularFood,
    setPopularRestaurants,
} from '../../redux/slices/storedData'
import { makeStyles } from '@mui/styles'
import { noRestaurantsImage } from '../../utils/LocalImages'
const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        pointerEvents: 'auto',
    },
}))
const NavResturant = ({ zoneid }) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const router = useRouter()
    const theme = useTheme()
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const { popularRestaurants } = useSelector((state) => state.storedData)
    const [resdropdown, setResdropdown] = useState(null)
    const openresdrop = Boolean(resdropdown)

    const restuarantImageUrl = `${global?.base_urls?.restaurant_image_url}`

    const {
        isLoading: vegLoading,
        data: popularRestaurant,
        isError: vegIsError,
        error: vegError,
        refetch: restaurantApiRefetch,
    } = useQuery(
        ['restaurants/popular'],
        () => RestaurantsApi?.popularRestaurants(),
        {
            enabled: false,
            staleTime: 1000 * 60 * 8,
            onError: onErrorResponse,
            cacheTime: 8 * 60 * 1000,
        }
    )
    useEffect(() => {
        if (zoneid) {
            if (popularRestaurants?.length === 0) {
                restaurantApiRefetch()
            }
        }
    }, [zoneid])
    useEffect(() => {
        if (popularRestaurant) {
            dispatch(setPopularRestaurants(popularRestaurant?.data))
        }
    }, [popularRestaurant])

    const handleresdropClick = (event) => {
        setResdropdown(event.currentTarget)
    }
    const handleResdropClose = () => {
        setResdropdown(null)
    }
    const viewAll = () => {
        Router.push(
            {
                pathname: '/restaurant',
            },
            undefined,
            { shallow: true }
        )
    }
    const languageDirection = localStorage.getItem('direction')

    return (
        <div
            onMouseEnter={(e) => handleresdropClick(e)}
            onMouseLeave={handleResdropClose}
        >
            <NavMenuLink
                id="fade-button"
                aria-controls={openresdrop ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openresdrop ? 'true' : undefined}
                underline="none"
            >
                <Typography fontSize="14px">
                    {t('Restaurants')}{' '}
                    <KeyboardArrowDownIcon
                        style={{ width: '16px', marginLeft: '5px' }}
                    />
                </Typography>
            </NavMenuLink>
            <RTL direction={languageDirection}>
                <Popover
                    disableScrollLock={true}
                    id="mouse-over-popover"
                    open={openresdrop}
                    anchorEl={resdropdown}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal:
                            languageDirection === 'rtl' ? 'right' : 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal:
                            languageDirection === 'rtl' ? 'right' : 'left',
                    }}
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    <Grid container spacing={3} p="1rem" width="750px">
                        {popularRestaurants && (
                            <Grid item container md={8} spacing={1}>
                                {popularRestaurants
                                    ?.slice(0, 8)
                                    ?.map((restaurant, index) => {
                                        const restaurantIdOrSlug =
                                            restaurant?.slug
                                                ? restaurant?.slug
                                                : restaurant?.id
                                        return (
                                            <>
                                                {index % 2 === 0 ? (
                                                    <Grid
                                                        item
                                                        md={6}
                                                        key={restaurant.id}
                                                    >
                                                        <Link
                                                            href={{
                                                                pathname:
                                                                    '/restaurant/[id]',
                                                                query: {
                                                                    id: `${restaurantIdOrSlug}`,
                                                                    restaurant_zone_id:
                                                                        restaurant?.zone_id,
                                                                },
                                                            }}
                                                            //href={`/restaurant/${restaurantIdOrSlug}`}
                                                            passHref
                                                        >
                                                            <MenuItem
                                                                onClick={
                                                                    handleResdropClose
                                                                }
                                                                sx={{
                                                                    alignItems:
                                                                        'center',
                                                                    borderRadius:
                                                                        '5px',
                                                                    '&:hover': {
                                                                        backgroundColor:
                                                                            (
                                                                                theme
                                                                            ) =>
                                                                                alpha(
                                                                                    theme
                                                                                        .palette
                                                                                        .primary
                                                                                        .main,
                                                                                    0.3
                                                                                ),
                                                                    },
                                                                }}
                                                            >
                                                                <Stack
                                                                    spacing={
                                                                        2.5
                                                                    }
                                                                    direction="row"
                                                                    alignItems="center"
                                                                >
                                                                    <CustomImageContainer
                                                                        src={`${restuarantImageUrl}/${restaurant.logo}`}
                                                                        width="40px"
                                                                        height="40px"
                                                                        borderRadius=".4rem"
                                                                        loading="lazy"
                                                                        objectFit="cover"
                                                                    />
                                                                    <Typography
                                                                        variant="h5"
                                                                        fontWeight="400"
                                                                        color={(
                                                                            theme
                                                                        ) =>
                                                                            theme
                                                                                .palette
                                                                                .neutral[1000]
                                                                        }
                                                                    >
                                                                        {
                                                                            restaurant.name
                                                                        }
                                                                    </Typography>
                                                                </Stack>
                                                            </MenuItem>
                                                        </Link>
                                                    </Grid>
                                                ) : (
                                                    <Grid
                                                        item
                                                        md={6}
                                                        key={restaurant.id}
                                                    >
                                                        <Link
                                                            href={`/restaurant/${restaurantIdOrSlug}`}
                                                            passHref
                                                        >
                                                            <MenuItem
                                                                onClick={
                                                                    handleResdropClose
                                                                }
                                                                sx={{
                                                                    alignItems:
                                                                        'center',
                                                                    borderRadius:
                                                                        '5px',
                                                                    '&:hover': {
                                                                        backgroundColor:
                                                                            (
                                                                                theme
                                                                            ) =>
                                                                                alpha(
                                                                                    theme
                                                                                        .palette
                                                                                        .primary
                                                                                        .main,
                                                                                    0.3
                                                                                ),
                                                                    },
                                                                }}
                                                            >
                                                                <Stack
                                                                    spacing={
                                                                        2.5
                                                                    }
                                                                    direction="row"
                                                                    alignItems="center"
                                                                >
                                                                    <CustomImageContainer
                                                                        src={`${restuarantImageUrl}/${restaurant.logo}`}
                                                                        width="40px"
                                                                        height="40px"
                                                                        borderRadius=".4rem"
                                                                        loading="lazy"
                                                                        objectFit="cover"
                                                                    />
                                                                    <Typography
                                                                        variant="h5"
                                                                        fontWeight="400"
                                                                        color={(
                                                                            theme
                                                                        ) =>
                                                                            theme
                                                                                .palette
                                                                                .neutral[1000]
                                                                        }
                                                                    >
                                                                        {
                                                                            restaurant.name
                                                                        }
                                                                    </Typography>
                                                                </Stack>
                                                            </MenuItem>
                                                        </Link>
                                                    </Grid>
                                                )}
                                            </>
                                        )
                                    })}
                            </Grid>
                        )}

                        <Grid item md={4}>
                            <Button
                                sx={{
                                    zIndex: 1,
                                    position: 'absolute',
                                    bottom: '20%',
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        `${theme.palette.neutral[100]} !important`,
                                    right: '11%',
                                    padding: '9px 25px',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        background: (theme) =>
                                            theme.palette.primary.dark,
                                    },
                                }}
                                size="medium"
                                onClick={viewAll}
                            >
                                {t('View all')}
                            </Button>
                            <CustomImageContainer
                                src={ResOffer.src}
                                alt="restaurant-image"
                                borderRadius=".6rem"
                                height="202px"
                                width="225px"
                            />
                        </Grid>
                        {popularRestaurants?.length === 0 && (
                            <Grid item md={8}>
                                <CustomEmptyResult
                                    image={noRestaurantsImage}
                                    label="No restaurant found"
                                />
                            </Grid>
                        )}
                    </Grid>
                </Popover>
            </RTL>
        </div>
    )
}

export default NavResturant
