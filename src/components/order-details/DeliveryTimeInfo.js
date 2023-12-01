import React from 'react'
import {
    CustomColouredTypography,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { ImageSource } from '../../utils/ImageSource'
import deliverymangif from '../../../public/static/food-delivery-dark.gif'
import darkdeliverymangif from '../../../public/static/ordertime.gif'
import Image from 'next/image'
import { CustomPaperCard } from '../custom-cards/CustomCards.style'
import { useTranslation } from 'react-i18next'
import { Stack, Typography } from '@mui/material'
import { CustomTypographyGray } from '../../styled-components/CustomTypographies.style'
import moment from 'moment'
import { useTheme } from '@mui/material/styles'

const DeliveryTimeInfo = ({ trackData }) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const today = moment(new Date())
    const orderPendingTime =
        theme.palette.mode === 'dark' ? darkdeliverymangif : deliverymangif

    const differenceInMinutes = () => {
        const deliveryTime = trackData?.data?.restaurant?.delivery_time
        const createdAt = trackData?.data?.created_at
        const processingTime = trackData?.data?.processing_time
        const scheduleAt = trackData?.data?.schedule_at
        let minTime = processingTime != null ? processingTime : 0
        if (
            deliveryTime !== null &&
            deliveryTime !== '' &&
            processingTime === null
        ) {
            const timeArr = deliveryTime.split('-')
            minTime = Number.parseInt(timeArr[0])
        }
        const newDeliveryTime = scheduleAt ? scheduleAt : createdAt
        const newDeliveryTimeWithAdditionalMin = moment(newDeliveryTime)
            .add(minTime, 'minutes')
            .format()
        const duration = moment.duration(
            today.diff(newDeliveryTimeWithAdditionalMin)
        )
        const minutes = duration.asMinutes()
        //here minutes give negative values for positive changes, that's why the condition given below
        if (minutes <= -1) {
            return Number.parseInt(Math.abs(minutes))
        }
    }
    const handleTime = () => {
        if (differenceInMinutes() > 5) {
            return `${differenceInMinutes() - 5} - ${differenceInMinutes()} `
        } else {
            return `1-5`
        }
    }
    return (
        <CustomPaperBigCard>
            <CustomStackFullWidth alignItems="center" justifyContent="center">
                <Stack>
                    <Image
                        src={orderPendingTime}
                        alt="my gif"
                        height={150}
                        width={250}
                        objectFit="cover"
                    />
                </Stack>

                <Stack alignItems="center" justifyContent="center" mt="1.5rem">
                    <CustomTypographyGray>
                        {t('Your food will be delivered within')}
                    </CustomTypographyGray>
                </Stack>
                {trackData && (
                    <Stack direction="row" spacing={0.5}>
                        <Typography>{handleTime()}</Typography>
                        <CustomColouredTypography color="primary">
                            {t('min')}
                        </CustomColouredTypography>
                    </Stack>
                )}
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}

export default DeliveryTimeInfo
