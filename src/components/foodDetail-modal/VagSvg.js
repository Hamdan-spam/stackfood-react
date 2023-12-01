import React from 'react';
import {useTheme} from "@mui/material/styles";

const VagSvg = ({color}) => {

    const theme=useTheme()
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 2.33329V11.6666H2.33366V2.33329H11.667ZM12.8337 1.16663H1.16699V12.8333H12.8337V1.16663ZM7.00033 3.49996C5.06949 3.49996 3.50033 5.06913 3.50033 6.99996C3.50033 8.93079 5.06949 10.5 7.00033 10.5C8.93116 10.5 10.5003 8.93079 10.5003 6.99996C10.5003 5.06913 8.93116 3.49996 7.00033 3.49996Z" fill={color}/>
        </svg>
    );
};

export default VagSvg;
