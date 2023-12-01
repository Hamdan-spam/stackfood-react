import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Container, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { capitalize } from '../../utils/capitalize'
import CustomContainer from "../container";

const FooterBottom = (props) => {
    const { global } = useSelector((state) => state.globalSettings)

    const { t } = useTranslation()
    const handleClick = (href) => {
        Router.push(href)
    }
    const languageDirection = localStorage.getItem('direction')
    return (
        <CustomStackFullWidth py="1.5rem">
            <CustomContainer >
                <CustomStackFullWidth
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    flexWrap="wrap"
                    spacing={2}
                >
                    <CustomColouredTypography
                        variant="h5"
                        color="whiteContainer.main"
                    >
                        {t("Copyright")} &#9400;{'  '}
                        {global?.footer_text || ''}
                    </CustomColouredTypography>

                </CustomStackFullWidth>
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

FooterBottom.propTypes = {}

export default FooterBottom
