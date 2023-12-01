import React, { useState } from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {
    alpha,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    InputBase,
    Paper,
} from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomTypographyGray } from '../error/Errors.style'
import { StyledButton } from '../food-card/FoodCard.style'
import { usePostNewsletterEmail } from '../../hooks/react-query/newsletter/usePostNewsletterEmail'
import { toast } from 'react-hot-toast'
import { onErrorResponse, onSingleErrorResponse } from "../ErrorResponse";
import LoadingButton from '@mui/lab/LoadingButton'
import CustomContainer from '../container'
import CustomImageContainer from '../CustomImageContainer'
import burgerImage from '../../../public/static/vecteezy_burger-png-graphic-clipart-design_19607061_179 1.svg'
import cteezyImage from '../../../public/static/vecteezy.svg'
import { useTheme } from '@emotion/react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Stack } from '@mui/system'
import { RTL } from '../RTL/RTL'
import { useSelector } from 'react-redux'
const FooterTop = ({ landingPageData }) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [emailAddress, setEmailAddress] = useState(null)

    const { t } = useTranslation()
    const languageDirection = localStorage.getItem('direction')
    const { mutate, isLoading } = usePostNewsletterEmail()
    const handleSuccess = () => {
        toast.success(t('Subscribed Successfully'), {
            id: 'subscribed-toaster',
        })
        setEmailAddress('')
    }
    const handleSubmit = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (regex.test(emailAddress) === true) {
            mutate(
                { email: emailAddress },
                {
                    onSuccess: handleSuccess,
                    onError: onErrorResponse,
                }
            )
        } else {
            toast.error(t('Please insert a valid email.'))
        }
    }

    return (
        <CustomStackFullWidth
            alignItems="center"
            sx={{
                backgroundColor: (theme) => theme.palette.footerTopBg,
            }}
        >
            <CustomContainer>
                <Grid
                    container
                    paddingY={{ xs: '1rem', sm: '1.5rem', md: '2rem' }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        md={2.5}
                        textAlign="center"
                        marginBottom={!isXSmall && '-39px'}
                    >
                        {!isXSmall && (
                            <CustomImageContainer
                                src={cteezyImage.src}
                                width="210px"
                                height="100px"
                                objectFit="contain"
                                smWidth="150px"
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        textAlign={{ xs: 'center', sm: 'left', md: 'left' }}
                    >
                        <CustomStackFullWidth>
                            <CustomColouredTypography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontweight="600"
                            >
                                {landingPageData?.news_letter_title}
                            </CustomColouredTypography>
                            <CustomTypographyGray
                                nodefaultfont="true"
                                variant="h5"
                                fontweight="400"
                            >
                                {landingPageData?.news_letter_sub_title}
                            </CustomTypographyGray>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} textAlign="center">
                        <RTL direction={languageDirection}>
                            <Paper
                                // variant="outlined"
                                elevation={0}
                                sx={{
                                    mt: 1,
                                    p: '0',
                                    display: 'flex',
                                    alignItems: 'center',

                                    width: '100%',
                                    maxWidth: '362px',
                                    // ml: web ? 'none' : 'auto',
                                    mr: 'auto',
                                    ml: 'auto',
                                    background: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? alpha(
                                                  theme.palette.neutral[100],
                                                  0.7
                                              )
                                            : theme.palette.whiteContainer.main,
                                }}
                            >
                                <InputBase
                                    sx={{
                                        ml: 1.5,
                                        padding: '8px',
                                        flex: 1,
                                        color: (theme) =>
                                            theme.palette.neutral[500],
                                        align: 'center',
                                    }}
                                    value={emailAddress}
                                    type="email"
                                    placeholder={t('Your Email Address')}
                                    onChange={(e) =>
                                        setEmailAddress(e.target.value)
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <LoadingButton
                                                loading={isLoading}
                                                type="submit"
                                                onClick={handleSubmit}
                                                sx={{
                                                    background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.customColor.eight} 0%, ${theme.palette.customColor.nine} 100%)`,
                                                    borderRadius: '5px',
                                                    minWidth: '45px',
                                                    padding: '5px 10px',
                                                }}
                                            >
                                                <KeyboardArrowRightIcon
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette
                                                                .neutral[100],
                                                        transform:
                                                            languageDirection ===
                                                                'rtl' &&
                                                            'rotate(180deg)',
                                                    }}
                                                />
                                            </LoadingButton>
                                        </InputAdornment>
                                    }
                                />
                            </Paper>
                        </RTL>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        md={2.5}
                        marginBottom={!isXSmall && '-32px'}
                        textAlign="center"
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            marginBottom={isXSmall && '-39px'}
                        >
                            {isXSmall && (
                                <CustomImageContainer
                                    src={cteezyImage.src}
                                    width="210px"
                                    height="100px"
                                    objectFit="contain"
                                    smWidth="103px"
                                />
                            )}
                            <CustomImageContainer
                                src={burgerImage.src}
                                width="210px"
                                height="100px"
                                smHeight="93px"
                                objectFit="contain"
                                smWidth="103px"
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

export default FooterTop
