import React from 'react';
import PropTypes from 'prop-types';
import {alpha, Grid, Stack} from "@mui/material";
import {ActiveButtion, ActiveButtonGrid, ButtonGrid, Image, PastButtion} from "./OrderHistory.style";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ActiveImg from "../../../public/static/order/image 29 (1).png";
import {CustomTypography} from "../custom-tables/Tables.style";
import PastImg from "../../../public/static/order/image 29.png";
import subscription from "../../../public/static/order/subscription.png";

const TopButtons = props => {
    const {handleOrderType, orderType,theme, t } = props
    const buttonsData = [
        {
            label:'Active Order',
            value:'running-orders',
            image:ActiveImg.src
        },
        {
            label:'Past Order',
            value:'list',
            image:PastImg.src
        },
        {
            label:'Subscription Order',
            value:'order-subscription-list',
            image:  subscription.src

        },

    ]
    return (
        <ButtonGrid>
            <Grid justifyContent="center" container xs={12} spacing={1}>
                <ActiveButtonGrid>
                    {
                        buttonsData?.map((item,index)=>{
                            return <Grid item xs={6} md={6}>
                                <ActiveButtion
                                    onClick={() =>
                                        handleOrderType(item?.value)
                                    }
                                    background={
                                        orderType ===item?.value
                                            ? alpha(
                                                theme.palette.primary.main,
                                                0.3
                                            )
                                            : ''
                                    }
                                >
                                    {orderType === item?.value && (
                                        <Stack
                                            sx={{
                                                position: 'absolute',
                                                top: '4px',
                                                right: '6px',
                                            }}
                                        >
                                            <CheckCircleIcon color="success" />
                                        </Stack>
                                    )}
                                    <Image
                                        src={item?.image}
                                        alt={t(item?.value)}
                                    />
                                    <CustomTypography
                                        sx={{
                                            mt: '11px',
                                            color: (theme) =>
                                                theme.palette.neutral[400],
                                        }}
                                    >
                                        {t(item?.label)}
                                    </CustomTypography>
                                </ActiveButtion>
                            </Grid>
                        })
                    }
                </ActiveButtonGrid>
            </Grid>
        </ButtonGrid>
    );
};

TopButtons.propTypes = {

};

export default TopButtons;