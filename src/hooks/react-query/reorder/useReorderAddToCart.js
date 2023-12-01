

import { useMutation } from "react-query";
import MainApi from "../../../api/MainApi";

const addData = async (item_list) => {
    const { data } = await MainApi.post("api/v1/customer/cart/add-multiple ", {
        item_list
    });
    return data;
};

export default function useReorderAddToCart() {
    return useMutation("add-items", addData);
}
