import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Avatar, Card } from '@mui/material'

export const ChatMessageWrapper = styled(Box)(
    ({ theme, authorType, userType, languageDirection }) => ({
        display: 'flex',
        flexDirection: authorType === userType ? 'row-reverse' : 'row',
        maxWidth: 500,
        marginLeft:
            authorType === userType
                ? languageDirection === 'rtl'
                    ? 0
                    : 'auto'
                : 0,
        marginBottom: '1rem',
        marginRight:
            authorType === userType
                ? languageDirection === 'rtl'
                    ? 'auto'
                    : 0
                : 0,
    })
)

export const CustomAvatar = styled(Avatar)(
    ({ theme, authorType, userType }) => ({
        height: 48,
        marginInlineStart: authorType === userType ? '1rem' : 0,
        marginInlineEnd: authorType === userType ? 0 : '1rem',
        width: 48,
        marginBlockStart: '10px',
    })
)
export const BodyWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    maxWidth: 500,
}))
export const CardWrapper = styled(Card)(({ theme, authorType, userType }) => ({
    backgroundColor:
        authorType === userType
            ? theme.palette.primary.main
            : theme.palette.mode === 'dark'
            ? theme.palette.cardBackground1
            : theme.palette.neutral[200],
    color:
        authorType === userType
            ? theme.palette.neutral[100]
            : theme.palette.neutral[1000],
    paddingInlineEnd: '1rem',
    paddingInlineStart: '1rem',
    paddingBlockStart: '1.2rem',
    paddingBlockEnd: '1.2rem',
    borderRadius:
        authorType === userType ? '16px 16px 0px 16px' : '16px 16px 16px 0px',

    [theme.breakpoints.down('sm')]: {
        paddingInlineEnd: '.8rem',
        paddingInlineStart: '.8rem',
        paddingBlockStart: '.8rem',
        paddingBlockEnd: '.8rem',
    },
}))
export const TimeWrapper = styled(Box)(({ theme, authorType, userType }) => ({
    display: 'flex',
    justifyContent: authorType === userType ? 'flex-end' : 'flex-start',
    marginTop: 1,
    paddingTop: 2,
}))
