import React, { useEffect, useState } from 'react'
import { WrapperForSideDrawerFilter } from '../../../gurbage/admin/components/filter/SideDrawerFilter.style'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import CustomGroupCheckbox from '../../custom-group-checkboxs/CustomGroupCheckbox'
import SimpleBar from 'simplebar-react'
import CustomSlider from '../../custom-slider/CustomSlider'
import CustomRatings from '../../custom-ratings/CustomRatings'
import {
    CustomButtonGray,
    CustomButtonPrimary,
} from '../../../styled-components/CustomButtons.style'
import { t } from 'i18next'
import GroupCheckBox from './GroupCheckBox'
import { useSelector } from "react-redux";

const RestaurantFilterCard = (props) => {
    const { checkboxData, setCheckedFilterKey } = props
    const { global } = useSelector((state) => state.globalSettings)
    const [checkData, setCheckData] = useState([])

    return (
        <WrapperForSideDrawerFilter>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography variant="h4">{t('Filter By')}</Typography>
                    <Stack direction="row">
                        <GroupCheckBox
                            checkboxData={global?.toggle_veg_non_veg === false ? checkboxData?.slice(2):checkboxData}
                            setCheckedFilterKey={setCheckedFilterKey}
                        />
                    </Stack>
                </Stack>
            </Stack>
            {/*<Stack*/}
            {/*    direction={{ xs: 'column', sm: 'column', md: 'row' }}*/}
            {/*    alignItems="center"*/}
            {/*    justifyContent="center"*/}
            {/*    spacing={2}*/}
            {/*    mt="1rem"*/}
            {/*>*/}
            {/*    <CustomButtonPrimary fullWidth onClick={submitFilter}>*/}
            {/*        {t('Filter')}*/}
            {/*    </CustomButtonPrimary>*/}
            {/*</Stack>*/}
        </WrapperForSideDrawerFilter>
    )
}

export default RestaurantFilterCard
