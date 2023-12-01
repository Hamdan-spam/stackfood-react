import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import {
    Button,
    Grid,
    ListItemIcon,
    Menu,
    MenuItem,
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
import { useGetCuisines } from '../../hooks/react-query/cuisines/useGetCuisines'
import NavCuisinesList from '../cuisines-page/NavCuisinesList'
import { setCuisines } from '../../redux/slices/storedData'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        pointerEvents: 'auto',
    },
}))
const NavCuisines = ({
    openModal,
    setModal,
    setRestaurantModal,
    languageDirection,
}) => {
    const theme = useTheme()
    const classes = useStyles()
    const { cuisines } = useSelector((state) => state.storedData)
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const cuisinesImageUrl = `${global?.base_urls?.cuisine_image_url}`
    const [anchorEl, setAnchorEl] = useState(null)
    const [enabled, setEnabled] = useState(false)
    const dispatch = useDispatch()
    const opendrop = Boolean(anchorEl)
    const searchKey = ''

    const { data, isLoading, refetch, isRefetching } = useGetCuisines()
    useEffect(() => {
        if (cuisines?.length === 0) {
            refetch()
        }
    }, [])
    // }
    const handledropClick = (event) => {
        setAnchorEl(event.currentTarget)
        setRestaurantModal(false)
    }
    const handledropClose = () => {
        setAnchorEl(null)
    }
    const handleClick = () => {
        router.push('/cuisines')
        handledropClose()
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        if (data) {
            dispatch(setCuisines(data?.Cuisines))
        }
    }, [data])

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
                    {t('Cuisines')}{' '}
                    <KeyboardArrowDownIcon
                        style={{ width: '16px', marginLeft: '5px' }}
                    />
                </Typography>
            </NavMenuLink>
            <Menu
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
                <Stack width="420px">
                    <Grid container p="1rem" spacing={1}>
                        {cuisines?.length > 12 ? (
                            <>
                                {cuisines?.slice(0, 12)?.map((item, index) => {
                                    return (
                                        <>
                                            {index % 2 === 0 ? (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />
                                                </Grid>
                                            ) : (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />{' '}
                                                </Grid>
                                            )}
                                        </>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {cuisines?.map((item, index) => {
                                    return (
                                        <>
                                            {index % 2 === 0 ? (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />
                                                </Grid>
                                            ) : (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />{' '}
                                                </Grid>
                                            )}
                                        </>
                                    )
                                })}
                            </>
                        )}
                    </Grid>
                    {cuisines?.length > 0 && (
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
            </Menu>
        </div>
    )
}

export default NavCuisines
