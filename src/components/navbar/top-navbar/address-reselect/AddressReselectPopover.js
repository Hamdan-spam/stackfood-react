import React, {useEffect, useState} from 'react'
import {Button, Grid, Modal, Popover, Typography} from '@mui/material'
import DeliveryAddress from '../../../checkout-page/DeliveryAddress'
import SimpleBar from 'simplebar-react'
import {CustomButtonPrimary} from '../../../../styled-components/CustomButtons.style'
import {CustomColouredTypography, CustomStackFullWidth} from '../../../../styled-components/CustomStyles.style'
import {CustomTypography} from '../../../custom-tables/Tables.style'
import MapModal from '../../../landingpage/google-map/MapModal'
import CustomAlert from '../../../alert/CustomAlert'
import Image from "next/image";
import warningImage from "../../../../assets/images/warning.png";
import {useTheme} from "@mui/material/styles";
import {CustomStyledBox} from "../../../foodDetail-modal/CartClearModal";

const AddressReselectPopover = (props) => {
    const {anchorEl, onClose, open, t, address, setAddress, token, ...other} =
        props
    const [openMapModal, setOpenMapModal] = useState(false)
    const [addressSet, setAddressSet] = useState(null)
    const [openAlert, setOpenAlert] = useState(false)
    const theme = useTheme()
    const handleCloseMapModal = () => {
        setOpenMapModal(false)
        onClose()
    }
    const popOverHeightHandler = () => {
        if (token) {
            return '200px'
        } else {
            return '150px'
        }
    }
    useEffect(() => {
        if (addressSet) {
            setOpenAlert(true)
        }
    }, [addressSet])

    const handleClose = () => {
        setAddressSet(false)
    }
    const handleAddressSetSuccess = ()=>{
        setAddress(addressSet)
        setOpenAlert(false)
    }


    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                onClose={onClose}
                open={open}
                PaperProps={{
                    sx: {width: {xs: 300, sm: 320, md: 350}, p: '1rem'},
                }}
                transitionDuration={2}
                {...other}
            >
                <SimpleBar
                    style={{
                        height: popOverHeightHandler(),
                    }}
                >
                    <CustomStackFullWidth alignItems="center" spacing={1}>
                        {token ? (
                            open && (
                                <DeliveryAddress
                                    setAddress={setAddressSet}
                                    address={address}
                                    hideAddressSelectionField="true"
                                    renderOnNavbar="true"
                                />
                            )
                        ) : (
                            <CustomAlert
                                type="info"
                                text={t(
                                    'To select from saved addresses, you need to sign in.'
                                )}
                            />
                        )}
                        <CustomTypography>{t('Or')}</CustomTypography>
                        <CustomButtonPrimary
                            onClick={() => setOpenMapModal(true)}
                        >
                            {t('Pick from map')}
                        </CustomButtonPrimary>
                    </CustomStackFullWidth>
                </SimpleBar>
            </Popover>
            {openMapModal && (
                <MapModal
                    open={openMapModal}
                    handleClose={handleCloseMapModal}
                />
            )}
            {
                openAlert && <Modal
                    open={openAlert}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CustomStyledBox>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} align="center" mt=".5rem">
                                <Image
                                    width={60}
                                    height={60}
                                    src={warningImage}
                                    alt={t('warning')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} align="center">
                                <CustomColouredTypography
                                    variant="h4"
                                    color={theme.palette.error.main}
                                >
                                    {t('Are you sure, you want to reset?')}
                                </CustomColouredTypography>
                            </Grid>
                            <Grid item xs={12} md={12} align="center">
                                <Typography>
                                    {t(
                                        'You have some foods in your cart. If you change your location, your cart and other data related to with your carrunt delivery location will be reset.'
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} align="center">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleClose}
                                    sx={{color: (theme) => theme.palette.primary.main}}
                                >
                                    {t('No')}
                                </Button>
                            </Grid>
                            <Grid item xs={6} md={6} align="center">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleAddressSetSuccess}
                                >
                                    {t('Yes')}
                                </Button>
                            </Grid>
                        </Grid>
                    </CustomStyledBox>
                </Modal>
            }
        </>
    )
}

AddressReselectPopover.propTypes = {}

export default AddressReselectPopover
