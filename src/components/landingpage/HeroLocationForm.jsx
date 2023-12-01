import React, { useEffect, useState } from 'react'
import {
    alpha,
    Autocomplete,
    Button,
    CircularProgress,
    circularProgressClasses,
    IconButton,
    NoSsr,
    Stack,
    Typography,
} from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import MapModal from './google-map/MapModal'
import { useQuery } from 'react-query'
import { GoogleApi } from '../../hooks/react-query/config/googleApi'
import { useGeolocated } from 'react-geolocated'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import {
    CssTextField,
    CustomBox,
    CustomSearchField,
    StyledButton,
} from './Landingpage.style'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setZoneData } from '../../redux/slices/global'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import LocationEnableCheck from './LocationEnableCheck'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
import { retry } from '@reduxjs/toolkit/query'
import { AnimationDots } from "../products-page/AnimationDots";
export function FacebookCircularProgress(props) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[
                            theme.palette.mode === 'light' ? 200 : 800
                        ],
                }}
                size={25}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => theme.palette.primary.main,
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={25}
                thickness={4}
                {...props}
            />
        </Box>
    )
}

const HeroLocationForm = ({ mobileview, handleModalClose }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    //getting current location
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition,
    } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
        isGeolocationEnabled: true,
    })

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        if (router.pathname !== '/') {
            handleModalClose()
        }
    }
    const [location, setLocation] = useState('')
    const [geoLocationEnable, setGeoLocationEnable] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [predictions, setPredictions] = useState([])
    const [openLocation, setOpenLocation] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(undefined)
    const [showCurrentLocation, setShowCurrentLocation] = useState(false)
    const [zoneIdEnabled, setZoneIdEnabled] = useState(false)
    const [placeId, setPlaceId] = useState('')
    const [placeDescription, setPlaceDescription] = useState(undefined)
    const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false)
    const [errorText, setErrorText] = React.useState()
    const dispatch = useDispatch()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const handleClickLocationOpen = () => {
        setOpenLocation(true)
        setLocation({ lat: coords?.latitude, lng: coords?.longitude })
    }

    const handleCloseLocation = () => {
        setOpenLocation(false)
        setShowCurrentLocation(false)
        setGeoLocationEnable(false)
        setCurrentLocation(undefined)
    }
    const handleAgreeLocation = () => {
        if (coords) {
            setLocation({ lat: coords?.latitude, lng: coords?.longitude })
            setOpenLocation(false)
            setShowCurrentLocation(true)
            setGeoLocationEnable(true)
            setZoneIdEnabled(false)
        } else {
            setOpenLocation(true)
        }
    }

    const {
        isLoading,
        data: places,
        isError,
        error,
        // refetch: placeApiRefetch,
    } = useQuery(
        ['places', searchKey],
        async () => GoogleApi.placeApiAutocomplete(searchKey),
        { enabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
    const {
        data: geoCodeResults,
        isFetching,
        // refetch: placeApiRefetch,
    } = useQuery(
        ['geocode-api', location],
        async () => GoogleApi.geoCodeApi(location),
        {
            enabled: geoLocationEnable,
            onError: onSingleErrorResponse,
        }
    )

    if (geoCodeResults) {
    }
    const onZoneSuccessHandler = (res) => {
        if (res?.data?.zone_data?.length > 0) {
            handleModalClose()
            toast.success(t('New location has been set.'))
            router.push('/home')
        }
    }
    const { isLoading: locationLoading, data: zoneData } = useQuery(
        ['zoneId', location],
        async () => GoogleApi.getZoneId(location),
        {
            enabled: zoneIdEnabled,
            onError: onErrorResponse,
            onSuccess: onZoneSuccessHandler,
            retry: false,
        }
    )

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (zoneData) {
                dispatch(setZoneData(zoneData?.data?.zone_data))
                localStorage.setItem('zoneid', zoneData?.data?.zone_id)
            }
        }
    }, [zoneData])

    //********************Pick Location */
    const {
        isLoading: isLoading2,
        data: placeDetails,
        isError: isErrorTwo,
        error: errorTwo,
        refetch: placeApiRefetchOne,
    } = useQuery(
        ['placeDetails', placeId],
        async () => GoogleApi.placeApiDetails(placeId),
        { enabled: placeDetailsEnabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )

    useEffect(() => {
        if (placeDetails) {
            setLocation(placeDetails?.data?.result?.geometry?.location)
            //  setZoneIdEnabled(true)
        }
    }, [placeDetails])
    //************************End Pick Location */
    // useEffect(() => {
    //     if (zoneData) {

    //         setZoneId(zoneData?.data?.zone_id)

    //     }
    // }, [zoneData])

    useEffect(() => {
        if (places) {
            setPredictions(places?.data?.predictions)
        }
    }, [places])
    useEffect(() => {
        if (geoCodeResults?.data?.results && showCurrentLocation) {
            setCurrentLocation(
                geoCodeResults?.data?.results[0]?.formatted_address
            )
            // localStorage.setItem(
            //     'currentLatLng',
            //     JSON.stringify(
            //         geoCodeResults?.data?.results[0]?.geometry?.location
            //     )
            // )
        }
    }, [geoCodeResults])
    useEffect(() => {
        if (placeDescription) {
            setCurrentLocation(placeDescription)
            //localStorage.setItem('location', placeDescription)
        }
    }, [placeDescription])

    const orangeColor = theme.palette.primary.main

    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    const setLocationEnable = () => {
        if (!currentLocation) {
            toast.error(t('Location is required.'), {
                id: 'id',
            })
        }
        setGeoLocationEnable(true)
        setErrorText('hello')
        setZoneIdEnabled(true)

        if (currentLocation && location) {
            localStorage.setItem('location', currentLocation)
            localStorage.setItem('currentLatLng', JSON.stringify(location))
        } else {
            toast.error(t('Location is required.'), {
                id: 'id',
            })
        }
    }

    return (
        <NoSsr>
            <Stack
                maxWidth="630px"
                width="100%"
                backgroundColor={
                    mobileview === 'false' &&
                    alpha(theme.palette.primary.main, 0.3)
                }
                borderRadius={isXSmall ? '0px' : '10px'}
                marginTop={!isXSmall && '26px'}
                marginBottom={isXSmall && '1.5rem'}
                sx={{
                    paddingBlock: mobileview === 'true' ? '0rem' : '1rem',
                    paddingInline: '1rem',
                }}
            >
                <CustomBox component="form">
                    <CustomStackFullWidth
                        direction={{
                            xs: 'column',
                            sm: 'row',
                            md: 'row',
                        }}
                        spacing={{ xs: '0', sm: 1, md: 2 }}
                        alignItems={{
                            xs: 'center',
                            sm: 'center',
                            md: 'center',
                        }}
                    >
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CustomSearchField variant="outlined">
                                {!showCurrentLocation ? (
                                    <Autocomplete
                                        sx={{
                                            '& .MuiAutocomplete-inputRoot': {
                                                paddingRight: '26px !important',
                                                paddingTop: '3px',
                                            },
                                        }}
                                        loading={isFetching}
                                        fullWidth
                                        options={predictions}
                                        getOptionLabel={(option) =>
                                            option.description
                                        }
                                        onChange={(event, value) => {
                                            if (value) {
                                                setPlaceId(value?.place_id)
                                                setPlaceDescription(
                                                    value?.description
                                                )
                                                setZoneIdEnabled(false)
                                                setGeoLocationEnable(true)
                                            }
                                            setPlaceDetailsEnabled(true)
                                        }}
                                        renderInput={(params) => (
                                            <CssTextField
                                                mobileview={mobileview}
                                                languageDirection={
                                                    languageDirection
                                                }
                                                //variant="outlined"
                                                id="outlined-basic"
                                                {...params}
                                                placeholder={t(
                                                    'Search location here...'
                                                )}
                                                onChange={(event) => {
                                                    setSearchKey(
                                                        event.target.value
                                                    )
                                                    if (event.target.value) {
                                                        setEnabled(true)
                                                        setGeoLocationEnable(
                                                            true
                                                        )
                                                    } else {
                                                        setEnabled(false)
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault()
                                                    }
                                                }}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <IconButton
                                                            sx={{
                                                                mr: mobileview
                                                                    ? '-20px'
                                                                    : '-30px',
                                                                paddingInlineEnd:
                                                                    '-40px',
                                                            }}
                                                            onClick={() =>
                                                                handleAgreeLocation()
                                                            }
                                                        >
                                                            <GpsFixedIcon color="primary" />
                                                        </IconButton>
                                                    ),
                                                }}
                                                required="true"
                                            />
                                        )}
                                    />
                                ) : (
                                    <CssTextField
                                        sx={{ paddingTop: '3px' }}
                                        mobileview={mobileview}
                                        languageDirection={languageDirection}
                                        size="small"
                                        variant="outlined"
                                        id="outlined-basic"
                                        placeholder={t(
                                            'Search location here...'
                                        )}
                                        value={currentLocation}
                                        onChange={(event) => {
                                            setSearchKey(event.target.value)
                                            if (event.target.value) {
                                                setEnabled(true)
                                                setCurrentLocation(
                                                    event.target.value
                                                )
                                            } else {
                                                setEnabled(false)
                                                setCurrentLocation(undefined)
                                            }
                                        }}
                                        required={true}
                                        InputProps={{
                                            endAdornment:
                                                !showCurrentLocation ? (
                                                    <IconButton
                                                        onClick={() =>
                                                            handleAgreeLocation()
                                                        }
                                                    >
                                                        <GpsFixedIcon color="primary" />
                                                    </IconButton>
                                                ) : (
                                                    <>
                                                        {isFetching ? (
                                                            <FacebookCircularProgress />
                                                        ) : (
                                                            <CloseIcon
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={() =>
                                                                    handleCloseLocation()
                                                                }
                                                            />
                                                        )}
                                                    </>
                                                ),
                                        }}
                                    />
                                )}
                            </CustomSearchField>
                            {mobileview === 'false' && (
                                <>
                                    {isFetching ?
                                        <StyledButton
                                            radiuschange="true"
                                            sx={{
                                            fontWeight: '400',
                                            width: {
                                                xs: '137px',
                                                sm: '134px',
                                                md: '134px',
                                            },
                                        }} >
                                           <Stack
                                              py="5px">
                                               <AnimationDots size="0px"/>
                                           </Stack>
                                        </StyledButton>:
                                        <StyledButton
                                            languageDirection={languageDirection}

                                            radiuschange="true"
                                            onClick={() => setLocationEnable()}
                                            disabled={!location}
                                            sx={{
                                                fontWeight: '400',
                                                width: {
                                                    xs: '137px',
                                                    sm: '134px',
                                                    md: '134px',
                                                },
                                            }}
                                        >
                                            <Typography
                                                fontWeight="400"
                                                fontSize="14px"
                                            >
                                                {' '}
                                                {t('Set Location')}
                                            </Typography>
                                        </StyledButton>}
                                </>

                            )}
                        </CustomStackFullWidth>
                        {mobileview === 'false' && (
                            <CustomTypography>{t('Or')}</CustomTypography>
                        )}
                        {mobileview === 'true' ? (
                            <Stack
                                direction="row"
                                width="100%"
                                paddingTop="10px"
                                gap="20px"
                                justifyContent="center"
                            >
                                {isFetching ?  <StyledButton

                                    sx={{
                                        fontWeight: '400',
                                        width: {
                                            xs: '137px',
                                            sm: '134px',
                                            md: '134px',
                                        },
                                    }} >
                                    <Stack
                                        py="5px">
                                        <AnimationDots size="0px"/>
                                    </Stack>
                                </StyledButton>:(
                                    <StyledButton
                                    onClick={() => setLocationEnable()}
                                    disabled={!location}
                                >
                                    <Typography
                                        fontWeight="400"
                                        fontSize="14px"
                                    >
                                        {t('Set Location')}
                                    </Typography>
                                </StyledButton>)}
                                <StyledButton onClick={handleOpen}>
                                    <Typography
                                        fontWeight="400"
                                        fontSize="14px"
                                    >
                                        {t('Pick Form Map')}
                                    </Typography>
                                </StyledButton>
                            </Stack>
                        ) : (
                            <StyledButton onClick={handleOpen}>
                                <Typography fontWeight="400" fontSize="14px">
                                    {t('Pick Form Map')}
                                </Typography>
                            </StyledButton>
                        )}
                    </CustomStackFullWidth>
                </CustomBox>
            </Stack>
            {open && <MapModal open={open} handleClose={handleClose} />}
            <LocationEnableCheck
                openLocation={openLocation}
                handleCloseLocation={handleCloseLocation}
                isGeolocationEnabled={isGeolocationEnabled}
                t={t}
                coords={coords}
                handleAgreeLocation={handleAgreeLocation}
            />
        </NoSsr>
    )
}

export default HeroLocationForm
