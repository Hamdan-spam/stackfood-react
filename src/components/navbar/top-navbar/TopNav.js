import React, { useEffect, useRef, useState } from 'react'
import {
    alpha,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Box,
    Container,
    Button,
    Card,
    Typography,
    Link,
    ButtonBase,
    Avatar, NoSsr
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock'
import { styled, useTheme } from '@mui/material/styles'
import ReactCountryFlag from 'react-country-flag'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, withTranslation } from 'react-i18next'
import { TopBarButton, CustomSwitch } from '../Navbar.style'
import Switch from '@mui/material/Switch'
import RoomIcon from '@mui/icons-material/Room'
import { useRouter } from 'next/router'
import {
    CustomColouredTypography,
    CustomStackForLoaction,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import CustomCallTo from '../../CustomCallTo'
import { SignInButton } from '../../../styled-components/CustomButtons.style'
import ChatIcon from '@mui/icons-material/Chat'
import AuthModal from '../../auth'
import { AccountPopover } from '../AccountPopover'
import Toolbar from '@mui/material/Toolbar'
import CustomLogo from '../../CustomLogo'
import DrawerMenu from '../DrawerMenu'
import { StyledMenu } from './TopNav.style'
import ThemeSwitches from './ThemeSwitches'
import { useQuery } from 'react-query'
import AddressReselect from './address-reselect/AddressReselect'
import IconButton from '@mui/material/IconButton'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { useSettings } from '../../../contexts/use-settings'
import { toast } from 'react-hot-toast'
import CustomLanguage from '../../CustomLanguage'
import LogoSide from "../second-navbar/LogoSide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ConfigApi } from "../../../hooks/react-query/config/useConfig";
import { onSingleErrorResponse } from "../../ErrorResponse";
import { setGlobalSettings } from "../../../redux/slices/global";

const TopNav = (props) => {
    const dispatch = useDispatch()
    const { i18n, t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    const [theme_mode, setThemeMode] = useState('')
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const [anchorEl, setAnchorEl] = useState(null)
    const anchorRef = useRef(null)
    const [openPopover, setOpenPopover] = useState(false)
    const { global, token } = useSelector((state) => state.globalSettings)
    const businessLogo =  global?.fav_icon
    const open = Boolean(anchorEl)
    let location = undefined
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        location = localStorage.getItem('location')
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    // const businessLogo = global?.fav_icon
    const getValues = (settings) => ( {
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })
    const { settings, saveSettings } = useSettings()
    const [values, setValues] = useState(getValues(settings))
    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])
    const changeThemeMode = (e) => {
        if (e.target.checked) {
            localStorage.setItem('mode', 'light')
            setThemeMode('light')
            // saveSettings({ ...values, theme: 'light' })
        } else {
            localStorage.setItem('mode', 'dark')
            setThemeMode('dark')
            // saveSettings({ ...values, theme: 'dark' })
        }
        window.location.reload()
    }

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['config'],
        ConfigApi.config,
        {
            enabled: false,
            onError: onSingleErrorResponse,
            staleTime: 1000 * 60 * 8,
            cacheTime: 8 * 60 * 1000,
        }
    )
    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {

        if (data) {
            //dispatch(setGlobalSettings(data))
        }
    }, [data])
    return (
    <NoSsr>
        <Card sx={{borderRadius:"0px",zIndex:'99', position:'relative'}}>
            <Toolbar sx={{minHeight:"45px !important"}} disableGutters={true}>
                <Container maxWidth="lg">
                    <Box
                      sx={{
                          display:"flex",
                          flexDirection:"row",
                          borderRadius: '0',
                          paddingBlock:{xs:".0rem",md:".8rem"},
                          justifyContent:"space-between",

                      }}
                    >
                        <Stack
                          width="100%"
                          direction="row"
                          justifyContent="space-between"
                        >
                            <CustomStackForLoaction direction="row" spacing={2}>
                                <LogoSide
                                  global={global}
                                  width="auto"
                                  businessLogo={businessLogo}
                                />

                                {location && (
                                  <AddressReselect location={location} />
                                )}
                            </CustomStackForLoaction>
                            {!isSmall &&
                              <Stack direction="row" spacing={2} justifyContent="end">
                                  <ThemeSwitches
                                    checked={theme_mode === 'light'}
                                    handleThemeChangeMode={changeThemeMode}
                                    themeMode={theme_mode}
                                  />

                              </Stack>}
                        </Stack>
                        {isSmall && <DrawerMenu zoneid={zoneid} />}
                    </Box>
                </Container>
            </Toolbar>
        </Card>
    </NoSsr>
    )
}
export default withTranslation()(TopNav)
