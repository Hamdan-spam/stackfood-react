import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { CustomButton } from './Landingpage.style'
import CustomImageContainer from '../CustomImageContainer'
import GooglePlay from '../../../public/static/GooglePlay.png'
import AppStore from '../../../public/static/AppStore.png'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const AppLinks = (props) => {
    const { global, download_app_data, width } = props
    const goToApp = (href) => {
        window.open(href)
    }
    let languageDirection
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            gap={languageDirection === 'rtl' && '10px'}
        >
            {download_app_data?.react_download_apps_play_store
                ?.react_download_apps_play_store_status === '1' && (
                <CustomButton
                    onClick={() =>
                        goToApp(
                            download_app_data?.react_download_apps_play_store
                                ?.react_download_apps_play_store_link
                        )
                    }
                >
                    <CustomImageContainer
                        src={GooglePlay.src}
                        alt="GooglePlay"
                        objectFit="contained"
                    />
                </CustomButton>
            )}

            {download_app_data?.react_download_apps_app_store
                ?.react_download_apps_link_status === '1' && (
                <CustomButton
                    onClick={() =>
                        goToApp(
                            download_app_data?.react_download_apps_app_store
                                ?.react_download_apps_link
                        )
                    }
                >
                    <CustomImageContainer
                        src={AppStore.src}
                        alt="GooglePlay"
                        objectFit="contained"
                    />
                </CustomButton>
            )}

            {/* </Link> */}
        </Stack>
    )
}

AppLinks.propTypes = {}

export default AppLinks
