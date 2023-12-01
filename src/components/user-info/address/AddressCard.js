import React from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { IconButton, Stack, Typography } from '@mui/material'
import deleteImg from '../../../../public/static/Vector (5).png'
import { t } from 'i18next'
import { useTheme } from '@mui/material/styles'
import DeleteAddress from './DeleteAddress'

const AddressCard = ({ address, refetch }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    return (
        <CustomPaperBigCard nopadding="true">
            <CustomStackFullWidth spacing={1}>
                <CustomStackFullWidth
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? theme.palette.cardBackground1
                                : theme.palette.sectionBg,
                    }}
                >
                    <CustomStackFullWidth
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                        sx={{ padding: '20px' }}
                    >
                        <CustomTypography sx={{ textTransform: 'capitalize' }}>
                            {t(address?.address_type)}
                        </CustomTypography>
                        <IconButton onClick={handleOpen}>
                            <img src={deleteImg.src} />
                        </IconButton>
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
                <CustomStackFullWidth
                    spacing={1}
                    sx={{ paddingX: '20px', paddingBottom: '25px' }}
                >
                    <Stack direction="row" spacing={2}>
                        <Typography fontSize="14px" fontWeight="500">
                            {t('Name')}
                        </Typography>
                        <Typography
                            fontSize="14px"
                            fontWeight="400"
                            color={theme.palette.neutral[500]}
                        >
                            {address?.contact_person_name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Typography fontSize="14px" fontWeight="500">
                            {t('Phone')}
                        </Typography>
                        <Typography
                            fontSize="14px"
                            fontWeight="400"
                            color={theme.palette.neutral[500]}
                        >
                            {address?.contact_person_number}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Typography fontSize="14px" fontWeight="500">
                            {t('Address')}
                        </Typography>
                        <Typography
                            fontSize="14px"
                            fontWeight="400"
                            color={theme.palette.neutral[500]}
                        >
                            {address?.address}
                        </Typography>
                    </Stack>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
            {open && (
                <DeleteAddress
                    open={open}
                    handleClose={handleClose}
                    addressId={address?.id}
                    refetch={refetch}
                />
            )}
        </CustomPaperBigCard>
    )
}

export default AddressCard
