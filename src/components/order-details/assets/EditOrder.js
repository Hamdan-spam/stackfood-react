import { useTheme } from '@mui/material';
import React from 'react'

const EditOrder = () => {
    const theme = useTheme();
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke={theme.palette.primary.main} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.9098 7.84015L7.71979 13.0302C7.51979 13.2302 7.3298 13.6202 7.2898 13.9002L7.0098 15.8802C6.9098 16.6002 7.40979 17.1002 8.12979 17.0002L10.1098 16.7202C10.3898 16.6802 10.7798 16.4902 10.9798 16.2902L16.1698 11.1002C17.0598 10.2102 17.4898 9.17015 16.1698 7.85015C14.8498 6.52015 13.8098 6.94015 12.9098 7.84015Z" stroke={theme.palette.primary.main} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.1699 8.58008C12.6099 10.1501 13.8399 11.3901 15.4199 11.8301" stroke={theme.palette.primary.main} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

export default EditOrder;