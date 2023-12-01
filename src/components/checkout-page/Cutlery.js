import React, { useState } from 'react'

import { Stack } from '@mui/system'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomSwitch } from '../navbar/Navbar.style'
import CutleryIcon from './CutleryIcon'

const Cutlery = (props) => {
    const { isChecked, handleChange } = props
    const [checked, setChecked] = useState(isChecked)
    const { t } = useTranslation()
    const handleChangeInner = (event) => {
        setChecked(event.target.checked)
        handleChange?.(event.target.checked)
    }
    return (
        <CustomStackFullWidth
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            p="5px"
            spacing={0.5}
        >
            <CustomStackFullWidth
                direction="row"
                alignItems="flex-start"
                spacing={2}
            >
                <CutleryIcon />
                <Stack>
                    <Typography color="primary" fontWeight="bold" mt="-2px">
                        {t('Add Cutlery')}
                    </Typography>
                    <Typography color="text.secondary" fontSize="12px">
                        {t('Dont have a cutlery? Restaurant will provide you.')}
                    </Typography>
                </Stack>
            </CustomStackFullWidth>
            <CustomSwitch
                checked={checked}
                onChange={handleChangeInner}
                noimage="true"
            />
        </CustomStackFullWidth>
    )
}

Cutlery.propTypes = {}

export default Cutlery
