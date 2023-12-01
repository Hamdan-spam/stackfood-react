
import { useMutation } from "react-query";
import MainApi from "../../../api/MainApi";

const addData = async (postData) => {
  const { data } = await MainApi.post("api/v1/customer/cart/update", postData);
  return data;
};

export default function useCartItemUpdate() {
  return useMutation("updated_cart_item", addData);
}
