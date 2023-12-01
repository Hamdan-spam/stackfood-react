import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { PrimaryButton } from './FoodOrRestaurant'
import { useTranslation } from 'react-i18next'
import { Button, Chip, Grid, Popover, Stack, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { CustomTypography } from '../custom-tables/Tables.style'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import SideDrawerFilter from '../../gurbage/admin/components/filter/SideDrawerFilter'
import result_count from '../../../public/static/result_count.svg'
import FilterCard from './FilterCard'
import { useDispatch } from 'react-redux'
import {
    setFilterbyByDispatch,
    setFilterDrawerOpenByDispatch,
} from '../../redux/slices/searchFilter'
import CustomImageContainer from '../CustomImageContainer'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTheme } from '@mui/material/styles'
import FilterButton from '../Button/FilterButton'
import Skeleton from '@mui/material/Skeleton'
import foodCount from '../../../public/static/image 28 (5).svg'
import { RTL } from '../RTL/RTL'
import { searchMockData } from './SearchMockData'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const FilterWithSideDrawer = ({
    handleFilter,
    handleClearAll,
    foodOrRestaurant,
    count,
    isNetworkCalling,
    page,
    restaurantType,
    isLoading,
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const theme = useTheme()
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    const [stateData, setStateData] = useState(searchMockData)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleDelete = (item) => {
        const tempData = stateData.map((items) =>
            items?.id === item?.id ? { ...items, isActive: false } : items
        )
        setStateData(tempData)
        const hasActive = tempData?.filter((item) => item.isActive)
        dispatch(setFilterbyByDispatch(hasActive))
        handleFilter()
    }

    const handleViewToFood = () => {
        if (page) {
            const isViewAllActive = stateData.map((item) =>
                item?.value === page
                    ? { ...item, isActive: true }
                    : { ...item, isActive: false }
            )
            setStateData(isViewAllActive)
        }
    }
    useEffect(() => {
        handleViewToFood()
    }, [page])

    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    const handleViewToRestaurant = () => {
        if (restaurantType) {
            const isViewAllActive = stateData.map((item) =>
                item?.value === restaurantType
                    ? { ...item, isActive: true }
                    : { ...item, isActive: false }
            )
            setStateData(isViewAllActive)
        }
    }
    useEffect(() => {
        handleViewToRestaurant()
    }, [restaurantType])

    useEffect(() => {
        if (!page && restaurantType) {
            const resetState = stateData.map((item) =>
                item?.isActive ? { ...item, isActive: false } : item
            )
            setStateData(resetState)
        }
    }, [foodOrRestaurant])
    const hasActive = stateData?.filter((item) => item?.isActive)
    return (
        <RTL direction={languageDirection}>
            <Grid item xs={12} sm={12} md={3}>
                {isNetworkCalling || isLoading ? (
                    <Skeleton
                        width="100%"
                        height="30px"
                        variant="rectangular"
                    />
                ) : (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CustomImageContainer
                            src={
                                foodOrRestaurant === 'products'
                                    ? foodCount.src
                                    : result_count.src
                            }
                            width="26px"
                            height="26px"
                        />
                        <Typography color={theme.palette.neutral[1000]}>
                            {' '}
                            <Typography component="span">{count} </Typography>
                            {foodOrRestaurant === 'products'
                                ? t('foods')
                                : t('Restaurants')}{' '}
                        </Typography>
                    </Stack>
                )}
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={9}
                marginTop={{ xs: '12px', sm: '10px', md: '0px' }}
            >
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <SimpleBar style={{ width: '100%' }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={{
                                xs: 'flex-start',
                                sm: 'flex-start',
                                md: 'flex-end',
                            }}
                        >
                            {hasActive?.map((item) => (
                                <Chip
                                    label={t(item?.name)}
                                    variant="outlined"
                                    onDelete={() => handleDelete(item)}
                                />
                            ))}
                        </Stack>
                    </SimpleBar>
                    <FilterButton
                        id="fade-button"
                        handleClick={handleDropClick}
                    />
                </Stack>
                <Popover
                    onClose={() => handleDropClose()}
                    id="fade-button"
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{
                        zIndex: 999,
                        top: '12px',
                    }}
                >
                    <FilterCard
                        handleDropClose={handleDropClose}
                        handleFilter={handleFilter}
                        handleClearAll={handleClearAll}
                        foodOrRestaurant={foodOrRestaurant}
                        sideDrawerOpen={sideDrawerOpen}
                        stateData={stateData}
                        setStateData={setStateData}
                    />
                </Popover>
            </Grid>
        </RTL>
    )
}

FilterWithSideDrawer.propTypes = {}

export default FilterWithSideDrawer
