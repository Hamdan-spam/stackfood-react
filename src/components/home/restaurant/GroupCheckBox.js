import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { CustomTypographyLabel } from '../../../styled-components/CustomTypographies.style'
import { Skeleton, Stack } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import { t } from 'i18next'

const GroupCheckBox = ({
    checkboxData,
    handleFilterData,
    setCheckedFilterKey,
}) => {
    const handleChange = (event, id) => {
        let newArr = checkboxData.map((item) =>
            item?.id === id ? { ...item, isActive: event.target.checked } : item
        )

        setCheckedFilterKey(newArr)
        //
    }

    return (
        <div>
            <FormGroup>
                {checkboxData?.map((item) => {
                    return (
                        <FormControlLabel
                            key={item?.id}
                            value={item?.value}
                            name={item?.value}
                            control={
                                <Checkbox
                                    onChange={(event) =>
                                        handleChange(event, item.id)
                                    }
                                    checked={item?.isActive}
                                />
                            }
                            label={
                                <CustomTypographyLabel>
                                    {t(item?.name)}
                                </CustomTypographyLabel>
                            }
                        />
                    )
                })}
            </FormGroup>
        </div>
    )
}

export default GroupCheckBox
