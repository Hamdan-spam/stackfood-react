import { alpha, InputBase, styled } from '@mui/material'

export const Search = styled('div')(({ theme, borderRadius, backgroundColor}) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: borderRadius ? borderRadius : '24px',
    background:
    backgroundColor ?backgroundColor:  theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.05)
            : alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.neutral[600],
    //border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    width: '100%',
    //margin: 'auto',
    [theme.breakpoints.up('sm')]: {},
}))
export const SearchIconWrapper = styled('div')(
    ({ theme, languageDirection ,nav}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
         top:!nav && 0,
         right:!nav && 0,
        left:!nav && 'unset',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, .5),
        },
    })
)

export const StyledInputBase = styled(InputBase)(
    ({ theme, languageDirection, backgroundColor, forMobile }) => ({
        color: 'inherit',
         borderRadius:"8px",
        width: '100%',
        backgroundColor: backgroundColor ? backgroundColor : '',
        '& .MuiInputBase-input': {
            padding:
                forMobile === 'true'
                    ? theme.spacing(0.7, 0.7, 0.7, 0.7)
                    : theme.spacing(1, 1, 1, 1),
            // vertical padding + font size from searchIcon

          paddingLeft: `calc(1em + ${theme.spacing(0)})`,
          paddingRight:
            languageDirection === "rtl" && `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.down('sm')]: {
               fontSize:"13px"
            },
            // [theme.breakpoints.up('md')]: {
            //     width: '20ch',
            // },
        },
    })
)
