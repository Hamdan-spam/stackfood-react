import React, { useEffect } from "react";
import MapComponent from "../../restaurant-details/google-address/MapComponent";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import { RestaurantsApi } from "../../../hooks/react-query/config/restaurantApi";
import { useRouter } from "next/router";
import { onErrorResponse } from "../../ErrorResponse";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { useTheme } from "@mui/styles";

const NearByRestaurant = () => {
    const theme=useTheme()
    const router=useRouter()
    const offset=1
    const page_limit=10
    const type="all"
    const filterType="all"
    const searchKey=""
    let currentLocation = undefined
    if (typeof window !== 'undefined') {
        currentLocation = JSON.parse(localStorage.getItem('currentLatLng'))
        //hostname = window.location.hostnam
    }
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['all-restaurant', offset, page_limit],
        () =>
            RestaurantsApi.restaurants({
                offset,
                page_limit,
                type,
                filterType,
                searchKey,
            }),
        {
            onError: onErrorResponse,
        }
    )
    const handleRouteToRestaurant=(restaurant)=>{
        router.push({
            pathname: `/restaurant/[id]`,
            query: {
                id: `${restaurant?.slug ? restaurant?.slug : restaurant?.id}`,
                restaurant_zone_id: restaurant?.zone_id,
            },
        })
    }

    useEffect(async () => {
        await refetch()
    }, [])
    return (
        <Box p="1rem" >
            <MapComponent handleRouteToRestaurant={handleRouteToRestaurant}  latitude={currentLocation?.lat} longitude={currentLocation?.lng} data={data?.data?.restaurants} />
        </Box>
    );
};

export default NearByRestaurant;