import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { CustomTypographyLabel } from '../../styled-components/CustomTypographies.style'
import { Skeleton, Stack } from '@mui/material'
import { t } from 'i18next'
import { useTheme } from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { setSearchTagData } from "../../redux/slices/searchTagSlice";


const CustomGroupCheckbox = (props) => {
  const dispatch=useDispatch()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const {
        checkboxState,
        setIsFilterCall,
        forcuisine,
        checkboxData,
        stateData,
        setStateData,
        isLoading,
        setCuisineState,
        cuisineState,
    } = props
    const handleChangeCuisine = (event, id) => {
        let newCuisines = cuisineState?.map((item) =>
            item?.id === id ? { ...item, isActive: event.target.checked } : item
        )
        setCuisineState(newCuisines)
    }

    const handleChange = (event, id) => {

        if (id === 0 || id ===2) {
            // Toggle the isActive state for 'Veg' and 'Non-Veg' without affecting others
          let  newArr = stateData.map((item) =>
                item.id === id
                    ? { ...item, isActive:event.target.checked }
                    : item.id ===0 || item.id ===2
                        ? { ...item, isActive:false }
                        : item
            );
            setStateData(newArr)
            setIsFilterCall(true)
        } else {
            let newArr = stateData.map((item) =>
                item?.id === id ? { ...item, isActive: event.target.checked } : item
            )
            //dispatch(setSearchTagData(newArr))
            setStateData(newArr)
            setIsFilterCall(true)
        }

    }

    return (
        <div>
            {forcuisine === 'true' ? (
                <FormGroup>
                    {checkboxData?.map((item) => {
                        return (
                            <FormControlLabel
                                key={item?.id}
                                value={item?.name}
                                control={
                                    <Checkbox
                                        onChange={(event) =>
                                            handleChangeCuisine(event, item.id)
                                        }
                                        checked={item?.isActive}
                                    />
                                }
                                label={
                                    <CustomTypographyLabel>
                                        {item?.name}
                                    </CustomTypographyLabel>
                                }
                            />
                        )
                    })}
                    {isLoading && (
                        <>
                            <Stack spacing={1}>
                                <Skeleton
                                    variant="rectangular"
                                    width={100}
                                    height={20}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={100}
                                    height={20}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={100}
                                    height={20}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={100}
                                    height={20}
                                />
                            </Stack>
                        </>
                    )}
                </FormGroup>
            ) : (
                <FormGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxWidth: isSmall ? '170px' : '350px',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    {checkboxData?.map((item) => {
                        return (
                            <FormControlLabel
                                sx={{
                                    maxWidth: isSmall ? '150px' : '170px',
                                    width: '100%',
                                    textAlign: 'left',
                                }}
                                key={item?.id}
                                value={item?.value}
                                control={
                                    <Checkbox
                                        onChange={(event) =>
                                            handleChange(event, item.id)
                                        }
                                        checked={item?.isActive}
                                    />
                                }
                                label={
                                    <CustomTypographyLabel
                                        isSmall={isSmall}
                                        sx={{ textAlign: 'left' }}
                                    >
                                        {t(item?.name)}
                                    </CustomTypographyLabel>
                                }
                            />
                        )
                    })}
                </FormGroup>
            )}
        </div>
    )
}

CustomGroupCheckbox.propTypes = {}

export default CustomGroupCheckbox
