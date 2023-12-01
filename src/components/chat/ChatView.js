import React, { useEffect, useRef } from 'react'
import { Box, Stack, styled } from '@mui/material'
import ChatMessages from './ChatMessages'
import ChatMessageAdd from './ChatMessageAdd'

import { makeStyles } from '@material-ui/core/styles'
import LoadingBox from './LoadingBox'

const useStyles = makeStyles((theme) => ({
    root: {
        '&::-webkit-scrollbar': {
            width: 5,
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgrey',
            outline: `1px solid slategrey`,
            borderRadius: '10px',
        },
    },
}))
const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    // overflow: 'hidden',
    minHeight: '60vh',
    height: '100%',
    justifyContent: 'space-between',
}))
export const ScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() =>
        elementRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        })
    )
    return <div ref={elementRef} />
}

const ChatView = ({
    conversationData,
    handleChatMessageSend,
    messageIsLoading,
    handleScroll,
    scrollBottom,
    isSuccess,
}) => {
    const classes = useStyles()
    return (
        <StyledBox>
            {/*<SimpleBar style={{ maxHeight: "70vh" }}>*/}
            <Box
                sx={{
                    overflowY: 'scroll',
                    height: '60vh',
                    maxHeight: '60vh',
                }}
                onScroll={handleScroll}
                className={classes.root}
            >
                {conversationData && (
                    <ChatMessages
                        conversationData={conversationData}
                        scrollBottom={scrollBottom}
                    />
                )}
                {messageIsLoading && <LoadingBox />}
                {/*<ScrollToBottom />*/}
                {/*<Stack ref={messagesEndRef}></Stack>*/}
            </Box>

            {/*</SimpleBar>*/}
            {/*{conversationData?.status && <ChatMessageAdd onSend={handleChatMessageSend}/>}*/}
            <ChatMessageAdd onSend={handleChatMessageSend} />
        </StyledBox>
    )
}
export default ChatView
