import { useTheme } from '@mui/styles'
import React from 'react'

const DelivaryTruckIcon = () => {
    const theme = useTheme();
    return (
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1064_4478)">
                <path d="M5.5 2H0.5V0.5H5.5V2ZM4.5 3H0.5V4.5H4.5V3ZM12.5 10H10.974C10.991 10.0805 11 10.164 11 10.25C11 10.9405 10.4405 11.5 9.75 11.5C9.0595 11.5 8.5 10.9405 8.5 10.25C8.5 10.164 8.509 10.0805 8.526 10H4.474C4.491 10.0805 4.5 10.164 4.5 10.25C4.5 10.9405 3.9405 11.5 3.25 11.5C2.5595 11.5 2 10.9405 2 10.25C2 10.164 2.009 10.0805 2.026 10H0.5V5.5H3.5V7H2V8.5H7.5V2.25C7.5 2.112 7.3875 2 7.25 2H6.5V0.5H7.25C8.215 0.5 9 1.285 9 2.25V2.5H9.75C11.266 2.5 12.5 3.7335 12.5 5.25V10ZM9 4V6.5H11V5.25C11 4.561 10.4395 4 9.75 4H9Z" fill={theme.palette.primary.main} />
            </g>
            <defs>
                <clipPath id="clip0_1064_4478">
                    <rect width="12" height="12" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default DelivaryTruckIcon