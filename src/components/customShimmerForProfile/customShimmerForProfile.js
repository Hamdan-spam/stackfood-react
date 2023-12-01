import React from 'react'
import { CustomBoxFullWidth } from '../../styled-components/CustomStyles.style'
import WidgetShimmer from './WidgetShimmer'
import CustomShimmerForForm from './CustomShimmerForForm'

const CustomShimmerForProfile = () => {
    return (
        <CustomBoxFullWidth  sx={{minHeight:"77px"}} >
            <WidgetShimmer />
            <CustomShimmerForForm />
        </CustomBoxFullWidth>
    )
}

export default CustomShimmerForProfile
