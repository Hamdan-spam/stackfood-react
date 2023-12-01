import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/material'
import markerIcon from '../../../../public/static/markerIcon.png'
import MapMarker from "../../landingpage/google-map/MapMarker";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useTheme } from "@emotion/react";

const containerStyle = {
    width: '100%',
    height: '450px',
}

const MapComponent = ({ latitude, longitude, data,handleRouteToRestaurant }) => {
    const theme = useTheme()
    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    }

    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )
    const [isMounted, setIsMounted] = useState(false)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })

    const [map, setMap] = useState(null)
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null)

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (map) {
            setIsMounted(true)
        }
    }, [map])

    return isLoaded ? (
        <Stack className="map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                onLoad={onLoad}
                zoom={10}
                onUnmount={onUnmount}
                options={options}
            >
                {data?.length > 0 ? <>
                    {data?.slice(0, 7)?.map((restaurant) => (
                        <MarkerF
                            key={`${name}-${parseFloat(latitude)}-${parseFloat(
                                longitude
                            )}
                    `}
                            position={{
                                lat: parseFloat(restaurant?.latitude),
                                lng: parseFloat(restaurant?.longitude),
                            }}
                            icon={{
                                url: 'static/map2.svg',
                                scale: 7,
                            }}
                            onClick={() => setHoveredMarkerId(restaurant?.id)}

                        >
                            {hoveredMarkerId === restaurant?.id && (
                                <InfoWindowF

                                    position={{
                                        lat: parseFloat(restaurant?.latitude),
                                        lng: parseFloat(restaurant?.longitude),
                                    }}
                                    pixelOffset={new window.google.maps.Size(0, -30)} >
                                    <Box
                                        sx={{
                                            color: theme.palette.neutral[800],
                                            svg: { color: theme.palette.primary.main },

                                        }}
                                        onClick={()=>handleRouteToRestaurant(restaurant)}

                                    >
                                        <Stack direction="row" gap={1} mb={1} >
                                            <Box width="0" flexGrow="1" sx={{cursor:"pointer"}}>
                                                {restaurant?.name}{" "}
                                                <Box component="small" color="primary.main">
                                                    ({(restaurant?.distance/1000).toFixed(2)}km {t("away")})
                                                </Box>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" gap={1} fontSize="0.75rem">
                                            <Box width="0" flexGrow="1">
                                                {restaurant?.address}
                                            </Box>
                                        </Stack>
                                    </Box>
                                </InfoWindowF>
                            )}
                        </MarkerF>
                    ))}
                </>  :<> {isMounted ? (
                    <Marker
                        position={center}
                        icon={{
                            url: require('../../../../public/static/markerIcon.png'),
                            scale: 7,
                        }}
                    ></Marker>
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
                )}</>  }


            </GoogleMap>
        </Stack>
    ) : (
        <CircularProgress />
    )
}

export default MapComponent
