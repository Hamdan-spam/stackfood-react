import React from 'react';
import {Stack} from "@mui/system";
import {CustomSpinner} from "../HomeStyle";
import {useTheme} from "@emotion/react";

const DotSpin = () => {
     const theme=useTheme()
    return (
        <Stack width="100%" justifyContent="Center" alignItems="center">
        <CustomSpinner color={theme.palette.primary.main}></CustomSpinner>
        </Stack>

    );
};

export default DotSpin;
