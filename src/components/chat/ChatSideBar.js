import React from 'react'
import { Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ChatSidebarDesktop, ChatSidebarMobile } from './Chat.style'
import ChatContent from './ChatContent'

const ChatSideBar = (props) => {
    const {
        useType,
        setUserType,
        chatFrom,
        open,
        isLoading,
        selectedId,
        handleReset,
        handleToggleSidebar,
        setChannelId,
        channelLoading,
        channelList,
        handleChannelOnClick,
        searchSubmitHandler,
        setSearchValue,
        searchValue,
        handleSearch,
        channelData,
        isFetched,
    } = props
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

    if (mdUp) {
        return (
            <ChatSidebarDesktop variant="persistent" anchor="left" open="true">
                <ChatContent
                    handleToggleSidebar={handleToggleSidebar}
                    channelList={channelList}
                    handleChannelOnClick={handleChannelOnClick}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    isLoading={isLoading}
                    handleReset={handleReset}
                    searchSubmitHandler={searchSubmitHandler}
                    channelLoading={channelLoading}
                    selectedId={selectedId}
                    setUserType={setUserType}
                    useType={useType}
                    setChannelId={setChannelId}
                    channelData={channelData}
                    isFetched={isFetched}
                />
            </ChatSidebarDesktop>
        )
    }
    return (
        <ChatSidebarMobile
            anchor="left"
            variant="temporary"
            open={chatFrom === 'true' ? !open : open}
        >
            {' '}
            <ChatContent
                handleToggleSidebar={handleToggleSidebar}
                channelList={channelList}
                handleChannelOnClick={handleChannelOnClick}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                handleSearch={handleSearch}
                isLoading={isLoading}
                handleReset={handleReset}
                searchSubmitHandler={searchSubmitHandler}
                selectedId={selectedId}
                setUserType={setUserType}
                useType={useType}
                setChannelId={setChannelId}
                channelData={channelData}
                isFetched={isFetched}
            />
        </ChatSidebarMobile>
    )
}
export default ChatSideBar
