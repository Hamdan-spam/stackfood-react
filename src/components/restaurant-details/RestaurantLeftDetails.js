import React, { useState } from 'react'
import {
    CustomOverlayBox,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import { alpha, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { Box, Stack } from '@mui/system'
import CustomRatings from '../custom-ratings/CustomRatings'
import moment from 'moment'
import {
    getAmount,
    getNumberWithConvertedDecimalPoint,
    isAvailable,
} from '../../utils/customFunctions'
import { t } from 'i18next'
import { addWishListRes, removeWishListRes } from '../../redux/slices/wishList'
import { useWishListResDelete } from '../../hooks/react-query/config/wish-list/useWishListResDelete'
import { useMutation } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomSideOverLay } from '../home/food-campaign/FoodCampaign.style'
import ClosedNowOverlay from './HeadingBannerSection/ClosedNowOverlay'
import { RestaurantCommonTypography } from './restaurant-details.style'
import Link from 'next/link'
import ShareIcon from '../../assets/images/icons/ShareIcon'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FoodRating from '../food-card/FoodRating'
import DirectionIcon from '../../assets/images/icons/DirectionIcon'
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import CustomModal from '../custom-modal/CustomModal'
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from '../custom-cards/CustomCards.style'
import { useRouter } from 'next/router'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MapComponent from "./google-address/MapComponent";
import { RTL } from '../RTL/RTL'

const RestaurantLeftDetails = (props) => {
    const {
        details,
        restaurantCoverUrl,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
        scrollPosition,
        data,
    } = props
    const dispatch = useDispatch()
    const router = useRouter();
    const { wishLists } = useSelector((state) => state.wishList)
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const theme = useTheme()
    const currentRoute = typeof window !== 'undefined' ? window.location.href : '';
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [openModal, setOpenModal] = useState(false)
    const [openShareModal, setOpenShareModal] = useState(false)
    const { t } = useTranslation()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const {
        logo,
        name,
        rating_count,
        avg_rating,
        address,
        delivery_time,
        minimum_order,
        latitude,
        longitude,
        id,
        active,
        schedules,
    } = details
    const {
        mutate: addFavoriteMutation,
        isLoading,
        error,
    } = useMutation('add-favourite', () => RestaurantsApi.addFavorite(id), {
        onSuccess: (response) => {
            toast.success(t('Added to Wishlist successfully.'))

            if (response?.data) {
                dispatch(
                    addWishListRes({
                        logo,
                        name,
                        rating_count,
                        avg_rating,
                        address,
                        delivery_time,
                        minimum_order,
                        latitude,
                        longitude,
                        id,
                    })
                )

                //setOpen(false)
            }
        },
        onError: (error) => { },
    })
    const addToFavorite = () => {
        if (token) {
            addFavoriteMutation()
        } else toast.error(t('You are not logged in'))
    }
    const onSuccessHandlerForResDelete = (res, id) => {
        if (res) {
            toast.success(
                t('Removed from  favorite successfully.', {
                    id: 'favorite',
                })
            )
            dispatch(removeWishListRes(id))
        }
    }
    const { mutate: restaurantMutate } = useWishListResDelete(
        onSuccessHandlerForResDelete
    )

    const deleteWishlistRes = (id) => {
        restaurantMutate(id)
    }

    const isInList = (id) => {
        return !!wishLists?.restaurant?.find(
            (wishRestaurant) => wishRestaurant.id === id
        )
    }
    const handleCopy = (url) => {
        navigator.clipboard.writeText(url)
        toast(() => (
            <span>
                {t("Your restaurant URL has been copied")}
            </span>
        ))
    }
    const closedNowHandler = () => {
        if (active) {
            if (schedules.length > 0) {
                const todayInNumber = moment().weekday()
                let isOpen = false
                let filteredSchedules = schedules.filter(
                    (item) => item.day === todayInNumber
                )
                let isAvailableNow = []
                filteredSchedules.forEach((item) => {
                    if (isAvailable(item?.opening_time, item?.closing_time)) {
                        isAvailableNow.push(item)
                    }
                })
                if (isAvailableNow.length > 0) {
                    isOpen = true
                } else {
                    isOpen = false
                }
                if (!isOpen) {
                    return (
                        <ClosedNowOverlay
                            t={t}
                            theme={theme}
                            scrollPosition={scrollPosition}
                            isSmall={isSmall}
                        />
                    )
                }
            } else {
                return (
                    <ClosedNowOverlay
                        t={t}
                        theme={theme}
                        scrollPosition={scrollPosition}
                        isSmall={isSmall}
                    />
                )
            }
        } else {
            return (
                <ClosedNowOverlay
                    t={t}
                    theme={theme}
                    scrollPosition={scrollPosition}
                    isSmall={isSmall}
                />
            )
        }
    }
    const handleTop = () => {
        return (
            <RTL direction={languageDirection}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                        animation: 'fadeIn .9s',
                        '@keyframes fadeIn ': {
                            '0%': {
                                opacity: '0',
                            },
                            '100%': {
                                opacity: '1',
                            },
                        },
                    }}
                >
                    <CustomStackFullWidth
                        alignItems={{ xs: 'center', sm: 'flex-end' }}
                        justiyfContent="center"
                        direction="row"
                        spacing={1}
                        sx={{
                            padding: {
                                xs: '5px 5px 5px 5px',
                                sm: '20px 20px 20px 20px',
                                md: '25px 25px 30px 25px',
                            },
                            height: '100%',
                        }}
                    >
                        <Stack
                            position="absolute"
                            top={
                                scrollPosition === 0
                                    ? '5%'
                                    : isSmall
                                        ? '15%'
                                        : '45%'
                            }
                            right="5%"
                            zIndex="999"
                            gap="10px"
                        >

                            {!isInList(id)
                                ? (
                                    <IconButton
                                        sx={{
                                            borderRadius: "8px",
                                            border: `1px solid ${theme.palette.primary.main}`,
                                            background: (theme) =>
                                                theme.palette.neutral[100],
                                            padding: { xs: "3px", sm: "5px", md: "7px" }

                                        }}
                                        onClick={(e) => addToFavorite(e)}
                                    >
                                        <FavoriteBorderIcon
                                            color="primary"
                                            sx={{
                                                fontSize: { xs: "16px", sm: "18px", md: "20px" }
                                            }}
                                        />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        sx={{
                                            borderRadius: "8px",
                                            border: `1px solid ${theme.palette.primary.main}`,
                                            background: (theme) =>
                                                theme.palette.neutral[100],
                                            padding: { xs: "3px", sm: "5px", md: "7px" }
                                        }}
                                        onClick={(e) => deleteWishlistRes(id, e)}
                                    >
                                        <FavoriteIcon
                                            color="primary"
                                            sx={{
                                                fontSize: { xs: "16px", sm: "18px", md: "20px" }
                                            }}
                                        />
                                    </IconButton>
                                )}


                            <IconButton
                                sx={{

                                    borderRadius: "8px",
                                    // padding: "5px",
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    background: (theme) =>
                                        theme.palette.neutral[100],
                                    padding: { xs: "3px", sm: "5px", md: "7px" }
                                }}
                                onClick={() => setOpenModal(true)}
                            >
                                <DirectionsOutlinedIcon
                                    color="primary"
                                    sx={{
                                        fontSize: { xs: "16px", sm: "18px", md: "20px" }
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    borderRadius: "8px",
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    background: (theme) =>
                                        theme.palette.neutral[100],
                                    padding: { xs: "3px", sm: "5px", md: "7px" }

                                }}
                                onClick={(e) => setOpenShareModal(true)}
                            >
                                <ShareOutlinedIcon
                                    color="primary"
                                    sx={{
                                        fontSize: { xs: "16px", sm: "18px", md: "20px" }
                                    }}
                                />
                            </IconButton>
                        </Stack>
                        <Box
                            sx={{
                                width:
                                    scrollPosition === 0
                                        ? '100px'
                                        : isSmall
                                            ? '74px'
                                            : '100px',
                                height:
                                    scrollPosition === 0
                                        ? '100px'
                                        : isSmall
                                            ? '74px'
                                            : '100px',
                                borderRadius: '50%',
                                position: 'relative',
                            }}
                        >
                            {closedNowHandler()}
                            {isSmall ? (
                                <Stack
                                    position="absolute"
                                    top={scrollPosition === 0 ? '-35px' : '0px'}
                                    sx={{ zIndex: 9999 }}
                                    height={{
                                        xs: scrollPosition === 0 ? '100px' : '74px',
                                        sm: '100px',
                                        md: '100px',
                                    }}
                                >
                                    <CustomImageContainer
                                        src={`${global?.base_urls?.restaurant_image_url}/${details?.logo}`}
                                        width="100px"
                                        smWidth={
                                            scrollPosition === 0
                                                ? '100px'
                                                : isSmall
                                                    ? '74px'
                                                    : '100px'
                                        }
                                        height="100%"
                                        borderRadius="50%"
                                        objectFit="cover"
                                    />
                                </Stack>
                            ) : (
                                <CustomImageContainer
                                    src={`${global?.base_urls?.restaurant_image_url}/${details?.logo}`}
                                    width="100px"
                                    smWidth={
                                        scrollPosition === 0
                                            ? '100px'
                                            : isSmall
                                                ? '74px'
                                                : '100px'
                                    }
                                    height="100%"
                                    borderRadius="50%"
                                    objectFit="cover"
                                />
                            )}
                        </Box>
                        <Stack padding="10px" justifyContent="center" gap="8px">
                            <Typography
                                color={theme.palette.neutral[1000]}
                                fontWeight="600"
                            >
                                {details?.name}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FoodRating product_avg_rating={details?.avg_rating} />
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Link href={`/review/${details?.id}`} passHref>
                                    <Typography
                                        color={theme.palette.neutral[1000]}
                                        fontSize="13px"
                                        sx={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {JSON.stringify(details?.rating_count)}{' '}
                                        {t('Ratings')}
                                    </Typography>
                                </Link>
                                <Divider orientation="vertical" flexItem width="3px" height="100%" sx={{ opacity: 1, backgroundColor: theme.palette.neutral[300] }} />
                                <Link href={`/review/${details?.id}`} passHref>
                                    <Typography
                                        color={theme.palette.neutral[1000]}
                                        fontSize="13px"
                                        sx={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {JSON.stringify(details?.reviews_comments_count)}{' '}
                                        {t('Reviews')}
                                    </Typography>
                                </Link>
                            </Stack>

                            {/* <Typography
                            fontSize="12px"
                            color={theme.palette.neutral[800]}
                        >
                            {details?.address}
                        </Typography> */}
                        </Stack>
                    </CustomStackFullWidth>
                </Grid>

            </RTL>
        )
    }
    const handleBottom = () => {
        return (
            <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                sx={{ paddingX: '20px', background: theme.palette.neutral[1800] }}
                justifyContent="space-between"
                alignItems="center"
            >
                {details?.positive_rating !== 0 ? (
                    <Grid xs={4} sm={4} md={4}>
                        <RestaurantCommonTypography>
                            {details?.positive_rating} %
                        </RestaurantCommonTypography>
                        <RestaurantCommonTypography
                            fontSize="16px"
                            smFontSize="12px"
                            fontWeight="400"
                        >
                            {t('Positive Review')}
                        </RestaurantCommonTypography>
                    </Grid>
                ) : null}

                {details?.minimum_order ? (<Grid xs={4} sm={4} md={4}>
                    <RestaurantCommonTypography>
                        {' '}
                        {getAmount(
                            details?.minimum_order,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </RestaurantCommonTypography>
                    <RestaurantCommonTypography
                        fontSize="1rem"
                        smFontSize="12px"
                        fontWeight="400"
                    >
                        {t('Minimum Order')}
                    </RestaurantCommonTypography>
                </Grid>) : null}
                {details?.delivery_time ? (<Grid xs={4} sm={4} md={4}>
                    <RestaurantCommonTypography>
                        {details?.delivery_time}
                    </RestaurantCommonTypography>
                    <RestaurantCommonTypography
                        fontSize="16px"
                        smFontSize="12px"
                        fontWeight="400"
                    >
                        {t('Delivery Time')}
                    </RestaurantCommonTypography>
                </Grid>) : null}

            </Grid>
        )
    }
    return (
        <CustomStackFullWidth
            sx={{
                position: scrollPosition === 0 ? 'inherit' : 'sticky',
                marginTop: scrollPosition === 0 ? '0px' : isSmall && '30px',
            }}
        >
            <CustomStackFullWidth
                sx={{
                    position: 'relative',
                    boxShadow: '0px 2px 30px 2px rgba(0, 0, 0, 0.08)',
                    zIndex: 9,
                }}
            >
                <CustomImageContainer
                    src={`${restaurantCoverUrl}/${details.cover_photo}`}
                    height="250px"
                    smHeight={scrollPosition === 0 ? '205px' : '140px'}
                    objectFit="cover"
                />
                <CustomStackFullWidth
                    sx={{
                        position: 'absolute',
                        background: isSmall
                            ? (theme) => alpha(theme.palette.neutral[100], 0.9)
                            : (theme) => alpha(theme.palette.neutral[100], 0.7),
                        height: '100%',
                    }}
                >
                    {scrollPosition === 0 && handleTop()}
                    {scrollPosition === 0 ? handleBottom() : handleTop()}
                </CustomStackFullWidth>
            </CustomStackFullWidth>
            <CustomModal
                openModal={openShareModal}
                setModalOpen={setOpenShareModal}
                maxWidth={{ xs: "90%", md: "40%" }}
            >
                <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ position: "relative" }}
                >
                    <IconButton
                        onClick={() => setOpenShareModal(false)}
                        sx={{
                            zIndex: "99",
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: (theme) => theme.palette.neutral[100],
                            borderRadius: "50%",
                            [theme.breakpoints.down("md")]: {
                                top: 10,
                                right: 5,
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
                    </IconButton>
                </CustomStackFullWidth>
                <CustomStackFullWidth padding="20px">
                    <Typography fontWeight={600} fontSize="20px" color={theme.palette.neutral[1000]}>
                        {t("Share")}
                    </Typography>
                    <Stack padding="10px" flexDirection="row" gap="10px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={currentRoute}
                            fontWeight={400}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Button variant="contained" onClick={() => handleCopy(currentRoute)}><ContentCopyIcon /></Button>
                    </Stack>
                </CustomStackFullWidth>
            </CustomModal>
            <CustomModal
                openModal={openModal}
                setModalOpen={setOpenModal}
            >
                <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ position: "relative" }}
                >
                    <IconButton
                        onClick={() => setOpenModal(false)}
                        sx={{
                            zIndex: "99",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: (theme) => theme.palette.neutral[100],
                            borderRadius: "50%",
                            [theme.breakpoints.down("md")]: {
                                top: 10,
                                right: 5,
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
                    </IconButton>
                </CustomStackFullWidth>
                <Box p="1rem">
                    <MapComponent latitude={details?.latitude} longitude={details?.longitude} />
                </Box>
            </CustomModal>
        </CustomStackFullWidth>
    )
}

export default RestaurantLeftDetails
