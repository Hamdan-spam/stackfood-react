import { useQuery } from 'react-query'
import { onErrorResponse } from '../../../components/ErrorResponse';
import MainApi from '../../../api/MainApi';

const getOfflinePaymentOptions = async () => {
    const { data } = await MainApi.get(`/api/v1/offline_payment_method_list`);
    return data;
}
export default function useGetOfflinePaymentOptions() {
    return useQuery("offline-payments", getOfflinePaymentOptions, {
        enabled: false,
        onError: onErrorResponse,
    });
}