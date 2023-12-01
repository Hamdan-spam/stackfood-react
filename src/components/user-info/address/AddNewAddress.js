import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Modal, Stack, TextField } from "@mui/material";
import Typography from '@mui/material/Typography'
import { useMutation, useQuery } from 'react-query'
import { ButtonBox } from './Address.style'
import MenuItem from '@mui/material/MenuItem'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import { AddressApi } from '../../../hooks/react-query/config/addressApi'
import { useDispatch, useSelector } from "react-redux";
import MapForAddress from '../../landingpage/google-map/MapForAddress'
import { GoogleApi } from '../../../hooks/react-query/config/googleApi'
import { useTranslation } from 'react-i18next'
import { useGeolocated } from 'react-geolocated'
import { toast } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import CustomMapSearch from '../../join-restaurant/CustomMapSearch'
import { useFormik } from 'formik'
import GoogleMapComponent from '../../landingpage/google-map/GoogleMapComponent'
import AddressForm from './AddressForm'
import { onErrorResponse } from '../../ErrorResponse'
import { CustomTypography } from '../../custom-tables/Tables.style'

import { CustomBoxForModal } from '../../auth/auth.style'
import { useTheme } from '@mui/material/styles'
import { RTL } from '../../RTL/RTL'
import EditIcon from '@mui/icons-material/Edit'
import { PrimaryButton } from '../../products-page/FoodOrRestaurant'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CreateIcon from "@mui/icons-material/Create";

