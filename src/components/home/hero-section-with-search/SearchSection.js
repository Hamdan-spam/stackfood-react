import React from 'react';
import {CustomBoxFullWidth} from "../../chat/Chat.style";
import {Typography} from "@mui/material";
import {t} from "i18next";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {useTheme} from "@mui/material/styles";
import SearchBox from "./SearchBox";

const SearchSection = ({query}) => {
    const theme=useTheme()

    return (
        <CustomStackFullWidth  alignItems="center" spacing={1.8}>
            <Typography fontSize="28px" fontWeight="600" color={theme.palette.neutral[1000]}>
                {t("FIND YOUR HAPPINESS")}
            </Typography>
            <Typography fontSize="14px" color={theme.palette.neutral[400]}>{t("For the love of delicious food.")}</Typography>
            <SearchBox query={query}/>
        </CustomStackFullWidth>
    );
};

export default SearchSection;
