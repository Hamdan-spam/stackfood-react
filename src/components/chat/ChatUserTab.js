import React, { useReducer } from 'react'
import { Stack } from '@mui/system'
import { Tab, Tabs } from '@mui/material'
import { ACTION as action, reducer, initialState } from './state'
import { t } from 'i18next'

export const data = [
    {
        id: 1,
        userType: 'Seller',
        value: 'vendor',
    },
    {
        id: 2,
        userType: 'Delivery Man',
        value: 'delivery_man',
    },
    {
        id: 3,
        userType: 'admin',
        value: 'admin',
    },
]

const ChatUserTab = ({ setUserType, useType, setChannelId }) => {
    //const [state, dispatch] = useReducer(reducer, initialState);
    const handleChange = (event, newValue) => {
        setUserType(newValue)
        setChannelId(null)
    }

    return (
        <Stack width="100%" sx={{ paddingInlineEnd: '6px' }}>
            <Tabs
                indicatorColor="primary"
                value={useType}
                onChange={handleChange}
                scrollButtons={false}
                aria-label="scrollable prevent tabs example"
                sx={{
                    '& .MuiButtonBase-root': {
                        paddingInlineEnd: '10px',
                        paddingInlineStart: '10px',
                    },
                    '& .MuiTabs-flexContainer': {
                        gap: '5px',
                    },
                }}
            >
                {data?.map((item) => (
                    <Tab
                        value={item?.value}
                        label={t(item.userType)}
                        key={item?.id}
                    />
                ))}
            </Tabs>
        </Stack>
    )
}

export default ChatUserTab
