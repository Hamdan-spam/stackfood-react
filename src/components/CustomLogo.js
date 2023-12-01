import React from 'react'
import { Box } from '@mui/material'
import { Logo } from '../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'

const CustomLogo = ({ logoImg, atlText, height, width }) => {
    const router = useRouter()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    let currentLocation = undefined
    if (typeof window !== 'undefined') {
        currentLocation = JSON.parse(localStorage.getItem('currentLatLng'))
        //hostname = window.location.hostnam
    }
    const handleClick = () => {
        const shouldRedirectToHome = zoneid && currentLocation?.lat && currentLocation?.lng;
        const newPath = shouldRedirectToHome ? '/home' : '/';

        router.push(newPath, undefined, { shallow: true }).then(() => {
            window.scrollTo(0, 0);
        });
    };
    return (
        <Logo height={height} width={width} onClick={handleClick}>
            <img src={logoImg} alt={atlText} />
        </Logo>
    )
}
export default CustomLogo
