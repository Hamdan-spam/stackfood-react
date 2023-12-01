import React from 'react'
import PropTypes from 'prop-types'
import { InputField, SaveAddressBox } from './CheckOut.style'
import { InputBase, Typography } from '@mui/material'
import AddNewAddress from '../user-info/address/AddNewAddress'
import Link from 'next/link'
import Router from 'next/router'

const AddressSelectionField = (props) => {
    const { theme, address, refetch, t } = props
    const borderColor = theme.palette.primary.main

    const handleRoute = () => {
        Router.push(
            {
                pathname: '/info',
                query: { page: 'profile' },
            },
            undefined,
            { shallow: true }
        )
    }
    return (
        <>
            <InputField
                variant="outlined"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    border: `.5px solid ${borderColor}`,
                    gap: '10px',
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontSize: '15px',

                        [theme.breakpoints.down('sm')]: {
                            fontSize: '12px',
                        },
                    }}
                    placeholder="Set Location"
                    inputProps={{
                        'aria-label': 'search google maps',
                    }}
                    value={address?.address}
                />

                <AddNewAddress refetch={refetch} buttonbg="true" />
            </InputField>
            <SaveAddressBox>
                <Typography
                    color={theme.palette.primary.main}
                    sx={{ cursor: 'pointer' }}
                    onClick={handleRoute}
                >
                    {t('View Saved Address')}
                </Typography>
            </SaveAddressBox>
        </>
    )
}

AddressSelectionField.propTypes = {}

export default AddressSelectionField
