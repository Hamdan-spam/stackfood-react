// Colors

const neutral = {
    100: '#141313',
    200: '#192238',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#ced4e4',
    600: '#e1e6e6',
    700: '#374151',
    800: '#1F2937',
    900: '#D1D5DB',
    1000: '#FFFFFF',
    1400: 'rgba(56, 52, 52, 0.8)',
    1500: 'rgba(239, 120, 34, 0.6)',
    1600: '#EF78224D',
    1700: '#192238',
    1800: '#1C1919',
}

const table = {
    background: '#111827',
    textColor: '#ffffff',
}

const background = {
    default: '#0B0F19',
    paper: '#272424',
    profileBackground: '#111827',
}
const footerCenterBg = '#2f3645'
const footerTopBg = 'rgba(255, 235, 221, 0.05)'
const footerMiddleBg = '#343c4d'
const divider = '#2D3748'
const newsletterBG = '#2287FD'
const nonVeg = '#EE7878'
const sectionBg = '#F5F6F80D'
const cardBackground1 = '#1C1919'
const cardBackground2 = 'rgba(255, 255, 255, 0.05)'
const searchBoxBg = '#6B503C'
const borderBottomBg = 'rgba(255, 255, 255, 0.2)'
const navbarBg = '#292525'
const skeletonColor =
    'linear-gradient(78.58deg, #F5F6F8 3.23%, #FBFBFB 53.13%, #F6F7F8 100%)'
const skeletonColorAfter =
    'linear-gradient(78.58deg, #F5F6F8 3.23%, #FDFDFD 53.13%, #F6F7F8 100%)'

const primary = {
    main: '#EF7822',
    light: '#ff6700',
    dark: '#a3460a',
    contrastText: neutral[900],
    midPrimary: '#031C3A',
    overLay: '#000000',
}
const paperBoxShadow = '#000000'

const secondary = {
    main: '#934916',
    light: '#db5c00',
    dark: '#a2684c',
    semiLight: '#FFFAF6',
    contrastText: neutral[900],
}

const success = {
    main: '#00AB11',
    light: '#00AB11',
    dark: '#0E8074',
    contrastText: neutral[900],
}

const info = {
    main: '#2196F3',
    light: '#64B6F7',
    dark: '#0B79D0',
    contrastText: neutral[900],
}

const warning = {
    main: '#FFB020',
    light: '#FFBF4C',
    dark: '#B27B16',
    contrastText: neutral[900],
}
const whiteText = {
    main: '#FFFFFF',
}
const footerTopBgColor = '#00000050'
const error = {
    main: '#D14343',
    light: '#DA6868',
    dark: '#922E2E',
    contrastText: neutral[900],
    back: '#FFE1E2',
    whiteText: '#FFFFFF',
    pureRed: '#DB3022',
}

const text = {
    primary: '#EDF2F7',
    secondary: '#A0AEC0',
    disabled: 'rgba(255, 255, 255, 0.48)',
    footerText: '#F5F6F8',
}
const pending = {
    primary: '#005F95',
    secondary: '#005F00',
    disabled: 'rgba(255, 255, 255, 0.48)',
}
const whiteContainer = {
    main: '#F9FAFC',
    light: '#EF7822',
    dark: '#ff903f',
    contrastText: '#EF7822',
}
const customColor = {
    one: '#FF5E00',
    two: '#2B95FF',
    three: '#FF686A',
    four: '#5266D0',
    five: '#FFE1E2',
    six: '#FFFFFF',
    seven: '#2C1D13',
    eight: '#FFBE0B',
    nine: '#FB5607',
    ten: '#2c2c2c',
    eleven: '#039D55',
    twelve: '#334257',
    thirteen: "#FFE5CD",
    fourteen: "#FCEA10"
}
export const darkThemeOptions = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    background:
                        'linear-gradient(78.58deg, #1C1919 3.23%, #00000050 53.13%, #1C1919 100%)',
                    '&::after': {
                        background:
                            'linear-gradient(78.58deg, #1C1919 3.23%, #00000050 53.13%, #1C1919 100%)',
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[500],
                    color: '#FFFFFF !important',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-filledDefault': {
                        backgroundColor: neutral[800],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[500],
                        },
                    },
                    '&.MuiChip-outlinedDefault': {
                        borderColor: neutral[700],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[700],
                        },
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: text.secondary,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: divider,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1,
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1,
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: neutral[700],
                },
                track: {
                    backgroundColor: neutral[500],
                    opacity: 1,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${divider}`,
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[800],
                    '.MuiTableCell-root': {
                        color: neutral[300],
                    },
                },
            },
        },
    },
    palette: {
        action: {
            active: neutral[400],
            hover: 'rgba(255, 255, 255, 0.04)',
            selected: 'rgba(255, 255, 255, 0.08)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
            disabled: 'rgba(255, 255, 255, 0.26)',
        },
        paperBoxShadow,
        whiteContainer,
        background,
        divider,
        error,
        info,
        customColor,
        mode: 'dark',
        neutral,
        table,
        primary,
        secondary,
        success,
        text,
        warning,
        pending,
        footerTopBg,
        footerCenterBg,
        footerMiddleBg,
        newsletterBG,
        whiteText,
        footerTopBgColor,
        nonVeg,
        sectionBg,
        cardBackground1,
        cardBackground2,
        searchBoxBg,
        borderBottomBg,
        navbarBg,
        skeletonColor,
        skeletonColorAfter,
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0, 0, 0, 0.24)',
        '0px 1px 2px rgba(0, 0, 0, 0.24)',
        '0px 1px 4px rgba(0, 0, 0, 0.24)',
        '0px 1px 5px rgba(0, 0, 0, 0.24)',
        '0px 1px 6px rgba(0, 0, 0, 0.24)',
        '0px 2px 6px rgba(0, 0, 0, 0.24)',
        '0px 3px 6px rgba(0, 0, 0, 0.24)',
        '0px 4px 6px rgba(0, 0, 0, 0.24)',
        '0px 5px 12px rgba(0, 0, 0, 0.24)',
        '0px 5px 14px rgba(0, 0, 0, 0.24)',
        '0px 5px 15px rgba(0, 0, 0, 0.24)',
        '0px 6px 15px rgba(0, 0, 0, 0.24)',
        '0px 7px 15px rgba(0, 0, 0, 0.24)',
        '0px 8px 15px rgba(0, 0, 0, 0.24)',
        '0px 9px 15px rgba(0, 0, 0, 0.24)',
        '0px 10px 15px rgba(0, 0, 0, 0.24)',
        '0px 12px 22px -8px rgba(0, 0, 0, 0.24)',
        '0px 13px 22px -8px rgba(0, 0, 0, 0.24)',
        '0px 14px 24px -8px rgba(0, 0, 0, 0.24)',
        '0px 20px 25px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
        '0px 25px 50px rgba(0, 0, 0, 0.24)',
    ],
}
