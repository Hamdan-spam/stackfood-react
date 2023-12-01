import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import { ButtonContainer, CustomDrawer, CustomSwitch } from './Navbar.style'
import CollapsableMenu from './CollapsableMenu'
import LockIcon from '@mui/icons-material/Lock'
import {
    alpha,
    Button,
    Container,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'
import AuthModal from '../auth'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'

import { useTranslation } from 'react-i18next'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { RTL } from '../RTL/RTL'
import CustomLanguage from '../CustomLanguage'
import { useGetCuisines } from '../../hooks/react-query/cuisines/useGetCuisines'
import {
    setCuisines,
    setFeaturedCategories,
} from '../../redux/slices/storedData'
import { onErrorResponse } from '../ErrorResponse'
import { removeToken } from '../../redux/slices/userToken'
import { clearWishList } from '../../redux/slices/wishList'
import { setClearCart } from '../../redux/slices/cart'
import { toast } from 'react-hot-toast'
import { logoutSuccessFull } from '../../utils/ToasterMessages'
import ThemeSwitches from './top-navbar/ThemeSwitches'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const DrawerMenu = ({ zoneid }) => {
    const [forSignup, setForSignup] = useState('')
    const [modalFor, setModalFor] = useState('sign-in')
    const { featuredCategories, cuisines } = useSelector(
        (state) => state.storedData
    )
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()
    const [openDrawer, setOpenDrawer] = useState(false)
    const { token } = useSelector((state) => state.userToken)
    const [authModalOpen, setOpen] = useState(false)
    const handleOpenAuthModal = (page) => {
        setModalFor(page)
        setOpen(true)
        setForSignup(page)
    }

    const handleCloseAuthModal = () => {
        setOpen(false)
        setForSignup('sign-in')
    }
    const [theme_mode, setThemeMode] = useState('')
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token')
            dispatch(removeToken())
            setOpenDrawer(false)
            let a = []
            dispatch(clearWishList(a))
            dispatch(setClearCart())
            toast.success(t(logoutSuccessFull))
            if (router.pathname === '/') {
                router.push('/')
            } else {
                router.push('/home')
            }
        } catch (err) {
            //   toast.error('Unable to logout.');
        }
    }

    const toggleDrawer = (openDrawer) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }
        setOpenDrawer(openDrawer)
    }
    const searchKey = ''

    const {
        isLoading,
        data: categoryData,
        isError,
        error,
        refetch: categoryApiRefetch,
    } = useQuery(['category'], () => CategoryApi.categories(searchKey), {
        enabled: false,
        staleTime: 1000 * 60 * 8,
        onError: onErrorResponse,
        cacheTime: 8 * 60 * 1000,
    })
    const {
        isLoading: vegLoading,
        data: popularRestuarants,
        isError: vegIsError,
        error: vegError,
        refetch: restaurantApiRefetch,
    } = useQuery(
        ['restaurants/popular'],
        () => RestaurantsApi?.popularRestaurants(),
        { enabled: false }
    )
    useEffect(() => {
        if (zoneid) {
            if (featuredCategories?.length === 0) {
                categoryApiRefetch()
            }
            restaurantApiRefetch()
        }
    }, [zoneid])

    const { data, refetch, isRefetching } = useGetCuisines()
    useEffect(() => {
        if (cuisines?.length === 0) {
            refetch()
        }
    }, [])

    useEffect(() => {
        if (categoryData) {
            dispatch(setFeaturedCategories(categoryData?.data))
        }
        if (data) {
            dispatch(setCuisines(data?.Cuisines))
        }
    }, [categoryData, data])
    const collapsableMenu = {
        cat: {
            text: 'Categories',
            items: featuredCategories?.map((item) => item),
            path: '/category',
        },
        res: {
            text: 'Restaurants',
            items: popularRestuarants?.data?.map((i) => i),
            path: '/restaurant',
        },
        cuisine: {
            text: 'Cuisines',
            items: cuisines?.map((i) => i),
            path: '/cuisines',
        },
        profile: {
            text: 'Profile',
        },
    }
    let location = undefined
    if (typeof window !== 'undefined') {
        location = localStorage.getItem('location')
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    const changeThemeMode = (e) => {
        if (e.target.checked) {
            localStorage.setItem('mode', 'light')
            setThemeMode('light')
            // saveSettings({ ...values, theme: 'light' })
        } else {
            localStorage.setItem('mode', 'dark')
            setThemeMode('dark')
            // saveSettings({ ...values, theme: 'dark' })
        }
        window.location.reload()
    }
    const handleRoute = (path) => {
        router.push(`/${path}`)
        setOpenDrawer(false)
    }
    const handleRouteToUserInfo = () => {
        Router.push(
            {
                pathname: '/info',
                query: { page: 'profile' },
            },
            undefined,
            { shallow: true }
        )
    }
    const menuList = () => (
        <RTL direction={languageDirection ? languageDirection : 'ltr'}>
            <Box
                sx={{ width: 'auto' }}
                role="presentation"
                onKeyDown={toggleDrawer(false)}
            >
                <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton
                        sx={{
                            marginTop: '20px',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: (theme) =>
                                    theme.palette.whiteContainer.main,
                            },
                        }}
                    >
                        <ListItemText
                            primary={t('Home')}
                            onClick={() => handleRoute('/home')}
                        />
                    </ListItemButton>
                    <CollapsableMenu
                        value={collapsableMenu.cat}
                        setOpenDrawer={setOpenDrawer}
                        toggleDrawers={toggleDrawer}
                        pathName="/categories"
                    />
                    <CollapsableMenu
                        value={collapsableMenu.res}
                        setOpenDrawer={setOpenDrawer}
                        toggleDrawers={toggleDrawer}
                        pathName="/restaurant"
                    />
                    <CollapsableMenu
                        value={collapsableMenu.cuisine}
                        setOpenDrawer={setOpenDrawer}
                        toggleDrawers={toggleDrawer}
                        pathName="/cuisines"
                    />
                    {/*<CollapsableMenu value={collapsableMenu.profile} setOpenDrawer={setOpenDrawer} toggleDrawers={toggleDrawer}/>*/}
                    <ListItemButton
                        sx={{
                            '&:hover': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        <ListItemText
                            primary={t('Profile')}
                            onClick={handleRouteToUserInfo}
                        />
                    </ListItemButton>

                    <ListItemButton
                        sx={{
                            '&:hover': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        <ListItemText
                            primary={t('Terms & Conditions')}
                            onClick={() => handleRoute('terms-and-conditions')}
                        />
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            '&:hover': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        <ListItemText
                            primary={t('Privacy Policy')}
                            onClick={() => handleRoute('privacy-policy')}
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText
                            primary={t('Theme Mode')}
                        />
                        <ThemeSwitches
                            noText
                            checked={theme_mode === 'light'}
                            handleThemeChangeMode={changeThemeMode}
                            themeMode={theme_mode}
                        />
                    </ListItemButton>
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 1 }}
                            onClick={() => handleLogout()}
                        >
                            {t('Logout')}
                        </Button>
                    </ButtonContainer>
                </List>
            </Box>
        </RTL>
    )

    const withOutLogin = () => (
        <RTL direction={languageDirection}>
            <Box
                sx={{ width: 'auto' }}
                role="presentation"
                onKeyDown={toggleDrawer(false)}
            >
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {location && (
                        <>
                            <ListItemButton sx={{ marginTop: '20px' }}>
                                <ListItemText
                                    primary={t('Home')}
                                    onClick={() => handleRoute('/home')}
                                />
                            </ListItemButton>
                            <CollapsableMenu
                                value={collapsableMenu.cat}
                                setOpenDrawer={setOpenDrawer}
                                toggleDrawers={toggleDrawer}
                                pathName="/categories"
                            />
                            <CollapsableMenu
                                value={collapsableMenu.res}
                                setOpenDrawer={setOpenDrawer}
                                toggleDrawers={toggleDrawer}
                                pathName="/restaurant"
                            />
                            <CollapsableMenu
                                value={collapsableMenu.cuisine}
                                setOpenDrawer={setOpenDrawer}
                                toggleDrawers={toggleDrawer}
                                pathName="/cuisines"
                            />
                            <ListItemButton
                                onClick={() =>
                                    handleRoute('terms-and-conditions')
                                }
                            >
                                <ListItemText
                                    primary={t('Terms & Conditions')}
                                />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText
                                    primary={t('Privacy Policy')}
                                    onClick={() =>
                                        handleRoute('privacy-policy')
                                    }
                                />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText
                                    primary={t('Theme Mode')}
                                />
                                <ThemeSwitches
                                    noText
                                    checked={theme_mode === 'light'}
                                    handleThemeChangeMode={changeThemeMode}
                                    themeMode={theme_mode}
                                />
                            </ListItemButton>
                        </>
                    )}
                </List>
                <ButtonContainer>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 0, mb: 1 }}
                        startIcon={<LockIcon />}
                        onClick={() => handleOpenAuthModal('sign-in')}
                    //  onClick={() => setLogin(true)}
                    >
                        {t('Sign In')}
                    </Button>
                </ButtonContainer>
                <Typography align="center" mt="1rem">
                    {t('Don’t have account?')}
                </Typography>
                <ButtonContainer>
                    <Button
                        onClick={() => handleOpenAuthModal('signUp')}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                    >
                        {t('Sign Up')}
                    </Button>
                </ButtonContainer>
            </Box>
        </RTL>
    )

    return (
        <Box>
            {authModalOpen && (
                <AuthModal
                    open={authModalOpen}
                    handleClose={handleCloseAuthModal}
                    forSignup={forSignup}
                    modalFor={modalFor}
                    setModalFor={setModalFor}
                />
            )}
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(!openDrawer)}
                sx={{
                    color: (theme) => theme.palette.primary.main,
                    paddingRight: '0px',
                    paddingLeft: languageDirection === 'rtl' && '0px',
                }}
            >
                <MenuIcon />
            </IconButton>
            <CustomDrawer
                anchor="top"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                {token ? menuList() : withOutLogin()}
            </CustomDrawer>
            {/* <AuthModal/> */}
        </Box>
    )
}

export default DrawerMenu
