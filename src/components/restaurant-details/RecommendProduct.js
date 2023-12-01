import React, { useEffect, useRef, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Grid, Typography } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import { Stack } from '@mui/system'
import fire_image from '../../../public/static/fire.svg'
import FoodCard from '../food-card/FoodCard'

const RecommendProduct = ({ data, handleFocusedSection }) => {
    const ref1 = useRef(null)
    const [isInPosition, setIsInPosition] = useState(false)
    const scrollHandler = () => {
        const element = ref1.current
        const rect = element.getBoundingClientRect()
        const targetPosition = 465 // Example target position, change this to your desired position

        if (rect.top <= targetPosition) {
            setIsInPosition(true)
        } else {
            setIsInPosition(false)
        }
    }
    useEffect(() => {
        if (isInPosition) {
            const a = {
                id: data?.id,
            }
            handleFocusedSection?.(a)
        }
    }, [isInPosition])
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, true)
        return () => {
            window.removeEventListener('scroll', scrollHandler, true)
        }
    }, [])

    return (
        <CustomStackFullWidth>
            <Grid container rowGap="2rem" ref={ref1}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    align="left"
                    paddingTop="5px"
                >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CustomImageContainer
                            src={fire_image.src}
                            width="26px"
                            height="26px"
                        />
                        <Typography fontWeight="700" fontSize="20px">
                            {data?.name}
                        </Typography>
                    </Stack>
                </Grid>
                {data?.products?.length > 0 && (
                    <Grid
                        item
                        container
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            padding: '1.6rem',
                            background: (theme) =>
                                theme.palette.text.footerText,
                        }}
                        spacing={1}
                    >
                        {data?.products?.map((food) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={food?.id}>
                                    {/*<FoodCard product={food} productImageUrl={productImageUrl} horizontal="true"/>*/}
                                </Grid>
                            )
                        })}
                    </Grid>
                )}
            </Grid>
        </CustomStackFullWidth>
    )
}

export default RecommendProduct
