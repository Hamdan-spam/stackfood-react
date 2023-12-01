import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import {
    CustomAppbarFilter,
    CustomTypographyForSideDrawerFilter,
    WrapperForSideDrawerFilter,
} from '../../gurbage/admin/components/filter/SideDrawerFilter.style'
import Toolbar from '@mui/material/Toolbar'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import CustomDateRangePicker from '../custom-date-range-picker/CustomDateRangePicker'
import CustomMultiSelectTags from '../custom-multi-select-tags/CustomMultiSelectTags'
import {
    CustomButtonGray,
    CustomButtonPrimary,
} from '../../styled-components/CustomButtons.style'
//import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'
import { useTranslation } from 'react-i18next'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import CustomSlider from '../custom-slider/CustomSlider'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomGroupCheckbox from '../custom-group-checkboxs/CustomGroupCheckbox'
import { useDispatch, useSelector } from 'react-redux'
import {
    setFilterbyByCuisineDispatch,
    setFilterbyByDispatch,
    setFilterDrawerOpenByDispatch,
    setPriceByDispatch,
    setRatingByDispatch,
    setSortbyByDispatch,
} from '../../redux/slices/searchFilter'
import { setIconicSidebar } from '../../redux/slices/layout'
import ButtonGroups from './ButtonGroups'
import { useGetCuisines } from '../../hooks/react-query/cuisines/useGetCuisines'
import SimpleBar from 'simplebar-react'
import { searchMockData } from './SearchMockData'

const FilterCard = ({
    setSideDrawerOpen,
    handleDropClose,
    handleFilter,
    handleClearAll,
    foodOrRestaurant,
    sideDrawerOpen,
    stateData,
    setStateData,
}) => {
    const { t } = useTranslation()
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [storeData, setStoreData] = useState({ ...filterData })
    const [cuisineState, setCuisineState] = useState([])
    const [isFilterCall, setIsFilterCall] = useState(false)
    const dispatch = useDispatch()
    const handleFilterBy = () => {
        const activeFilters = stateData.filter((item) => item.isActive === true)
        dispatch(setFilterbyByDispatch(activeFilters))

    }
    useEffect(() => {
        if (isFilterCall) {
            handleFilterBy()
        }
    }, [stateData, storeData])

    return (
        <Box>
            <WrapperForSideDrawerFilter smminwith="270px">
                <Stack spacing={3}>
                    {/*<Stack spacing={1}>*/}
                    {/*    <Typography variant="h4">{t('Sort By')}</Typography>*/}
                    {/*    <ButtonGroups handleSortBy={handleSortBy} />*/}
                    {/*</Stack>*/}
                    <Stack spacing={1}>
                        <Typography variant="h4">{t('Filter By')}</Typography>
                        <Stack direction="row">
                            <CustomGroupCheckbox
                                handleChangeFilter={handleFilterBy}
                                // checkboxState={filterData.filterBy}
                                checkboxData={stateData?.slice(1)}
                                stateData={stateData}
                                setStateData={setStateData}
                                setIsFilterCall={setIsFilterCall}
                            />
                        </Stack>
                    </Stack>

                </Stack>
            </WrapperForSideDrawerFilter>
        </Box>
    )
}

FilterCard.propTypes = {}

export default FilterCard
