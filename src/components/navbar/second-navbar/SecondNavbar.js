import React, { useEffect, useRef, useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { alpha, Avatar, Box, ButtonBase, NoSsr, Stack } from "@mui/material";
import DrawerMenu from '../DrawerMenu'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { setGlobalSettings } from '../../../redux/slices/global'
import LogoSide from './LogoSide'
import NavLinks from './NavLinks'
import Wishlist from './Wishlist'
import CustomContainer from '../../container'
import AddressReselect from '../top-navbar/address-reselect/AddressReselect'
import { SignInButton } from '../../../styled-components/CustomButtons.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LockIcon from '@mui/icons-material/Lock'
import AuthModal from '../../auth'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import { AccountPopover } from '../AccountPopover'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { CustomNavSearchIcon, LefRightBorderBox } from "../Navbar.style";
import SearchBoxPopover from '../SearchBoxPopover'
import { onSingleErrorResponse } from '../../ErrorResponse'
import { RTL } from '../../RTL/RTL'
import { useSettings } from '../../../contexts/use-settings'
import ThemeSwitches from '../top-navbar/ThemeSwitches'
import CustomLanguage from '../../CustomLanguage'
import useGetAllCartList from "../../../hooks/react-query/add-cart/useGetAllCartList";

import { getGuestId } from "../../checkout-page/functions/getGuestUserId";
import { cart } from "../../../redux/slices/cart";
import {
    calculateItemBasePrice,
    getConvertDiscount,
    handleProductValueWithOutDiscount
} from "../../../utils/customFunctions";
import { setOfflineWithPartials } from "../../../redux/slices/OfflinePayment";
import ManageSearch from "./ManageSearch";
import SearchBox from "../../home/hero-section-with-search/SearchBox";
import { styled } from "@mui/system";


export const getSelectedAddons = (addon) => {
    return addon?.filter((item) => {
        return item?.isChecked !== undefined && item?.isChecked !== false;
    });
};
export const getSelectedVariations = (variations) => {
    let selectedItem = [];
    if (variations?.length > 0) {
        variations?.forEach((item, index) => {
            item?.values?.forEach((value, optionIndex) => {
                if (value?.isSelected) {
                    const itemObj = {
                        choiceIndex: index,
                        isSelected: value?.isSelected,
                        label: value?.label,
                        optionIndex: optionIndex,
                        optionPrice: value?.optionPrice,
                        // type:item?.
                    };
                    selectedItem.push(itemObj);
                }
            });
        });
    }
    return selectedItem;
};


export const CustomNavBox = styled(Box)(({ theme,isSticky }) => ({
    //  transition:"all ease 0.25s",
    // transform:isSticky && "translateY(-100%)",
    // visibility:isSticky?'hidden':'visible',
    // opacity:isSticky?'0':'1',
    display:isSticky?'visible':'hidden',
    background: theme.palette.navbarBg,
    boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.05)",

}))
const SecondNavbar = ({isSticky}) => {
    const [modalFor, setModalFor] = useState('sign-in')
    const [openSearchBox, setOpenSearchBox] = useState(false)
    const [authModalOpen, setOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [openPopover, setOpenPopover] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.userToken)
    const { t } = useTranslation()
    const router = useRouter()
    const { query } = router.query
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const searchRef = useRef(null)
    const [theme_mode, setThemeMode] = useState('')
    const { countryCode, language } = useSelector(
        (state) => state.languageChange
    )
    const businessLogo = global?.fav_icon
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    const changeThemeMode = (e) => {
        if (theme_mode === 'dark') {
            localStorage.setItem('mode', 'light')
        } else {
            localStorage.setItem('mode', 'dark')
        }
        window.location.reload()
    }

    //SEARCH BOX OPEN//

    const handleOpenPopover = () => {
        setOpenPopover(true)
        setModalFor('sign-in')
    }
    const handleSearchBoxOpen = () => {
        setOpenSearchBox(!openSearchBox)
    }
    const handleShowSearch = () => {
        if (router.pathname === '/home') {
            if (window.scrollY >= 250) {
                setShowSearch(true)
            } else {
                setShowSearch(false)
                setOpenSearchBox(false)
            }
        }
    }
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleShowSearch)
    }

    const handleClickOutside = (event) => {
        setOpenSearchBox(false)
    }

    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => {
        setOpen(false)
        setModalFor('sign-in')
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }


    let zoneid = undefined
    let location = undefined
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
        languageDirection = localStorage.getItem('direction')
        location = localStorage.getItem('location')
    }
    const customerbaseUrl = global?.base_urls?.customer_image_url
    const guestId =getGuestId()
    const handleClick = (value) => {
        router.push({
            pathname: '/info',
            query: {
                page: value,
            },
        })
    }

    const cartListSuccessHandler=(res)=>{
        if(res){
            const setItemIntoCart = () => {
                return res?.map((item) => ({
                    ...item?.item,
                    cartItemId: item?.id,
                    totalPrice:
                        getConvertDiscount(
                            item?.item?.discount,
                            item?.item?.discount_type,
                            handleProductValueWithOutDiscount(item?.item),
                            item?.item?.restaurant_discount
                        )
                        *
                        item?.quantity
                    ,
                    selectedAddons:getSelectedAddons(item?.item?.addons) ,
                    quantity: item?.quantity,
                    variations: item?.item?.variations,
                    itemBasePrice: getConvertDiscount(
                        item?.item?.discount,
                        item?.item?.discount_type,
                        calculateItemBasePrice(item?.item, item?.item?.variations),
                        item?.item?.restaurant_discount
                    ),
                    selectedOptions:getSelectedVariations(item?.item?.variations)
                }));
            };
            dispatch(cart(setItemIntoCart()));
        }
    }

    const {
        data:cartData,
        refetch: cartListRefetch,

    } = useGetAllCartList(guestId,cartListSuccessHandler);
    useEffect(() => {
        cartListRefetch();
    }, [router.pathname]);


    useEffect(() => {
        if(router.pathname!=="/checkout"){
            dispatch(setOfflineWithPartials(false))
        }
    }, []);
    const handleAuthBasedOnRoute = () => {
        return (
            <RTL direction={languageDirection}>
                {!token ? (
                    <Stack direction="row" paddingInline=".5rem">
                        <SignInButton
                            onClick={handleOpenAuthModal}
                            variant="contained"
                        >
                            <CustomStackFullWidth
                                direction={
                                    languageDirection === 'rtl'
                                        ? 'row'
                                        : 'row-reverse'
                                }
                                alignItems="center"
                                spacing={1}
                            >
                                <CustomTypography
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.whiteContainer.main,
                                    }}
                                >
                                    {t('Sign In')}
                                </CustomTypography>
                                <LockIcon fontSize="small" />
                            </CustomStackFullWidth>
                        </SignInButton>
                        <AuthModal
                            cartListRefetch={cartListRefetch}
                            open={authModalOpen}
                            modalFor={modalFor}
                            setModalFor={setModalFor}
                            handleClose={handleCloseAuthModal}
                        />
                    </Stack>
                ) : (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Box
                                align="center"
                                component={ButtonBase}
                                alignItem="center"
                                onClick={() => handleClick('inbox')}
                            >
                                <IconButton>
                                    <ChatIcon
                                        sx={{
                                            height: 25,
                                            width: 25,
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        }}
                                    ></ChatIcon>
                                </IconButton>
                            </Box>
                            {token && !isSmall && (
                              <LefRightBorderBox>
                                  <Wishlist handleClick={handleClick} />
                              </LefRightBorderBox>

                            )}

                            <Box
                                align="center"
                                ml={languageDirection !== 'rtl' && '.9rem'}
                                mr={languageDirection === 'rtl' && '.9rem'}
                                component={ButtonBase}
                                onClick={handleOpenPopover}
                                ref={anchorRef}
                                sx={{paddingInline:"10px"}}
                            >
                                <Avatar
                                    sx={{
                                        height: 30,
                                        width: 30,
                                    }}
                                    src={`${customerbaseUrl}/${userData?.image}`}
                                />
                            </Box>
                        </Stack>
                        <AccountPopover
                            anchorEl={anchorRef.current}
                            onClose={handleClosePopover}
                            open={openPopover}
                            cartListRefetch={cartListRefetch}
                        />
                    </>
                )}
            </RTL>
        )
    }


    return (
        <NoSsr>
            <CustomNavBox isSticky={isSticky}>
                <CustomContainer>
                    <Toolbar  disableGutters={true}>
                        <CustomStackFullWidth
                          direction="row"
                          // alignItems="center"
                          justifyContent="space-between"
                        >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              gap="1rem"
                            >

                                {!isSmall && location && (
                                  <NavLinks
                                    languageDirection={languageDirection}
                                    t={t}
                                    zoneid={zoneid}
                                  />
                                )}
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                            >

                                <Box sx={{minWidth:'450px',marginInlineEnd:"20px"}}>
                                    {router.pathname !== "/" && location &&(
                                      <SearchBox  query={query}/>
                                    )}
                                </Box>

                                <Box
                                  sx={{
                                      display: { xs: 'none', md: 'flex' },
                                      flexGrow: 0,
                                      height: '40px',
                                      alignItems: 'center',
                                  }}
                                >
                                    {handleAuthBasedOnRoute()}
                                </Box>
                                {!isSmall && (
                                  <CustomLanguage
                                    countryCode={countryCode}
                                    language={language}
                                  />
                                )}
                            </Stack>
                        </CustomStackFullWidth>
                    </Toolbar>
                </CustomContainer>
            </CustomNavBox>
        </NoSsr>
    )
}
export default SecondNavbar
