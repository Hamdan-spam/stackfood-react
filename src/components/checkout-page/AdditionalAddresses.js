import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomStackFullWidth,
    CustomTextField,
} from '../../styled-components/CustomStyles.style'
import { DeliveryCaption } from './CheckOut.style'
import { Grid } from '@mui/material'
import { ACTIONS } from './states/additionalInformationStates'

const AdditionalAddresses = (props) => {
    const {
        t,
        additionalInformationStates,
        additionalInformationDispatch,
        orderType,
    } = props
    const note_text =
        orderType === 'take_away' ? 'Additional Note' : 'Additional Information'
    return (
        <CustomStackFullWidth mt="1rem">
            <DeliveryCaption no_margin_top="true">
                {t(note_text)}
            </DeliveryCaption>
            <CustomStackFullWidth mt=".5rem">
                <Grid container spacing={3}>
                    {orderType !== 'take_away' && (
                        <>
                            <Grid item xs={12}>
                                <CustomTextField
                                    label={t('Street number')}
                                    value={
                                        additionalInformationStates.streetNumber
                                    }
                                    fullWidth
                                    onChange={(e) =>
                                        additionalInformationDispatch({
                                            type: ACTIONS.setStreetNumber,
                                            payload: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label={t('House number')}
                                    value={
                                        additionalInformationStates.houseNumber
                                    }
                                    fullWidth
                                    onChange={(e) =>
                                        additionalInformationDispatch({
                                            type: ACTIONS.setHouseNumber,
                                            payload: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label={t('Floor')}
                                    value={additionalInformationStates.floor}
                                    fullWidth
                                    onChange={(e) =>
                                        additionalInformationDispatch({
                                            type: ACTIONS.setFloor,
                                            payload: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <CustomTextField
                            multiline
                            rows={4}
                            placeholder={t(
                                'Ex: Please provide an extra napkin'
                            )}
                            label={t('Note')}
                            value={additionalInformationStates.note}
                            fullWidth
                            onChange={(e) =>
                                additionalInformationDispatch({
                                    type: ACTIONS.setNote,
                                    payload: e.target.value,
                                })
                            }
                        />
                    </Grid>
                </Grid>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

AdditionalAddresses.propTypes = {}

export default AdditionalAddresses
