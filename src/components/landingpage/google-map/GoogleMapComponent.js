import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { CircularProgress, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import markerIcon from '../../../../public/static/markerIcon.png'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'
import MapMarker from './MapMarker'

const GoogleMapComponent = ({
    setDisablePickButton,
    setLocationEnabled,
    setLocation,
    setCurrentLocation,
    locationLoading,
    location,
    setPlaceDetailsEnabled,
    placeDetailsEnabled,
    locationEnabled,
    setPlaceDescription,
    height,
}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const containerStyle = {
        width: '100%',
        height: height ? height : isSmall ? '250px' : '400px',
    }
    const mapRef = useRef(GoogleMap)
    const center = useMemo(
        () => ({
            lat: parseFloat(location?.lat),
            lng: parseFloat(location?.lng),
        }),
        []
    )
    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })
    const [isMounted, setIsMounted] = useState(false)
    const [openInfoWindow, setOpenInfoWindow] = useState(false)
    const [mapSetup, setMapSetup] = useState(false)

    useEffect(() => setIsMounted(true), [])

    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(10)
    const [centerPosition, setCenterPosition] = useState(center)

    const onLoad = useCallback(function callback(map) {
        setZoom(12)
        setMap(map)
    }, [])
    useEffect(() => {
        if (location && placeDetailsEnabled) {
            setCenterPosition(location)
        }
        if (map?.center && mapSetup) {
            setCenterPosition({
                lat: map.center.lat(),
                lng: map.center.lng(),
            })
        }

        setIsMounted(true)
    }, [map, mapSetup, placeDetailsEnabled, location])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
        // setMapSetup(false)
    }, [])

    return isLoaded ? (
        <Stack className="map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerPosition}
                onLoad={onLoad}
                // onZoomChanged={(e) =>

                // }
                zoom={zoom}
                onUnmount={onUnmount}
                onMouseDown={(e) => {
                    setMapSetup(true)
                    setDisablePickButton(true)

                    // setPlaceDetailsEnabled(false)
                }}
                onMouseUp={(e) => {
                    setMapSetup(false)
                    setDisablePickButton(false)
                    setLocationEnabled(true)
                    setLocation({
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    })
                    setCenterPosition({
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    })
                    setPlaceDetailsEnabled(false)
                    setPlaceDescription(undefined)
                }}
                //  yesIWantToUseGoogleMapApiInternals
                onZoomChanged={() => {
                    // setMapSetup(true)
                    if (map) {
                        setLocationEnabled(true)
                        setLocation({
                            lat: map.center.lat(),
                            lng: map.center.lng(),
                        })
                        setCenterPosition({
                            lat: map.center.lat(),
                            lng: map.center.lng(),
                        })
                        // setPlaceDetailsEnabled(false)
                    }
                }}
                options={options}
            >
                {!locationLoading ? (
                    <Stack
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -63,
                            marginLeft: -32,
                            left: '50%',
                            top: '50%',
                        }}
                    >
                        <MapMarker width="60px" height="70px" />
                    </Stack>
                ) : (
                    <Stack
                        alignItems="center"
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -37,
                            marginLeft: -11,
                            left: '50%',
                            top: '50%',
                        }}
                    >
                        <CircularProgress />
                    </Stack>
                )}
            </GoogleMap>
        </Stack>
    ) : (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: '400px',
                [theme.breakpoints.down('sm')]: {
                    minHeight: '250px',
                },
            }}
        >
            <Skeleton
                width="100%"
                height="100%"
                variant="rectangular"
                animation="wave"
            />
        </CustomStackFullWidth>
    )
}

export default GoogleMapComponent
