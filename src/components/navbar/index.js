import React, { useEffect } from "react";

import { AppBarStyle } from './Navbar.style'
//import SecondNavbar from './second-navbar/SecondNavbar'
import TopNav from './top-navbar/TopNav'
import dynamic from 'next/dynamic'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import SecondNavbar from "./second-navbar/SecondNavbar";
import { setCategoryIsSticky, setSticky } from "../../redux/slices/scrollPosition";
import { useDispatch } from 'react-redux'
import { useRouter } from "next/router";

const Navigation = () => {
    // const SecondNavbar = dynamic(() => import('./second-navbar/SecondNavbar'), {
    //     ssr: false,
    // })
    const router = useRouter()
    const dispatch = useDispatch()
  const theme=useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const {isSticky}=useSelector((state) => state.scrollPosition)

    useEffect(() => {

        if(router.pathname !=="/home")
        dispatch(setSticky(false))
        dispatch(setCategoryIsSticky(false))

    }, [router.pathname]);

    return (
        <AppBarStyle disableGutters={true}>
            <TopNav />
          { !isSmall && <SecondNavbar isSticky={isSticky} /> }
        </AppBarStyle>
    )
}

export default Navigation
