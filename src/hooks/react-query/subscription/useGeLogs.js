import MainApi from "../../../api/MainApi";
import {useQuery} from "react-query";

const getData = async (type,deliveryOffset, id) => {
    const {data} = await MainApi.get(`api/v1/customer/subscription/${id}/${type}?offset=${deliveryOffset}&limit=10`)
    return data
}
export const useGeLogs = (type, deliveryOffset, id) => {
    return useQuery('delivery-log', () => getData(type, deliveryOffset, id), {
        enabled:false
    })
}