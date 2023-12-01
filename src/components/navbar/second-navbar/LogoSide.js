import React from 'react'
import PropTypes from 'prop-types'
import CustomLogo from '../../CustomLogo'
import Image from 'next/image'

const LogoSide = ({ global, width, businessLogo }) => {
    const businessLogoUrl = global?.base_urls?.business_logo_url
    return (
        <CustomLogo
            atlText="logo"
            logoImg={`${businessLogoUrl}/${businessLogo}`}
            height="1.5rem"
            width={width}
        />
    )
}

LogoSide.propTypes = {}

export default LogoSide
