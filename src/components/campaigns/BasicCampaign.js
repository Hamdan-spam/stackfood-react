import React from 'react'
import { Typography } from '@mui/material'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Stack } from '@mui/system'
import { useTheme } from '@emotion/react'
import CustomImageContainer from '../CustomImageContainer'
import MiddleSection from './MiddleSection'
import ItemSection from './ItemSection'

const BasicCampaign = ({
    campaignsDetails,
    configData,
    isRefetching,
    isLoading,
}) => {
    const theme = useTheme()

    const camImage = `${configData?.base_urls?.campaign_image_url}/${campaignsDetails?.image}`
    return (
        <CustomStackFullWidth>
            <Stack
                spacing={3}
                justifyContent="center"
                alignItems="center"
                paddingBottom="2rem"
                paddingTop="1rem"
            >
                <CustomImageContainer
                    src={camImage}
                    width="100%"
                    height="300px"
                    smHeight="150px"
                    objectFit="cover"
                    borderRadius=".5rem"
                />
                <CustomStackFullWidth spacing={{ xs: 1, md: 3 }}>
                    <MiddleSection
                        campaignsDetails={campaignsDetails}
                        image={camImage}
                    />
                    <ItemSection
                        configData={configData}
                        campaignsDetails={campaignsDetails}
                        isLoading={isLoading}
                        isRefetching={isRefetching}
                    />
                </CustomStackFullWidth>
            </Stack>
        </CustomStackFullWidth>
    )
}

export default BasicCampaign
