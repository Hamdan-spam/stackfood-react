import React from 'react'
import { IconButton } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import facebookIcon from '../../../public/static/footer/socialicons/fbColor.png'
import instraIcon from '../../../public/static/footer/socialicons/instraColor.png'
import pinterestIcon from '../../../public/static/footer/socialicons/pinterest.png'
import linkedin from '../../../public/static/footer/socialicons/linkedIn.png'
import twitterIcon from '../../../public/static/footer/socialicons/twitter.png'
import youtube from '../../../public/static/footer/socialicons/youtubeColor.png'
import errorImage from '../../../public/static/no-image-found.png'
import CustomImageContainer from '../CustomImageContainer'
import { RTL } from '../RTL/RTL'

const SocialLinks = (props) => {
    const { global } = props
    const { t } = useTranslation()
    const clickHandler = (link) => {
        window.open(link)
    }
    const iconHandler = (name) => {
        switch (name) {
            case 'facebook':
                return facebookIcon.src
            case 'instagram':
                return instraIcon.src
            case 'twitter':
                return twitterIcon.src
            case 'linkedin':
                return linkedin.src
            case 'pinterest':
                return pinterestIcon.src
            case 'youtube':
                return youtube.src
            default:
                return errorImage.src
        }
    }
    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <RTL direction={languageDirection}>
            <CustomStackFullWidth
                direction="row"
                spacing={3}
                alignItems="center"
                justifyContent={{ xs: 'center' }}
            >
                {global &&
                    global?.social_media?.length > 0 &&
                    global?.social_media?.map((item, index) => {
                        const { name, link } = item
                        return (
                            <IconButton
                                sx={{ padding: '0px' }}
                                key={index}
                                color="primary"
                                onClick={() => clickHandler(link)}
                            >
                                <CustomImageContainer
                                    src={iconHandler(name)}
                                    alt={name}
                                    height="25px"
                                    width="25px"
                                    objectFit="contain"
                                />
                            </IconButton>
                        )
                    })}
            </CustomStackFullWidth>
        </RTL>
    )
}

SocialLinks.propTypes = {}

export default SocialLinks
