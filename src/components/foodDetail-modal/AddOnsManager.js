import React from 'react'
import { Box, FormGroup } from '@mui/material'
import { FoodTitleTypography } from '../food-card/FoodCard.style'
import IncDecAddOn from './IncDecAddOn'

const AddOnsManager = (props) => {
    const {
        t,
        modalData,
        setTotalPrice,
        setVarPrice,
        changeAddOns,
        setProductAddOns,
        product,
        setAddOns,
        add_on,
        quantity,
        cartList,
    } = props
    return (
        <Box
            paddingLeft={{ xs: '10px', md: '0px' }}

        >
            <FoodTitleTypography
                textAlign="left"
                fontWeight="600"
                gutterBottom
                variant="h6"
                component="h6"
                sx={{ margin: '10px 0' }}
            >
                {t('Add Ons')}
            </FoodTitleTypography>
            <FormGroup sx={{ marginLeft: '0px' }}>
                {modalData.length > 0 &&
                    modalData[0].add_ons?.map((item) => (
                        <IncDecAddOn
                            key={item?.id}
                            setTotalPrice={setTotalPrice}
                            setVarPrice={setVarPrice}
                            changeAddOns={changeAddOns}
                            add_on={item}
                            setProductAddOns={setProductAddOns}
                            product_add_ons={product?.add_ons}
                            setAddOns={setAddOns}
                            add_ons={add_on}
                            productQuantity={quantity}
                            product={modalData[0]}
                            cartList={cartList}
                        />
                    ))}
            </FormGroup>
        </Box>
    )
}

AddOnsManager.propTypes = {}

export default AddOnsManager