import { setGuestUserInfo } from "../../../redux/slices/guestUserInfo";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    width: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    boxShadow: 24,
    p: 3,
}
const AddNewAddress = ({ refetch, buttonbg,guestUser,orderType }) => {
    const theme = useTheme()
    const dispatch=useDispatch()
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const [open, setOpen] = useState(false)
    const [isDisablePickButton, setDisablePickButton] = useState(false)
    const [locationEnabled, setLocationEnabled] = useState(false)
    const [location, setLocation] = useState(global?.default_location)
    const [searchKey, setSearchKey] = useState({ description: '' })
    const [enabled, setEnabled] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(locations)
    // const [locationLoading, setLocationLoading] = useState(false)
    const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false)
    const [placeDescription, setPlaceDescription] = useState(undefined)
    const [zoneId, setZoneId] = useState(undefined)
    const [mounted, setMounted] = useState(true)
    const [predictions, setPredictions] = useState([])
    const [placeId, setPlaceId] = useState('')
    const [value, setValue] = useState()
    const { token } = useSelector((state) => state.userToken)
    const {
        data: places,
        isLoading: isLoadingPlacesApi,

        // refetch: placeApiRefetch,
    } = useQuery(
        ['places', searchKey.description],
        async () => GoogleApi.placeApiAutocomplete(searchKey.description),
        { enabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            isGeolocationEnabled: true,
        })

    let locations = undefined
    if (typeof window !== 'undefined') {
        locations = localStorage.getItem('location')
    }
    useEffect(() => {
        if (coords) {
            setLocation({
                lat: coords?.latitude,
                lng: coords?.longitude,
            })
        }
    }, [coords])

    const { data, isError } = useQuery(['profile-info'], ProfileApi.profileInfo)

    //********************Map work */

    const {
        isLoading: locationLoading,
        data: zoneData,
        isError: isErrorLocation,
        error: errorLocation,
        refetch: locationRefetch,
    } = useQuery(
        ['zoneId', location],
        async () => GoogleApi.getZoneId(location),
        { enabled: locationEnabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
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
            setLocationEnabled(true)
        }
    }, [placeDetails])
    useEffect(() => {
        if (places) {
            setPredictions(places?.data?.predictions)
        }
    }, [places])

    useEffect(() => {
        if (zoneData) {
            setZoneId(zoneData?.data?.zone_id)
            //  setLocation(undefined)
            setLocationEnabled(false)
            setMounted(false)
        }
        if (!zoneData) {
            setZoneId(undefined)
        }
    }, [zoneData])

    const {
        isLoading: geoCodeLoading,
        data: geoCodeResults,
        // refetch: placeApiRefetch,
    } = useQuery(['geocode-api', location], async () =>
        GoogleApi.geoCodeApi(location)
    )
    if (geoCodeResults) {
    }

    //********************Map work end */
    const clickAddNew = () => {
        setOpen(true)
    }
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const { mutate, isLoading, error } = useMutation(
        'address-add',
        AddressApi.addNewAddress,
        {
            onSuccess: (response) => {
                toast.success(response?.data?.message)

                if (response?.data) {
                    refetch()
                    setOpen(false)
                }
            },
            onError: (error) => {
                onErrorResponse(error)
            },
        }
    )
    const formSubmitHandler = (values) => {
        if(token){
            mutate(values)
        }else{
            dispatch(setGuestUserInfo(values));
            setOpen(false)
        }

    }
    const languageDirection = localStorage.getItem('direction')
    const primaryColor = theme.palette.primary.main
    const whiteColor = theme.palette.whiteContainer.main
    return (
        <>
            {guestUser==="true"? <IconButton onClick={clickAddNew} padding="0px">
                <CreateIcon
                  sx={{
                      width: "18px",
                      height: "20px",
                      color: (theme) => theme.palette.primary.main,
                  }}
                />
            </IconButton>:  <PrimaryButton
              variant={buttonbg === 'true' ? '' : 'outlined'}
              sx={{ borderRadius: buttonbg === 'true' ? '5px' : '20px' }}
              onClick={clickAddNew}
              padding="5px 10px"
              backgroundColor={
                  buttonbg === 'true' ? theme.palette.primary.main : ''
              }
            >
                <Stack
                  direction="row"
                  spacing={0.5}
                  color={theme.palette.neutral[1000]}
                  alignItems="center"
                >
                    <Typography
                      fontSize={{ xs: '12px', sm: '12px', md: '14px' }}
                      fontWeight="400"
                      color={buttonbg === 'true' && whiteColor}
                    >
                        {t('Add Address')}
                    </Typography>
                    <LocationOnIcon
                      style={{
                          width: '12px',
                          height: '14px',
                          color:
                            buttonbg === 'true' ? whiteColor : primaryColor,
                      }}
                    />
                </Stack>
            </PrimaryButton>}

            {open && (
                <Modal
                    open={open}
                    onClose={() => {
                        setOpen(false)
                        setSearchKey({ description: '' })
                    }}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Stack sx={style} spacing={2}>
                        <button
                            onClick={() => setOpen(false)}
                            className="closebtn"
                        >
                            <CloseIcon sx={{ fontSize: '16px' }} />
                        </button>

                        <RTL direction={languageDirection}>
                            <Stack
                                spacing={1}
                                mb="2rem"
                                sx={{ paddingInlineEnd: '10px' }}
                            >
                                <CustomTypography variant="h4" mb="5px">
                                    {t('Add new address')}
                                </CustomTypography>
                                {orderType !=="take_away" && <CustomMapSearch
                                  setSearchKey={setSearchKey}
                                  setEnabled={setEnabled}
                                  predictions={predictions}
                                  setPlaceId={setPlaceId}
                                  setPlaceDetailsEnabled={
                                      setPlaceDetailsEnabled
                                  }
                                  setPlaceDescription={setPlaceDescription}
                                  border={theme.palette.primary.main}
                                  searchKey={searchKey}
                                  placeDescription={placeDescription}
                                  isLoadingPlacesApi={isLoadingPlacesApi}
                                /> }

                                {!!location && orderType !=="take_away" &&  (
                                    <GoogleMapComponent
                                        setLocation={setLocation}
                                        location={location}
                                        setPlaceDetailsEnabled={
                                            setPlaceDetailsEnabled
                                        }
                                        placeDetailsEnabled={
                                            placeDetailsEnabled
                                        }
                                        locationEnabled={locationEnabled}
                                        setPlaceDescription={
                                            setPlaceDescription
                                        }
                                        setLocationEnabled={setLocationEnabled}
                                        setDisablePickButton={
                                            setDisablePickButton
                                        }
                                        height="200px"
                                    />
                                )}
                            </Stack>

                            <AddressForm
                                deliveryAddress={
                                    geoCodeResults?.data?.results[0]
                                        ?.formatted_address
                                }
                                personName={data?.data?.f_name}
                                phone={data?.data?.phone}
                                lat={location?.lat || ''}
                                lng={location?.lng || ''}
                                formSubmit={formSubmitHandler}
                                isLoading={isLoading}
                            />
                        </RTL>
                    </Stack>
                </Modal>
            )}
        </>
    )
}

export default React.memo(AddNewAddress)
