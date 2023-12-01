import Drawer from '@mui/material/Drawer'
import {
    AppBar,
    Link,
    Paper,
    styled,
    Link as MenuLink,
    Button,
    Card,
    Switch,
    Stack,
    IconButton, alpha
} from "@mui/material";
// import { hover } from '@testing-library/user-event/dist/hover'

export const NavbarRoot = styled(AppBar)(
    ({ theme, notFound, iconicSidebar }) => ({
        paddingTop: '0.1rem',
        paddingBottom: '0.1rem',
        [theme.breakpoints.up('lg')]: {
            left: notFound ? 'none' : iconicSidebar ? '5rem' : '17.5rem',
            width: `calc(100% - ${
                notFound ? 'none' : iconicSidebar ? '5rem' : '17.5rem'
            })`,
        },
        backgroundColor: theme.palette.neutral[100],
        ...(theme.palette.mode === 'light'
            ? {
                  boxShadow: theme.shadows[3],
              }
            : {
                  backgroundColor: theme.palette.background.paper,
                  borderBottomColor: theme.palette.divider,
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '0.063rem',
                  boxShadow: 'none',
              }),
    })
)
export const CustomDrawer = styled(Drawer)(({ theme }) => ({
    zIndex: 1172,
    '& .MuiDrawer-paper': {
        top: '40px',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
    },
}))

export const ButtonContainer = styled('div')(({ theme }) => ({
    marginLeft: '15px',
    marginRight: '15px',
}))

export const SearchProduct = styled(Paper)(({ theme, borderColor }) => ({
    width: '95%',
    margin: 'auto',
    border: 'none',
    background: '#F3F2F2',
    borderRadius: '30px',
    marginTop: '15px',
    borderColor: '#EF7822',
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
}))
export const AppBarStyle = styled(AppBar)(({ theme }) => ({
    background: 'transparent !important',
    boxShadow: 'none !important'
}))
export const NavLinkStyle = styled(Stack)(({ theme, languageDirection }) => ({
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    marginLeft: `${languageDirection === 'rtl' && '20px'}`,
    marginRight: languageDirection === 'rtl' ? '16px' : '0px',
    underLine: 'none',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}))
export const NavMenuLink = styled(MenuLink)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    display: 'flex',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}))
export const TopBarButton = styled(Button)(({ theme, formMobileMenu }) => ({
    padding: formMobileMenu === 'true' ? '7px 5px' : '7px 0px',
    color: theme.palette.neutral[100],
    backgroundColor: theme.palette.navbarBg,
    minWidth:"40px",
    maxWidth: '200px',
}))
export const CustomSwitch = styled(Switch)(({ theme, noimage }) => ({
    width: 42,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 1,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& .MuiSwitch-thumb:before': {
                backgroundImage:
                    noimage === 'true'
                        ? null
                        : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                              theme.palette.primary.main
                          )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: theme.palette.primary.light,
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? noimage === 'true'
                    ? '#fff'
                    : '#003892'
                : '#fff',
        width: 20,
        height: 20,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))
export const CustomNavSearchIcon = styled(IconButton)(({ theme }) => ({
    marginInlineEnd: '1rem',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.primary.main} `,
    alignItems: 'center',
    justifyContent: 'center',
}))
export const CustomStack = styled(Stack)(({ theme }) => ({
    alignSelf: 'center',
    width: '30px',
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginLeft: ' auto !important',
}))
export const LefRightBorderBox = styled(Stack)(({ theme, languageDirection }) => ({
    borderRight: `1px solid ${alpha(
      theme.palette.primary.main,
      0.2
    )}`,
    borderLeft: `1px solid ${alpha(
      theme.palette.primary.main,
      0.2
    )}`,
    height: '64px',
    alignItems:'center',
    justifyContent:"center",
    paddingInline:".5rem"
}))
