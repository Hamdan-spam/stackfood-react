import MainApi from "../../../api/MainApi";
import {useQuery} from "react-query";
import {onErrorResponse} from "../../../components/ErrorResponse";

const getData = async () => {

    const {data} = await MainApi.get("/api/v1/customer/order/cancellation-reasons?offset=1&limit=50")
    return data

}
export const useGetCancellationReasons = () => {
    return useQuery('cancellation_reasons', () => getData(), {
        // onSuccess: handleRequestOnSuccess,
        onError: onErrorResponse,
    })
}