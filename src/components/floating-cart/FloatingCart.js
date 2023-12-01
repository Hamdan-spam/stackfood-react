import React, { useEffect, useState } from 'react'
import {
    alpha,
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    styled,
    Typography,
} from '@mui/material'
import cart from '../../../public/static/bannerslider/cart.png'
import delivery from '../../../public/static/bannerslider/delivery.png'
import Drawer from '@mui/material/Drawer'
import {
    OrderFoodAmount,
    OrderFoodName,
    OrderFoodSubtitle,
    OrderSummaryGrid,
} from '../checkout-page/CheckOut.style'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import {
    calculateItemBasePrice,
    cartItemsTotalAmount,
    cartTotalAmount,
    getAmount, getConvertDiscount,
    getSelectedAddOn,
    getVariation,
    handleBadge, handleIncrementedTotal
} from "../../utils/customFunctions";
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
    decrementProductQty,
    incrementProductQty,
    removeProduct,
    setCartItemByDispatch,
    setClearCart,
} from '../../redux/slices/cart'
import AuthModal from '../auth'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import {
    CustomColouredTypography,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { ImageSource } from '../../utils/ImageSource'
import { setCouponInfo } from '../../redux/slices/global'
import SimpleBar from 'simplebar-react'
import CustomModal from '../custom-modal/CustomModal'
import ProductUpdateModal from '../food-card/ProductUpdateModal'
import CustomImageContainer from '../CustomImageContainer'
import { useTheme } from '@mui/material/styles'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import emptycart from '../../../public/static/emptycart.png'
import { RTL } from '../RTL/RTL'
import _ from 'lodash'
import VisibleVariations from './VisibleVariations'
import Cart from './Cart'
import { handleTotalAmountWithAddonsFF } from '../../utils/customFunctions'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import GuestCheckoutModal from "./GuestCheckoutModal";
import { onErrorResponse } from "../ErrorResponse";
import { getGuestId } from "../checkout-page/functions/getGuestUserId";
import useDeleteAllCartItem from "../../hooks/react-query/add-cart/useDeleteAllCartItem";
import useDeleteCartItem from "../../hooks/react-query/add-cart/useDeleteCartItem";
import useCartItemUpdate from "../../hooks/react-query/add-cart/useCartItemUpdate";
import { getItemDataForAddToCart } from "./helperFunction";
import { getSelectedAddons } from "../navbar/second-navbar/SecondNavbar";
import CircularLoader from "../loader/CircularLoader";
import CartContent from "./CartContent";

const FloatingCart = (props) => {
    const { sideDrawerOpen, setSideDrawerOpen } = props
    const theme = useTheme()
    const { t } = useTranslation()
    const [openGuestModal, setOpenGuestModal] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setDrawerOpen] = useState(false)
    const { cartList } = useSelector((state) => state.cart)
    const [modalFor, setModalFor] = useState('sign-in')
    const [openModal, setOpenModal] = React.useState(false)

    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const { isFilterDrawerOpen } = useSelector(
        (state) => state.searchFilterStore
    )
    const { mutate } = useDeleteAllCartItem();

    let languageDirection
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const [authModalOpen, setOpen] = useState(false)
    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => setOpen(false)
    const productBaseUrl = global?.base_urls?.product_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (cartList?.length > 0) {
    }

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    // const handleBadge = () => {}
    const {
        isLoading,
        data: restaurantData,
        isError,
        error,
        refetch,
    } = useQuery([`restaurant-details`], () =>
        RestaurantsApi.restaurantDetails(cartList[0]?.restaurant_id)
    )
    const DrawerHeader = styled('div')(({ theme }) => ({
        marginTop: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        [theme.breakpoints.down('md')]: {
            marginTop: '10px',
        },
    }))
    const handleCheckout = () => {
        const closeDrawers = () => {
            setDrawerOpen(false);
            setSideDrawerOpen(false);
        };

        if (token) {
            router.push('/checkout?page=cart');
            closeDrawers();
        } else {
            const shouldOpenGuestModal = global?.guest_checkout_status === 1;

            if (shouldOpenGuestModal) {
                setOpenGuestModal(true);
            } else {

                handleOpenAuthModal();
            }

            closeDrawers();
        }
    };
    useEffect(() => {
        refetch().then()
    }, [])
    // const variationPrice = cartList.map((item) => {
    //     if (item.variation && item.variation?.length > 0) {
    //         return item.variation.map((varItem) => varItem.price)
    //     } else return cartList.price
    // })
    const handleClearAll = () => {
        mutate(getGuestId(), {
            //onSuccess: handleSuccess,
            onError: onErrorResponse,
        });
        dispatch(setClearCart())
        dispatch(setCouponInfo(null))
        setOpenModal(false)
    }
    // cart update modal

    const handleProductUpdateModal = (item) => {
        dispatch(setCartItemByDispatch(item))
        setOpenModal(true)
        setSideDrawerOpen(false)
    }







    return (
        <>
            {authModalOpen && (
                <AuthModal
                    open={authModalOpen}
                    handleClose={handleCloseAuthModal}
                    modalFor={modalFor}
                    setModalFor={setModalFor}
                />
            )}
            {!sideDrawerOpen && (
                <Box
                    className="cart__burger"
                    sx={{
                        position: 'fixed',
                        width: '85px',
                        height: '90px',
                        left: languageDirection === 'rtl' ? 10 : 'auto',
                        right: languageDirection === 'rtl' ? 'auto' : 10,
                        top: '40%',
                        /* margin-left: -300px; */
                        zIndex: 1000000,
                        flexGrow: 1,
                        cursor: 'pointer',
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: isFilterDrawerOpen
                                ? 'none'
                                : cartList?.length === 0
                                ? 'none'
                                : 'inherit',
                        },
                    }}
                    onClick={() => setSideDrawerOpen(true)}
                >
                    <div>
                        <Cart />
                        {/*<CustomImageContainer src={cart.src} alt={'cart'} />*/}
                        {/*<img src={cart.src} alt="" />*/}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '35%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            {cartList?.length}
                            <Typography
                                sx={{
                                    lineHeight: 0.5,
                                    fontWeight: 'bold',
                                    fontSize: '12px',
                                }}
                            >
                                {t('Items')}
                            </Typography>
                        </Box>
                    </div>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '75px',
                            bottom: '6px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: (theme) => theme.palette.neutral[100],
                            width: '100px',
                        }}
                    >
                        <Stack flexWrap="wrap">
                            <Typography
                                sx={{
                                    lineHeight: 0.5,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                }}
                                color={theme.palette.whiteContainer.main}
                            >
                                {getAmount(
                                    cartItemsTotalAmount(cartList),
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            )}
            <RTL direction={languageDirection}>
                <Drawer
                    anchor="right"
                    open={sideDrawerOpen}
                    onClose={() => setSideDrawerOpen(false)}
                    variant="temporary"
                    sx={{ zIndex: '1400' }}
                >
                    {cartList?.length === 0 ? (
                        <Stack
                            sx={{
                                width: '330px',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '20px',
                            }}
                            container
                        >
                            <CustomImageContainer
                                src={emptycart.src}
                                height="250px"
                            />
                            <CustomTypographyBold align="center">
                                {t('Cart is Empty')}
                            </CustomTypographyBold>
                        </Stack>
                    ) : (
                        <>
                            <Stack
                                width="330px"
                                height="100%"
                                p="1rem"
                                justifyContent="start"
                                gap="2%"
                                marginTop={{
                                    xs: '20px',
                                    sm: '25px',
                                    md: '60px',
                                }}
                            >
                                <Stack gap="1rem">
                                    <Stack>
                                        <Typography
                                            sx={{
                                                textAlign: 'center',
                                                fontSize: '18px',
                                            }}
                                        >
                                            <Typography
                                                component="span"
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.primary.main,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {cartList?.length} {t('Items')}
                                            </Typography>{' '}
                                            {t('in your cart')}
                                        </Typography>
                                        {restaurantData?.data?.delivery_time && (
                                            <Typography
                                                sx={{
                                                    textAlign: 'center',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <img
                                                    style={{ marginBottom: '4px' }}
                                                    src={delivery.src}
                                                    loading="lazy"
                                                />
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette
                                                                .neutral[400],
                                                        marginLeft: '10px',
                                                        fontWeight: 600,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {
                                                        restaurantData?.data
                                                            ?.delivery_time
                                                    }
                                                </Typography>
                                            </Typography>
                                        )}
                                    </Stack>
                                    <SimpleBar
                                        style={{
                                            height: '55vh',
                                            width: '100%',
                                        }}
                                    >
                                        <Grid container spacing={{ xs: 1 }}>
                                            {cartList?.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    <CartContent item={item} handleProductUpdateModal={handleProductUpdateModal}
                                                                 productBaseUrl={productBaseUrl}
                                                                 t={t}

                                                    />
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    </SimpleBar>
                                </Stack>
                                <Stack alignItems="center" spacing={2} position="sticky" marginTop="auto">
                                    <Stack
                                        borderRadius="5px"
                                        sx={{

                                            width: '100%',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                        }}
                                        backgroundColor={alpha(
                                            theme.palette.primary.main,
                                            0.3
                                        )}
                                        justifyContent="center"
                                        alignItems="center"

                                    >
                                        <CustomColouredTypography
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[1000],
                                            }}
                                        >
                                            {t('Total Price')}{' '}
                                            {getAmount(
                                                cartItemsTotalAmount(cartList),
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                        </CustomColouredTypography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        width="100%"
                                        spacing={1}
                                    >
                                        <PrimaryButton
                                            backgroundColor={
                                                theme.palette.neutral[200]
                                            }
                                            onClick={handleClearAll}
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            borderRadius="7px"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[1000],
                                                fontWeight: 400,
                                            }}
                                        >
                                            {t('Clear All')}
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={handleCheckout}
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            borderRadius="7px"
                                        >
                                            {t('Checkout')}
                                        </PrimaryButton>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </>
                    )}
                </Drawer>
            </RTL>
            {openGuestModal && <GuestCheckoutModal setModalFor={setModalFor}  handleOpenAuthModal={handleOpenAuthModal} open={openGuestModal} setOpen={setOpenGuestModal} setSideDrawerOpen={setSideDrawerOpen}/>}
            {openModal && (
                <ProductUpdateModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    currencySymbol={currencySymbol}
                    currencySymbolDirection={currencySymbolDirection}
                    digitAfterDecimalPoint={digitAfterDecimalPoint}
                    handleBadge={handleBadge}
                />
            )}
        </>
    )
    //}
}

export default FloatingCart
