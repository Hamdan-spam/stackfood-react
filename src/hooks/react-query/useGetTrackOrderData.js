
import { useQuery } from "react-query";
import MainApi from "../../api/MainApi";
import { onErrorResponse } from "../../components/ErrorResponse";

let token = undefined
if (typeof window != 'undefined') {
  token = localStorage.getItem('token')
}
const getData = async (order_id, phone, guestId) => {
  try {
    const params = !token
      ? `?order_id=${order_id}&guest_id=${guestId}&contact_number=${phone}`
      : `?order_id=${order_id}`;
    const { data } = await MainApi.get(`/api/v1/customer/order/track${params}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export default function useGetTrackOrderData(
  order_id,
  phone,
  guestId,
  handleSuccess
) {
  return useQuery("track-order-data", () => getData(order_id, phone, guestId), {
    onSuccess: handleSuccess,
    enabled: false,
    retry: 1,
    onError: onErrorResponse,
  });
}
