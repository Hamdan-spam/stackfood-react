import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import RoomIcon from '@mui/icons-material/Room'
import { Paper, Stack, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import AddressReselectPopover from './AddressReselectPopover'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { setClearCart } from '../../../../redux/slices/cart'
import { useTheme } from '@mui/material/styles'

const AddressReselect = ({ location }) => {
    const [openReselectModal, setOpenReselectModal] = useState(false)
    const { global, token } = useSelector((state) => state.globalSettings)
    const [openPopover, setOpenPopover] = useState(false)
    const [address, setAddress] = useState(null)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const router = useRouter()
    const theme = useTheme()
    useEffect(() => {
        let currentLatLng
        if (typeof localStorage.getItem('currentLatLng') !== undefined) {
            currentLatLng = JSON.parse(localStorage.getItem('currentLatLng'))
            const location = localStorage.getItem('location')
            setAddress({
                ...currentLatLng,
                latitude: currentLatLng?.lat,
                longitude: currentLatLng?.lng,
                address: location,
                address_type: 'Selected Address',
            })
        }
    }, [])

    useEffect(() => {
        if (address) {
            localStorage.setItem('location', address?.address)
            const values = { lat: address?.lat, lng: address?.lng }
            localStorage.setItem('currentLatLng', JSON.stringify(values))
            if (address.zone_ids && address.zone_ids.length > 0) {
                const value = [address.zone_ids]
                localStorage.setItem('zoneid', JSON.stringify(address.zone_ids))
                toast.success(t('New delivery address selected.'))
                handleClosePopover()
                dispatch(setClearCart())
                router.push('/home')
            }
        }
    }, [address])
    const handleClickToLandingPage = () => {
        setOpenPopover(true)
        // if (token) {
        //
        // } else {
        //     toast.error(t('Login required.'))
        // }

        //setOpenReselectModal(true)
        // localStorage.removeItem('location')
        // localStorage.removeItem('zoneid')
        //Router.push('/')
    }
    const handleModalClose = () => {
        setOpenReselectModal(false)
    }
    const anchorRef = useRef(null)
    const handleClosePopover = () => {
        setOpenPopover(false)
    }
    return (
        <>
            <Stack
                sx={{
                    color: (theme) => theme.palette.neutral[1000],
                    cursor: 'pointer',
                }}
                direction="row"
                onClick={handleClickToLandingPage}
                ref={anchorRef}
                alignItems="center"
                spacing={0.5}
            >
                <RoomIcon
                    fontSize="small"
                    color="primary"
                    style={{ width: '16px', height: '16px' }}
                />
                <Typography
                    fontSize="13px"
                    align="left"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        maxWidth: '189px',
                        marginInlineStart: '5px',
                        wordBreak: 'break-all',
                    }}
                    color={theme.palette.neutral[1000]}
                >
                    {location}
                </Typography>
                <KeyboardArrowDownIcon />
            </Stack>
            <AddressReselectPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
                t={t}
                address={address}
                setAddress={setAddress}
                token={token}
            />
        </>
    )
}

AddressReselect.propTypes = {}

export default AddressReselect
