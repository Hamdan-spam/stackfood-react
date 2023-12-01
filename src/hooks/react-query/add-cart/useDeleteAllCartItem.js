
import { useMutation } from "react-query";
import MainApi from "../../../api/MainApi";

const deleteData = async (guestId) => {
  if (guestId) {
    const { data } = await MainApi.delete(
      `api/v1/customer/cart/remove?guest_id=${guestId}`
    );
    return data;
  } else {
    const { data } = await MainApi.delete(cart_all_item_remove);
    return data;
  }
};

export default function useDeleteAllCartItem() {
  return useMutation("delete-all-cart-item", deleteData);
}
