import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { NavLinkStyle } from '../Navbar.style'
import NavCatagory from '../NavCatagory'
import NavResturant from '../NavResturant'
import NavCuisines from '../NavCuisines'
import { setHandleHomePage } from '../../../redux/slices/global'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const NavLinks = ({ zoneid, t, languageDirection }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [openCategoryModal, setCategoryModal] = useState(false)
    const [openRestaurantModal, setRestaurantModal] = useState(false)
    const handleClick = () => {
        router.push('/home')
        dispatch(setHandleHomePage(false))
    }

    return (
        <Stack direction="row" spacing={2.5}>
            {zoneid && (
                <>
                    <NavLinkStyle
                        onClick={handleClick}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer',paddingInlineEnd:languageDirection==="rtl" && "1.5rem" }}
                    >
                        <Typography fontSize="14px">{t('Home')}</Typography>
                    </NavLinkStyle>

                    <NavCatagory
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    />
                    <NavCuisines
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    />

                    <NavResturant
                        openModal={openRestaurantModal}
                        setModal={setRestaurantModal}
                        zoneid={zoneid}
                        languageDirection={languageDirection}
                    />
                </>
            )}
        </Stack>
    )
}

NavLinks.propTypes = {}

export default NavLinks
