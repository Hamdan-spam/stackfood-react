import React, { useEffect, useRef, useState } from 'react'
import { Grid, NoSsr, Stack, Typography, useMediaQuery } from '@mui/material'
import ImageNotFound from '../../../public/static/no-image-found.png'
import { useTranslation } from 'react-i18next'
import {
    CustomStackFullWidth,
    SliderCustom,
} from '../../styled-components/CustomStyles.style'
import vectorOne from '../../../public/static/shapes/Vector3.png'
import vectorTwo from '../../../public/static/shapes/Vector4.svg'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTheme } from '@mui/material/styles'
import Skeleton from '@mui/material/Skeleton'
import CustomContainer from '../container'
import { CustomTypographyGray } from '../error/Errors.style'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { RTL } from '../RTL/RTL'
import CustomImageContainer from '../CustomImageContainer'
import FunSectionShimmer from './FunSectionShimmer'
import { ReadMore } from './ReadMore'
import LandingFeatureSvg from './Landingfeature'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { HandleNext, HandlePrev } from '../CustomSliderIcon'
import { landingFeatureSettings } from './landingFeatureSettings'
import LandingFeatureSvg1 from './link-section/LandingFeatureSvg1'

const FunFactSection = ({ react_feature, global, isLoading, fun_base_url }) => {
    const [featureData, setFeatureData] = useState([])
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isLarge = useMediaQuery(theme.breakpoints.up('sm'))
    const { t } = useTranslation()
    const discountRef = useRef(null)

    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    const styles = {
        maxWidth: 1200,
        width: '100%',

        // maxHeight: 200,
        // height: "100%"
    }
    const mainComponent = () => {
        return (
            <CustomStackFullWidth sx={{ marginTop: '25px' }}>
                {!isLoading ? (
                    <SliderCustom
                        languageDirection={languageDirection}
                        gap="0px"
                    >
                        <Slider {...landingFeatureSettings} ref={discountRef}>
                            {react_feature?.map((item, index) => {
                                return (
                                    <Stack key={index} position="relative">
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            spacing={1}
                                            flexWrap="wrap"
                                        >
                                            <CustomImageContainer
                                                src={`${fun_base_url}/${item.image}`}
                                                alt="icon"
                                                width="121px"
                                                height="140px"
                                                objectFit="contain"
                                                smWidth="60px"
                                                smHeight="60px"
                                            />
                                            <CustomTypography
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: {
                                                        xs: '14px',
                                                        md: '16px',
                                                    },
                                                }}
                                            >
                                                {item?.title}
                                            </CustomTypography>
                                            {item?.sub_title && (
                                                <Typography
                                                    fontSize={{
                                                        xs: '10px',
                                                        sm: '14px',
                                                        md: '14px',
                                                    }}
                                                    fontWeight="400"
                                                    color={
                                                        theme.palette
                                                            .neutral[600]
                                                    }
                                                >
                                                    {item?.sub_title}
                                                </Typography>
                                            )}
                                        </Stack>

                                        {index % 2 === 0
                                            ? react_feature.length - 1 !==
                                                  index && (
                                                  <Stack
                                                      position="absolute"
                                                      left="54%"
                                                      top={
                                                          isSmall
                                                              ? '-14px'
                                                              : '37px'
                                                      }
                                                      maxWidth={{
                                                          xs: '177px',
                                                          sm: '344px',
                                                          md: '344px',
                                                      }}
                                                      width="100%"
                                                  >
                                                      <LandingFeatureSvg width="100%" />
                                                  </Stack>
                                              )
                                            : react_feature.length - 1 !==
                                                  index && (
                                                  <Stack
                                                      position="absolute"
                                                      left="59%"
                                                      top={
                                                          isSmall
                                                              ? '-11px'
                                                              : '35px'
                                                      }
                                                      maxWidth={{
                                                          xs: '162px',
                                                          sm: '309px',
                                                          md: '309px',
                                                      }}
                                                      width="100%"
                                                  >
                                                      <LandingFeatureSvg1 width="100%" />
                                                  </Stack>
                                              )}
                                    </Stack>
                                )
                            })}
                        </Slider>
                    </SliderCustom>
                ) : (
                    <>
                        <Slider {...landingFeatureSettings} ref={discountRef}>
                            {[...Array(3)].map((item) => {
                                return <FunSectionShimmer />
                            })}
                        </Slider>
                    </>
                )}
            </CustomStackFullWidth>
        )
    }
    return (
        <CustomContainer>
            {react_feature?.length > 3 ? (
                <>{mainComponent()}</>
            ) : (
                <RTL direction={languageDirection}> {mainComponent()}</RTL>
            )}
        </CustomContainer>
    )
}

export default FunFactSection
