import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Rating } from '@mui/material'
import { Stack } from '@mui/material'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import { CustomRating } from './CustomRating.style'

const CustomRatings = ({
    handleChangeRatings,
    ratingValue,
    readOnly,
    color,
}) => {
    const [value, setValue] = useState(ratingValue ? ratingValue : 0)
    const handleChange = (event, newValue) => {
        if (!readOnly) {
            setValue(newValue)
            handleChangeRatings(newValue)
        }
    }

    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
            <CustomRating
                color={color}
                precision={0.5}
                readOnly={readOnly}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => handleChange(event, newValue)}
            />
            {readOnly && (
                <CustomColouredTypography color={color} smallFont="12px">
                    ({ratingValue})
                </CustomColouredTypography>
            )}
        </Stack>
    )
}

CustomRatings.propTypes = {}

export default CustomRatings
