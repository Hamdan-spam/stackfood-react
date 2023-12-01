import React from 'react'
import { List, ListItem, Typography } from '@mui/material'
import { t } from 'i18next'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'

const HowToUse = () => {
    return (
        <CustomStackFullWidth
            alignItems="start"
            justifyContent="center"
            sx={{ height: '100%' }}
            spacing={1}
            padding="1rem"
        >
            <Typography fontSize="14px" fontWeight="700">
                {t('How to use')}
            </Typography>
            <List
                sx={{
                    listStyleType: 'disc',
                    pl: 4,
                    pt: 0,
                    '& .MuiListItem-root': {
                        display: 'list-item',
                        paddingLeft: '0px',
                        paddingBottom: '0px',
                        paddingTop: '0px',
                    },
                }}
            >
                <ListItem>
                    <Typography fontSize="13px" fontWeight="400">
                        {t(
                            'Earn money to your wallet by completing the offer & challenged'
                        )}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography fontSize="13px" fontWeight="400">
                        {t('Convert your loyalty points into wallet money')}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography fontSize="13px" fontWeight="400">
                        {t(
                            'Amin also reward their top customers with wallet money'
                        )}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography fontSize="13px" fontWeight="400">
                        {t('Send your wallet money while order')}
                    </Typography>
                </ListItem>
            </List>
        </CustomStackFullWidth>
    )
}

export default HowToUse
