import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import {
    alpha,
    Button,
    Grid,
    ListItemIcon,
    Menu,
    MenuItem,
    Popover,
    Stack,
    Typography,
} from '@mui/material'

import Fade from '@mui/material/Fade'
import Link from 'next/link'
//import menu from '../../../public/static/Menu/image 18.png'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { NavMenuLink } from './Navbar.style'
import { useTranslation } from 'react-i18next'
import ResShimmer from './ResShimmer'
import { useTheme } from '@mui/material/styles'
import CustomImageContainer from '../CustomImageContainer'
import { CustomTypographyGray } from '../error/Errors.style'
import { onErrorResponse } from '../ErrorResponse'
import { setFeaturedCategories } from '../../redux/slices/storedData'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        pointerEvents: 'auto',
    },
}))
const NavCatagory = ({
    openModal,
    setModal,
    setRestaurantModal,
    languageDirection,
}) => {
    const theme = useTheme()
    const classes = useStyles()
    const { t } = useTranslation()
    // test mneu drop down start
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const { featuredCategories } = useSelector((state) => state.storedData)
    const catImageUrl = `${global?.base_urls?.category_image_url}`
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)

    const opendrop = Boolean(anchorEl)
    const searchKey = ''

    const { data, refetch: refetchCategories } = useQuery(
        ['category'],
        () => CategoryApi.categories(searchKey),
        {
            enabled: false,
            staleTime: 1000 * 60 * 8,
            onError: onErrorResponse,
            cacheTime: 8 * 60 * 1000,
        }
    )
    useEffect(() => {
        if (featuredCategories?.length === 0) {
            refetchCategories()
        }
    }, [])
    useEffect(() => {
        if (data?.data) {
            dispatch(setFeaturedCategories(data?.data))
        }
    }, [data])
    const handledropClick = (event) => {
        setAnchorEl(event.currentTarget)
        setRestaurantModal(false)
    }
    const handledropClose = () => {
        setAnchorEl(null)
    }
    const handleClick = () => {
        router.push('/categories')
        handledropClose()
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div
            onMouseEnter={(e) => handledropClick(e)}
            onMouseLeave={handledropClose}
        >
            <NavMenuLink
                id="fade-button"
                aria-controls={opendrop ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={opendrop ? 'true' : undefined}
                // sx={{ color: 'black',  }}
                // href="#"
                underline="none"
            >
                <Typography fontSize="14px">
                    {t('Categories')}{' '}
                    <KeyboardArrowDownIcon
                        style={{ width: '16px', marginLeft: '5px' }}
                    />
                </Typography>
            </NavMenuLink>
            <Popover
                disableScrollLock={true}
                id="mouse-over-popover"
                open={opendrop}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: languageDirection === 'rtl' ? 'right' : 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: languageDirection === 'rtl' ? 'right' : 'left',
                }}
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
            >
                <Stack width="460px">
                    <Grid container p="1rem" spacing={2}>
                        {featuredCategories?.length > 12 ? (
                            <>
                                {featuredCategories
                                    ?.slice(0, 12)
                                    ?.map((category, index) => {
                                        return (
                                            <>
                                                {index % 2 === 0 ? (
                                                    <Grid
                                                        item
                                                        md={6}
                                                        key={index}
                                                    >
                                                        <Link
                                                            href={{
                                                                pathname: `/category/${category.id}`,
                                                                query: {
                                                                    name: category?.name,
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem
                                                                key={index}
                                                                onClick={
                                                                    handledropClose
                                                                }
                                                                sx={{
                                                                    alignItems:
                                                                        'center',
                                                                    gap: '5px',
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
                                                                <ListItemIcon>
                                                                    <CustomImageContainer
                                                                        src={`${catImageUrl}/${category.image}`}
                                                                        width="35px"
                                                                        height="35px"
                                                                        loading="lazy"
                                                                        objectFit="cover"
                                                                    />
                                                                </ListItemIcon>
                                                                <Typography
                                                                    variant="h5"
                                                                    fontWeight="400"
                                                                    color={
                                                                        theme
                                                                            .palette
                                                                            .neutral[1000]
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Typography>
                                                                <CustomTypographyGray
                                                                    variant="h5"
                                                                    nodefaultfont="true"
                                                                >
                                                                    (
                                                                    {
                                                                        category.products_count
                                                                    }
                                                                    )
                                                                </CustomTypographyGray>
                                                            </MenuItem>
                                                        </Link>
                                                    </Grid>
                                                ) : (
                                                    <Grid
                                                        item
                                                        md={6}
                                                        key={index}
                                                    >
                                                        <Link
                                                            href={{
                                                                pathname: `/category/${category.id}`,
                                                                query: {
                                                                    name: category?.name,
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem
                                                                key={index}
                                                                onClick={
                                                                    handledropClose
                                                                }
                                                                sx={{
                                                                    alignItems:
                                                                        'center',
                                                                    gap: '5px',
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
                                                                <ListItemIcon>
                                                                    <CustomImageContainer
                                                                        src={`${catImageUrl}/${category.image}`}
                                                                        width="35px"
                                                                        height="35px"
                                                                        loading="lazy"
                                                                        objectFit="cover"
                                                                    />
                                                                </ListItemIcon>
                                                                <Typography
                                                                    variant="h5"
                                                                    fontWeight="400"
                                                                    color={
                                                                        theme
                                                                            .palette
                                                                            .neutral[1000]
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Typography>
                                                                <CustomTypographyGray
                                                                    variant="h5"
                                                                    nodefaultfont="true"
                                                                >
                                                                    (
                                                                    {
                                                                        category.products_count
                                                                    }
                                                                    )
                                                                </CustomTypographyGray>
                                                            </MenuItem>
                                                        </Link>
                                                    </Grid>
                                                )}
                                            </>
                                        )
                                    })}
                            </>
                        ) : (
                            <>
                                {featuredCategories?.map((category, index) => {
                                    return (
                                        <>
                                            {index % 2 === 0 ? (
                                                <Grid item md={6} key={index}>
                                                    <Link
                                                        href={{
                                                            pathname: `/category/${category.id}`,
                                                            query: {
                                                                name: category?.name,
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem
                                                            onClick={
                                                                handledropClose
                                                            }
                                                            sx={{
                                                                alignItems:
                                                                    'center',
                                                                gap: '5px',
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
                                                            <ListItemIcon>
                                                                <CustomImageContainer
                                                                    src={`${catImageUrl}/${category.image}`}
                                                                    width="35px"
                                                                    height="35px"
                                                                    loading="lazy"
                                                                    objectFit="cover"
                                                                />
                                                            </ListItemIcon>
                                                            <Typography
                                                                variant="h5"
                                                                fontWeight="400"
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .neutral[1000]
                                                                }
                                                            >
                                                                {category.name}
                                                            </Typography>
                                                            <CustomTypographyGray
                                                                variant="h5"
                                                                nodefaultfont="true"
                                                            >
                                                                (
                                                                {
                                                                    category.products_count
                                                                }
                                                                )
                                                            </CustomTypographyGray>
                                                        </MenuItem>
                                                    </Link>
                                                </Grid>
                                            ) : (
                                                <Grid item md={6} key={index}>
                                                    <Link
                                                        href={{
                                                            pathname: `/category/${category.id}`,
                                                            query: {
                                                                name: category?.name,
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem
                                                            key={index}
                                                            onClick={
                                                                handledropClose
                                                            }
                                                            sx={{
                                                                alignItems:
                                                                    'center',
                                                                gap: '5px',
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
                                                            <ListItemIcon>
                                                                <CustomImageContainer
                                                                    src={`${catImageUrl}/${category.image}`}
                                                                    width="35px"
                                                                    height="35px"
                                                                    loading="lazy"
                                                                    objectFit="cover"
                                                                />
                                                            </ListItemIcon>
                                                            <Typography
                                                                variant="h5"
                                                                fontWeight="400"
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .neutral[1000]
                                                                }
                                                            >
                                                                {category.name}
                                                            </Typography>
                                                            <CustomTypographyGray
                                                                variant="h5"
                                                                nodefaultfont="true"
                                                            >
                                                                (
                                                                {
                                                                    category.products_count
                                                                }
                                                                )
                                                            </CustomTypographyGray>
                                                        </MenuItem>
                                                    </Link>
                                                </Grid>
                                            )}
                                        </>
                                    )
                                })}
                            </>
                        )}
                    </Grid>
                    {featuredCategories?.length > 0 && (
                        <Grid
                            container
                            md={12}
                            justifyContent="center"
                            alignItems="center"
                            p=".8rem"
                        >
                            <Button
                                sx={{
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        `${theme.palette.neutral[100]} !important`,
                                    padding: '9px 25px',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        background: (theme) =>
                                            theme.palette.primary.dark,
                                    },
                                }}
                                size="medium"
                                onClick={handleClick}
                            >
                                {t('View all')}
                            </Button>
                        </Grid>
                    )}
                </Stack>
            </Popover>
        </div>
    )
}

export default NavCatagory
