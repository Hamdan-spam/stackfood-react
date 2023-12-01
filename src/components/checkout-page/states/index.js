import {orderTypes} from "../order-type/data";


export const subscriptionsInitialState = {
    order:'0',
    type:'',
    startDate:'',
    endDate:'',
    days:[]
}

export const subscriptionReducer = (state, action)=>{
    switch(action.type){
        case 'setSubscriptionOrder':
            if(action.payload===orderTypes[0].value){
                return {
                    ...state,
                    order:'0',
                    type:'',
                    startDate:'',
                    endDate:'',
                    days:[]
                }
            }
            else{
                return {
                    ...state,
                    order: action.payload
                }
            }
        case 'setSubscriptionType':

            return {
                ...state,
                type: action.payload
            }
        case 'setStartDate':
            return {
                ...state,
                startDate: action.payload
            }
        case 'setEndDate':
            return {
                ...state,
                endDate: action.payload
            }
        case 'setSubscriptionDays':
            return {
                ...state,
                days: action.payload
            }

        default:
            return state

    }
}

export const ACTIONS = {
    setSubscriptionOrder: "setSubscriptionOrder",
    setSubscriptionType: "setSubscriptionType",
    setStartDate: "setStartDate",
    setEndDate: "setEndDate",
    setSubscriptionDays: "setSubscriptionDays",
};