import React, { useEffect, useReducer, useRef, useState } from 'react'
import {
    CustomBoxFullWidth,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import ChatSideBar from './ChatSideBar'
import ChatView from './ChatView'
import { Stack } from '@mui/material'
import EmptyView from './EmptyView'
import { useGetChannelList } from '../../hooks/react-query/config/chat/useGetChannelLists'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useGetConversation } from '../../hooks/react-query/config/chat/useGetConversation'
import { useStoreMessage } from '../../hooks/react-query/config/chat/useStoreMessage'
import { onErrorResponse } from '../ErrorResponse'
import { useRouter } from 'next/router'
import { useSearchList } from '../../hooks/react-query/config/chat/useSearch'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import ConversationInfoTop from './ConversationInfoTop'
import Loading from '../custom-loading/Loading'
import LoadingBox from './LoadingBox'
import PushNotificationLayout from '../PushNotificationLayout'
import { toast } from 'react-hot-toast'
import { initialState, reducer } from './state'
import Meta from '../Meta'

const Chat = ({ page }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const theme = useTheme()
    const [useType, setUserType] = useState('')
    const [page_limit, setPageLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [channelId, setChannelId] = useState(null)
    const [channelList, setChannelList] = useState([])
    const [messagesData, setMessagesData] = useState([])
    const [apiFor, setApiFor] = useState('conversation_id')
    const [receiverType, setReceiverType] = useState()
    const [receiverName, setReceiverName] = useState()
    const [receiverId, setReceiverId] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [receiver, setReceiver] = useState()
    const [receiverImage, setReceiverImage] = useState()
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))
    const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
    const router = useRouter()
    const {
        type,
        id,
        routeName,
        conversationId,
        chatFrom,
        restaurantName,
        logo,
    } = router.query
    const { global } = useSelector((state) => state.globalSettings)
    const [scrollBottom, setScrollBottom] = useState(true)

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false)
    }
    const handleToggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState)
    }

    useEffect(() => {
        if (type) {
            setUserType(type)
        } else {
            setUserType('vendor')
        }
    }, [])
    const handleChatListOnSuccess = (res) => {
        setChannelList(res.conversations)
    }
    const {
        refetch: refetchChannelList,
        isRefetching,
        isLoading: channelLoading,
        data: channelData,
        isFetched,
    } = useGetChannelList(useType, handleChatListOnSuccess)

    // const handleConFetchOnSuccess = (res) => {
    //     setConversationData(res.pages[0])
    // }
    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching: conversationDataRefetching,
        hasPreviousPage,
        isLoading: messageIsLoading,
    } = useGetConversation({ channelId, apiFor, page_limit, offset })

    // from notification

    useEffect(() => {
        if (type) {
            setReceiverType(type)
        }
        if (conversationId) {
            setChannelId(conversationId)
            setScrollBottom(true)
            const tempReceiver =
                channelList.length !== 0 &&
                channelList.filter((item) => item.id == conversationId)
            setReceiver(tempReceiver[0])
        }
        if (type === 'admin') {
            setReceiverId(conversationId)
        } else {
            setReceiverId(null)
        }
    }, [conversationId, channelList, type])

    //from pages
    useEffect(() => {
        if (id && routeName && type) {
            const tempReceiver =
                channelList.length !== 0 &&
                channelList.filter((item) => {
                    if (type === 'vendor') {
                        return item?.receiver?.vendor_id == id
                    } else if (type === 'delivery_man') {
                        return item?.sender?.deliveryman_id == id
                    }
                })

            setReceiver(tempReceiver[0])
            if (restaurantName) {
                setReceiver({
                    ...receiver,
                    id: id,
                    sender_type: 'customer',
                    receiver_type: 'vendor',
                    receiver: {
                        f_name: restaurantName,
                        l_name: '',
                    },
                })
                setReceiverImage(logo)
            }
            if (!useType) {
                setChannelId(id)
            }
            setReceiverId(id)
            setReceiverType(type)
            setApiFor(routeName)
        }
    }, [id, type, routeName, chatFrom, channelList, restaurantName])

    useEffect(async () => {
        if (channelId) {
            await refetch()
        }
    }, [channelId])
    useEffect(() => {
        setMessagesData([data])
    }, [data])
    const handleChannelOnClick = async (value) => {
        setReceiverId(null)
        await refetchChannelList()
        if (value.receiver_type === 'admin') {
            setApiFor('admin_id')
            setChannelId('admin')
            setScrollBottom(true)
            setReceiverType(value.receiver_type)
            setReceiverName(global.business_name)
            setReceiverImage(value?.receiver?.image)
            setReceiver(value)
        } else {
            setApiFor('conversation_id')
            setChannelId(value.id)
            setScrollBottom(true)
            setReceiverType(value.receiver_type)
            setReceiverName(value.receiver.f_name)
            setReceiverImage(value?.receiver?.image)
            setReceiver(value)
        }

        mdDown && setIsSidebarOpen((prevState) => !prevState)
    }

    useEffect(async () => {
        if (useType) {
            await refetchChannelList()
        }
    }, [useType])
    const { mutate: storeMessageByMutate, isLoading: isLoadingMessageSend } =
        useStoreMessage()
    const handleChatMessageSend = (values) => {
        let newValues = {
            receiver_type: receiverType,
            id: channelId,
            receiverId,
            ...values,
        }
        const handleSuccess = async (res) => {
            await refetch()
            refetchChannelList()
        }

        storeMessageByMutate(newValues, {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
        })
    }
    const handleSearchFetchOnSuccess = (res) => {
        if (res) {
            setChannelList(res.conversations)
        }
    }
    const {
        isLoading,
        isRefetching: isRefetchingForSearch,
        refetch: searchRefetch,
    } = useSearchList(searchValue, handleSearchFetchOnSuccess)
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if (searchValue) {
            try {
                searchRefetch().then()
            } catch (err) {}
        }
    }

    const handleSearch = (values) => {
        setSearchValue(values)
    }
    const handleReset = () => {
        setSearchValue('')
        refetchChannelList().then()
    }
    const handleScroll = (e) => {
        if (e.currentTarget.scrollTop === 0) {
            if (hasNextPage) {
                fetchNextPage().then()
                e.currentTarget.scrollTop = 300
                setScrollBottom(false)
            }
        }
    }

    const ChatImageUrl = () => {
        if (receiver?.receiver_type === 'vendor') {
            return global?.base_urls?.restaurant_image_url
        }
        if (receiver?.receiver_type === 'delivery_man') {
            return global?.base_urls?.delivery_man_image_url
        } else global?.base_urls?.business_logo_url
    }
    const userImage = receiverImage

    return (
        <PushNotificationLayout refetch={refetch} pathName="info">
            <Meta
                title={` My Inbox-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard nopadding="true">
                <CustomStackFullWidth direction="row">
                    <Stack>
                        <ChatSideBar
                            onClose={handleCloseSidebar}
                            handleToggleSidebar={handleToggleSidebar}
                            open={isSidebarOpen}
                            handleChannelOnClick={handleChannelOnClick}
                            channelList={channelList}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            handleSearch={handleSearch}
                            isLoading={isLoading}
                            handleReset={handleReset}
                            searchSubmitHandler={searchSubmitHandler}
                            channelLoading={channelLoading}
                            selectedId={receiver?.id}
                            chatFrom={chatFrom}
                            setIsSidebarOpen={setIsSidebarOpen}
                            setUserType={setUserType}
                            useType={useType}
                            setChannelId={setChannelId}
                            channelData={channelData}
                            isFetched={isFetched}
                        />
                    </Stack>
                    <CustomStackFullWidth>
                        {receiver && channelId && (
                            <ConversationInfoTop
                                receiver={receiver}
                                mdUp={mdUp}
                                handleToggleSidebar={handleToggleSidebar}
                                ChatImageUrl={ChatImageUrl}
                                userImage={userImage}
                                theme={theme}
                            />
                        )}

                        {channelId &&
                            messagesData.length > 0 &&
                            !isFetchingNextPage && (
                                <ChatView
                                    conversationData={messagesData?.[0]?.pages}
                                    handleChatMessageSend={
                                        handleChatMessageSend
                                    }
                                    channelList={channelList}
                                    handleScroll={handleScroll}
                                    scrollBottom={scrollBottom}
                                    messageIsLoading={messageIsLoading}
                                />
                            )}
                        {isFetchingNextPage && <LoadingBox />}
                        {/*{conversationDataRefetching && <LoadingBox />}*/}
                        {!channelId && <EmptyView />}
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </CustomPaperBigCard>
        </PushNotificationLayout>
    )
}
export default Chat
