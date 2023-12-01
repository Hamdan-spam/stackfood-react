import { Grid, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style';
import CustomImageContainer from '../CustomImageContainer';

const PromotionalBanner = () => {
    const { global } = useSelector((state) => state.globalSettings);
    const globalImageUrl = global?.base_urls?.banner_image_url
    return (
        <Stack padding={{xs:"30px 0px 5px", md:"40px 0 15px"}} >
            <CustomImageContainer
                src={`${globalImageUrl}/${global?.banner_data?.promotional_banner_image}`}
                alt={global?.banner_data?.promotional_banner_title}
                borderRadius="8px"
            />
        </Stack>
    )
}

export default PromotionalBanner