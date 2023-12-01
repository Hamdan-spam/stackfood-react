import React from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

const CustomContainer = (props) => {
    const theme=useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const { children } = props;
    return <Container maxWidth="lg" >{children}</Container>;
};

export default CustomContainer;