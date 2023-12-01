import {
    Box,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    Stack,
    Typography,
    Button,
    MenuItem,
    ListItemIcon,
    Menu,
    Card,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors'
import ReactCountryFlag from 'react-country-flag'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTranslation } from 'react-i18next'
import { CustomSwitch, TopBarButton } from '../../navbar/Navbar.style'
import { useDispatch, useSelector } from 'react-redux'
import { StyledMenu } from '../../navbar/top-navbar/TopNav.style'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import Meta from '../../Meta'
import { rtlLanguageList } from '../../navbar/second-navbar/custom-language/rtlLanguageList'
import {
    setCountryCode,
    setLanguage,
} from '../../../redux/slices/languageChange'
import { isRTLLanguage } from '../../../utils/customFunctions'
import { languageLists } from '../../navbar/second-navbar/custom-language/languageLists'
import cookie from 'js-cookie'

const label = { inputProps: { 'aria-label': 'Switch demo' } }
const SettingPage = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
    const [theme_mode, setThemeMode] = useState('')
    // const [language, setLanguage] = useState('')
    const { global } = useSelector((state) => state.globalSettings)
    const { countryCode, language } = useSelector(
        (state) => state.languageChange
    )
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            dispatch(setLanguage(localStorage.getItem('language') || 'en'))
            dispatch(setCountryCode(localStorage.getItem('country')))
        }
    }, [language])

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const changeThemeMode = (e) => {
        if (e.target.checked) {
            localStorage.setItem('mode', 'light')
        } else {
            localStorage.setItem('mode', 'dark')
        }
        window.location.reload()
    }
    const handleLanguage = (ln) => {
        dispatch(setLanguage(ln?.languageCode))
        dispatch(setCountryCode(ln?.countryCode))
        localStorage.setItem('language', ln?.languageCode)
        localStorage.setItem('country', ln?.countryCode)
        cookie.set('languageSetting', ln?.languageCode)
        // i18n.changeLanguage(ln)
        localStorage.setItem(
            'direction',
            isRTLLanguage(ln?.languageCode) ? 'rtl' : 'ltr'
        )

        window.location.reload()
    }

    const languageValue = (language) => {
        let selectedLanguage = languageLists?.find((item) => {
            if (item?.languageCode === language) {
                return item.languageName
            }
        })
        return selectedLanguage
    }

    const selectedCountryFlag = (countryCode) => {
        let flag = languageLists.find((item) => {
            if (item?.countryCode === countryCode) {
                return item?.countryFlag
            }
        })

        return flag
    }
    const activeFlag = selectedCountryFlag(countryCode)

    const lanColor = theme.palette.neutral[1000]
    return (
        <>
            {' '}
            <Meta
                title={` My Settings-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard padding="3rem" sx={{ minHeight: '55vh' }}>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <Card
                            sx={{
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                maxWidth: '247px',
                                height: '168px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                backgroundColor: (theme) =>
                                    theme.palette.cardBackground1,
                            }}
                        >
                            <CustomStackFullWidth spacing={2}>
                                <Typography
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                    }}
                                >
                                    {theme_mode === 'light'
                                        ? t('Light Mode')
                                        : t('Dark Mode')}
                                </Typography>
                                <FormGroup>
                                    <FormControlLabel
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                        control={
                                            <CustomSwitch
                                                {...label}
                                                sx={{ m: 1 }}
                                                checked={theme_mode === 'light'}
                                                onChange={changeThemeMode}
                                            />
                                        }
                                        label=""
                                    />
                                </FormGroup>
                            </CustomStackFullWidth>
                        </Card>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Card
                            sx={{
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                maxWidth: '247px',
                                height: '168px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                backgroundColor: (theme) =>
                                    theme.palette.cardBackground1,
                            }}
                        >
                            <CustomStackFullWidth
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                    }}
                                >
                                    {t('Language')}
                                </Typography>

                                {/* <ButtonGroup
                          size="small"
                          // variant="text"
                          aria-label="top button group"
                      >
                      </ButtonGroup> */}
                                <TopBarButton
                                    // id="demo-customized-button"
                                    variant="text"
                                    size="small"
                                    aria-controls={
                                        open
                                            ? 'demo-customized-menu'
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    disableElevation
                                    onClick={handleClick}
                                    startIcon={
                                        <Stack
                                            color={theme.palette.neutral[1000]}
                                        >
                                            <img
                                                width="20px"
                                                src={activeFlag?.countryFlag}
                                            />
                                        </Stack>
                                    }
                                    endIcon={<KeyboardArrowDownIcon />}
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.neutral[1000],
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: '0 10px',
                                            color: lanColor,
                                        }}
                                    >
                                        {languageValue(language)?.languageName}
                                    </span>
                                </TopBarButton>
                                <StyledMenu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                        'aria-labelledby':
                                            'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {languageLists?.map((lan, index) => (
                                        <MenuItem
                                            onClick={() => handleLanguage(lan)}
                                            disableRipple
                                            key={index}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor:
                                                        'primary.main',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                <img
                                                    width="20px"
                                                    src={lan?.countryFlag}
                                                />
                                            </ListItemIcon>
                                            {lan.languageName}
                                        </MenuItem>
                                    ))}
                                </StyledMenu>
                            </CustomStackFullWidth>
                        </Card>
                    </Grid>
                </Grid>
            </CustomPaperBigCard>
        </>
    )
}

export default SettingPage
