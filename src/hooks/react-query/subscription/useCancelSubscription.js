import MainApi from "../../../api/MainApi";
import {useMutation} from "react-query";

const postHandler = async (params) => {
    const { data } = await MainApi.post(`/api/v1/customer/subscription/${params.subscriptionId}`, {
        _method: 'put',
        status: params.status,
        note: params.note,
        start_date: params.startDate,
        end_date: params.endDate,
        cancellation_reason:params.reason
    })
    return data
}
export const useCancelSubscription = () => {
    return useMutation('cancel_subscription', postHandler)
}