import React from 'react'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { ChatUserTop } from './Chat.style'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { t } from 'i18next'

const ConversationInfoTop = ({
    receiver,
    mdUp,
    handleToggleSidebar,
    ChatImageUrl,
    userImage,
    theme,
}) => {
    const languageDirection = localStorage.getItem('direction')
    return (
        <ChatUserTop direction="row" mdUp={mdUp}>
            {!mdUp &&
                (languageDirection === 'rtl' ? (
                    <IconButton onClick={handleToggleSidebar}>
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleToggleSidebar}>
                        <ArrowBack fontSize="small" />
                    </IconButton>
                ))}

            <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-start"
                alignItems="center"
            >
                <IconButton>
                    <Avatar
                        fontSize="small"
                        src={`${ChatImageUrl()}/${userImage}`}
                        sx={{ width: 35, height: 35 }}
                    />
                </IconButton>
                <Stack justifyContent="flex-start">
                    <Typography
                        align="left"
                        color={theme.palette.neutral[1000]}
                        fontSize="16px"
                    >
                        {receiver.sender_type === 'customer'
                            ? t(
                                  receiver?.receiver?.f_name.concat(
                                      ' ',
                                      receiver?.receiver?.l_name
                                  ) || ' '
                              )
                            : t(
                                  receiver?.sender?.f_name.concat(
                                      ' ',
                                      receiver?.sender?.l_name
                                  ) || ' '
                              )}
                    </Typography>
                    <Typography
                        variant="h6"
                        color={theme.palette.neutral[1000]}
                        textTransform="capitalize"
                        align="left"
                    >
                        {receiver?.sender_type === 'customer'
                            ? t(receiver?.receiver_type?.replaceAll('_', ' '))
                            : t(receiver?.sender_type?.replaceAll('_', ' '))}
                    </Typography>
                </Stack>

                {/*<Avatar />*/}
            </Stack>
        </ChatUserTop>
    )
}

ConversationInfoTop.propTypes = {}

export default ConversationInfoTop
