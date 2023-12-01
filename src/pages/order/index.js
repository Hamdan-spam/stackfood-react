import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Container, Stack } from '@mui/material'
import SuccessCard from '../../components/checkout-page/SuccessCard'
import { useRouter } from 'next/router'
import CheckoutFailed from '../../components/checkout-page/CheckoutFailed'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import Meta from '../../components/Meta'
import jwt_decode from 'jwt-decode'
import { useTranslation } from 'react-i18next'
import jwt from 'base-64'
import { t } from 'i18next'
const Index = (props) => {
    const router = useRouter()
    const { flag, amnt, token, orderId } = router.query
    const [attributeId, setAttributeId] = useState('')

    useEffect(() => {
        if (token) {
            try {
                // Attempt to decode the Base64 token
                const decodedToken = jwt.decode(token)

                // Check if decodedToken is a valid string
                if (typeof decodedToken === 'string') {
                    // Assuming decodedToken is in the format: "key1=value1&&key2=value2&&..."
                    const keyValuePairs = decodedToken.split('&&')

                    // Loop through the key-value pairs to find the one with attribute_id
                    for (const pair of keyValuePairs) {
                        const [key, value] = pair.split('=')
                        if (key === 'attribute_id') {
                            setAttributeId(value)
                            return // Exit the loop when attribute_id is found
                        }
                    }
                } else {
                    console.error(
                        'Decoded token is not a string:',
                        decodedToken
                    )
                }
            } catch (error) {
                console.error('Error decoding token:', error)
            }
        } else {
            console.error('Token is missing.')
        }
    }, [token])
    return (
        <>
            <Meta
                title={
                    flag === 'fail' || flag === 'cancel'
                        ? t('Order placement failed')
                        : t('Order placed successfully.')
                }
            />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <>
                    {router.isReady && (
                        <Stack
                            width="100%"
                            // height="85vh"
                            mt={{ xs: '0', md: '9rem' }}
                            mb="3rem"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CustomPaperBigCard>
                                {(flag && flag === 'fail') ||
                                    flag === 'cancel' ? (
                                    <CheckoutFailed id={attributeId} />
                                ) : (
                                    <SuccessCard totalAmount={amnt} id={attributeId || orderId} />
                                )}
                            </CustomPaperBigCard>
                        </Stack>
                    )}
                </>
            </Container>
        </>
    )
}

Index.propTypes = {}

export default Index
