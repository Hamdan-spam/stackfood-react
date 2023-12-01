import React, {useEffect} from 'react';
import {Stack, useMediaQuery} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {useTheme} from "@emotion/react";

const FunSectionShimmer = () => {
    const theme=useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    let count
    const handleCount=()=>{
        if (isXSmall) {
            count=1
        } else if (isSmall) {
            count=3
        }
        return count
    }
    return (
       <>
           <Stack direction="row" width="100%"   justifyContent="space-between" alignItems="center" paddingX="20px">
           {[...Array(handleCount())].map((categoryItem) => (

                   <Stack spacing={1} justifyContent="center" alignItems="center">
                       <Skeleton variant="rectangular" width="121px" height="140px" animation="wave"/>
                       <Skeleton variant="text" width="90px" height="20px" animation="wave"/>
                       <Skeleton variant="text" width="200px" height="20px" animation="wave"/>
                   </Stack>
           ))}
           </Stack>
       </>
    );
};

export default FunSectionShimmer;
