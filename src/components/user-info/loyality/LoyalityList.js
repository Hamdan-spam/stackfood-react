import React, { useEffect, useState } from 'react'
import { Grid, Box, Button, Typography, List, ListItem } from '@mui/material'

import Tropy from '../../../../public/static/profile/loyalty.svg'
import { WallateBox, WallateBoxSection } from './Loyality.style'
import { useTranslation } from 'react-i18next'
import LoyalityPage from './LoyalityPage'
import { useQuery } from 'react-query'
import { LoyalityApi } from '../../../hooks/react-query/config/LoyalityApi'
import { getTotalLoyalityAmount } from '../../../utils/customFunctions'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import WalletShimmer from '../wallets/WalletShimmer'
import CartClearModal from '../../foodDetail-modal/CartClearModal'
import LoyalityModal from '../../../pages/info/loyality/LoyalityModal'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { WalletBox, WalletBoxSection } from '../wallets/Wallets.style'
import CustomePagination from '../../pagination/Pagination'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { PrimaryButton } from '../../products-page/FoodOrRestaurant'
import nodata from '../../../../public/static/nodata.png'
import { onSingleErrorResponse } from '../../ErrorResponse'
import { useSelector } from 'react-redux'
import CustomImageContainer from '../../CustomImageContainer'
import walletImage from '../../../../public/static/profile/wa.svg'
import { useTheme } from '@mui/material/styles'
import PaidIcon from '@mui/icons-material/Paid'
import ScrollerProvider from '../../scroller-provider'
import Skeleton from '@mui/material/Skeleton'
import Meta from '../../Meta'
import { noTransactionFound } from '../../../utils/LocalImages'
const LoyalityList = () => {
    const { global } = useSelector((state) => state.globalSettings)
    const [page_limit, setPageLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const [loyalityModal, setLoyalityModal] = useState(false)
    const { t } = useTranslation()
    const theme = useTheme()

    const handleLoyalityModal = () => setLoyalityModal(true)
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['loyality-list'],
        () => LoyalityApi.loayalityList(offset),
        {
            enabled: false,
            onError: onSingleErrorResponse,
        }
    )
    useEffect(async () => {
        await refetch()
    }, [])
    useEffect(async () => {
        await refetch()
    }, [offset])

    const {
        isLoading: profileDataLoading,
        data: profileData,
        refetch: profileRefatch,
    } = useQuery(['profile-info'], ProfileApi.profileInfo)

    const convertLoyalty = () => {
        handleLoyalityModal()
    }
    const textColor = theme.palette.neutral[100]
    return (
        <>
            <Meta
                title={` My Loyalty-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="space-between"
                sx={{ height: '100%' }}
            >
                <CustomPaperBigCard>
                    <Grid container spacing={2}>
                        <Grid item sm={12} xs={12} md={4}>
                            <WalletBox>
                                <CustomStackFullWidth
                                    spacing={0.5}
                                    sx={{ flexWrap: 'wrap' }}
                                >
                                    <CustomImageContainer
                                        src={Tropy.src}
                                        width="34px"
                                        height="34px"
                                        objectFit="contain"
                                    />
                                    <Typography
                                        fontSize="36px"
                                        fontWeight="700"
                                        color={theme.palette.neutral[100]}
                                    >
                                        {profileDataLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width={150}
                                                height="50px"
                                            />
                                        ) : (
                                            profileData?.data?.loyalty_point
                                        )}
                                    </Typography>
                                    <Typography
                                        fontSize="12px"
                                        fontWeight="400"
                                        color={theme.palette.neutral[100]}
                                    >
                                        {t('Total Point')}
                                    </Typography>
                                </CustomStackFullWidth>
                            </WalletBox>
                        </Grid>
                        <Grid item sm={12} xs={12} md={8}>
                            <CustomStackFullWidth
                                alignItems="start"
                                justifyContent="center"
                                sx={{ height: '100%' }}
                                spacing={1}
                            >
                                <Typography fontSize="14px" fontWeight="700">
                                    {t('How to use')}
                                </Typography>
                                <List
                                    sx={{
                                        listStyleType: 'disc',
                                        pl: 4,
                                        pt: 0,
                                        '& .MuiListItem-root': {
                                            display: 'list-item',
                                            paddingLeft: '0px',
                                            paddingBottom: '0px',
                                            paddingTop: '0px',
                                        },
                                    }}
                                >
                                    <ListItem>
                                        <Typography
                                            fontSize="13px"
                                            fontWeight="400"
                                        >
                                            {t(
                                                'Convert your loyalty point to wallet money.'
                                            )}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography
                                            fontSize="13px"
                                            fontWeight="400"
                                        >
                                            {t(
                                                `Minimum ${global?.minimum_point_to_transfer} points required to convert into currency`
                                            )}
                                        </Typography>
                                    </ListItem>
                                </List>
                                <PrimaryButton
                                    startIcon={<PaidIcon />}
                                    style={{ color: textColor }}
                                    backgroundColor={theme.palette.primary.main}
                                    sx={{ borderRadius: '10px' }}
                                    onClick={() => convertLoyalty()}
                                >
                                    {t('Convert to Currency')}
                                </PrimaryButton>
                            </CustomStackFullWidth>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Box sx={{ padding: '10px' }}>
                                <Typography fontSize="16px" fontWeight="500">
                                    {t('Point History')}
                                </Typography>
                            </Box>
                            <ScrollerProvider maxHeight="40vh">
                                {data ? (
                                    data?.data?.data?.map((loyality) => (
                                        <LoyalityPage
                                            key={loyality.id}
                                            data={{ loyality }}
                                            profileDataLoading={
                                                profileDataLoading
                                            }
                                        />
                                    ))
                                ) : (
                                    <WalletShimmer />
                                )}
                            </ScrollerProvider>
                            {data?.data?.data?.length === 0 && (
                                <div>
                                    <CustomEmptyResult
                                        label="No Data Found"
                                        image={noTransactionFound}
                                    />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                    <CustomStackFullWidth
                        sx={{ height: '50px' }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {data?.data?.total_size >= page_limit && (
                            <CustomePagination
                                offset={offset}
                                page_limit={page_limit}
                                setOffset={setOffset}
                                total_size={data?.data?.total_size}
                            />
                        )}
                    </CustomStackFullWidth>
                    {loyalityModal && (
                        <LoyalityModal
                            setLoyalityModal={setLoyalityModal}
                            loyalitydata={profileData?.data?.loyalty_point}
                            refetch={refetch}
                            profileRefatch={profileRefatch}
                            loyalityModal={loyalityModal}
                        />
                    )}
                </CustomPaperBigCard>
            </CustomStackFullWidth>
        </>
    )
}

export default LoyalityList
