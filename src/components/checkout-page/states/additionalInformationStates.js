export const additionalInformationInitialState = {
    streetNumber: '',
    houseNumber: '',
    floor: '',
    note:'',
    addressType:'',
}

export const additionalInformationReducer = (state, action) => {
    switch (action.type) {
        case 'setStreetNumber':
            return {
                ...state,
                streetNumber: action.payload
            }
        case 'setHouseNumber':
            return {
                ...state,
                houseNumber: action.payload
            }
        case 'setFloor':
            return {
                ...state,
                floor: action.payload
            }
        case 'setNote':
            return {
                ...state,
                note: action.payload
            }
        case 'setAddressType':
            return {
                ...state,
                addressType: action.payload
            }
        default:
            return state

    }
}

export const ACTIONS = {
    setStreetNumber: "setStreetNumber",
    setHouseNumber: "setHouseNumber",
    setFloor: "setFloor",
    setNote: "setNote",
    setAddressType: "setAddressType",
};