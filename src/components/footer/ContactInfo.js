import React from 'react';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {useTheme} from "@mui/material/styles";

const ContactInfo = ({global}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <CustomStackFullWidth spacing={1.5} alignItems={{xs:"center",sm:"center",md:"flex-start"}} >
            <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.footerText}>
                <ApartmentIcon/>
                <Typography>{global?.address}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.footerText}>
                <MailIcon/>
                <Typography>{global?.email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.footerText}>
                <LocalPhoneIcon/>
                <Typography>{global?.phone}</Typography>
            </Stack>
        </CustomStackFullWidth>
    );
};

export default ContactInfo;
