
import { useMutation } from "react-query";
import MainApi from "../../../api/MainApi";

const deleteItem = async (cartIdAndGuestId) => {
  if (cartIdAndGuestId?.guestId) {
    const { data } = await MainApi.delete(
      `api/v1/customer/cart/remove-item?guest_id=${cartIdAndGuestId?.guestId}&cart_id=${cartIdAndGuestId?.cart_id}`
    );
    return data;
  } else {
    const { data } = await MainApi.delete(
      `api/v1/customer/cart/remove-item?cart_id=${cartIdAndGuestId?.cart_id}`
    );
    return data;
  }
};

export default function useDeleteCartItem() {
  return useMutation("delete-all-cart-item", deleteItem);
}
