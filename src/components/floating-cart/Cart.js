import { Box } from '@mui/material'
import React from 'react'
import {useTheme} from "@mui/material/styles";

const Cart = props => {
    const theme=useTheme()
    return (
        <>
            <Box {...props}>
                <div>
                    <svg width="83" height="90" viewBox="0 0 83 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="28.2204" y="3.32" width="25.73" height="18.1304" rx="9.06522" stroke={theme.palette.primary.main} stroke-width="6.64"/>
                        <path d="M3.93116 19.6071C4.05395 17.4084 5.87262 15.6885 8.07471 15.6885H73.6142C75.7866 15.6885 77.5914 17.3639 77.7527 19.5303L82.668 85.5417C82.8472 87.9484 80.9429 89.9998 78.5295 89.9998H4.38823C2.0053 89.9998 0.111814 87.9976 0.244684 85.6184L3.93116 19.6071Z" fill="url(#paint0_linear_2_29713)"/>
                        <path d="M20.3921 17.1603C20.4994 14.9491 22.3235 13.2114 24.5373 13.2114H57.7509C59.9389 13.2114 61.751 14.9101 61.8923 17.0935L64.4539 56.683C64.6087 59.0754 62.71 61.101 60.3126 61.101H22.616C20.2451 61.101 18.356 59.118 18.4709 56.7498L20.3921 17.1603Z" fill="#FFF9F0"/>
                        <defs>
                            <linearGradient id="paint0_linear_2_29713" x1="41.5" y1="15.6885" x2="41.5" y2="89.9998" gradientUnits="userSpaceOnUse">
                                <stop stop-color={theme.palette.primary.main}/>
                                <stop offset="1" stop-color={theme.palette.primary.main}/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </Box>
        </>
    )
}

export default Cart