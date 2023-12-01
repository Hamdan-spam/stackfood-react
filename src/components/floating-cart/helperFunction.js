import { handleValuesFromCartItems } from "../checkout-page/CheckoutPage";
import { getSelectedAddons } from "../navbar/second-navbar/SecondNavbar";
import { calculateItemBasePrice, getConvertDiscount } from "../../utils/customFunctions";
import { incrementProductQty } from "../../redux/slices/cart";

export const getItemDataForAddToCart = (values,updateQuantity, mainPrice,guest_id) => {
  let totalQty = 0;
  return {
    guest_id: guest_id,
    cart_id: values?.cartItemId,
    model: values?.available_date_starts ? "ItemCampaign" : "Item",
    add_on_ids:
      values?.add_ons?.length > 0
        ? values?.addons?.map((add) => {
          return add.id;
        })
        : [],
    add_on_qtys:
      values?.add_ons?.length > 0
        ? values?.addons?.map((add) => {
          totalQty = add.quantity;
          return totalQty;
        })
        : [],
    item_id: values?.id,
    price: mainPrice,
    quantity: updateQuantity,
    variations:
      values?.variations?.length > 0
        ? values?.variations?.map((variation) => {
          return {
            name: variation.name,
            values: {
              label: handleValuesFromCartItems(variation.values),
            },
          };
        })
        : []
  };
};
export const cartUpdateHandleSuccess = (res,cartItem) => {
  if (res) {
    res?.forEach((item) => {
      if (cartItem?.cartItemId === item?.id) {
        const product = {
          ...item?.item,
          cartItemId: item?.id,
          totalPrice: item?.price,
          quantity: item?.quantity,
          variations: item?.item?.variations,
          selectedAddons: getSelectedAddons(item?.item?.addons),
          itemBasePrice:  getConvertDiscount(
            item?.item?.discount,
            item?.item?.discount_type,
            calculateItemBasePrice(item, item?.item?.variations),
            item?.item?.restaurant_discount
          ),
        };

        dispatch(incrementProductQty(product)) // Dispatch the single product
      }
    });
  }
};

export const getDiscountedAmount = (
  price,
  discount,
  discountType,
  storeDiscount,
  quantity
) => {
  //product wise discount
  let mainPrice = price;
  let q = quantity ? quantity : 1;
  if (Number.parseInt(storeDiscount) === 0) {
    if (discount > 0) {
      if (discountType === "amount") {
        mainPrice = price - discount * q;
      } else if (discountType === "percent") {
        mainPrice = price - (discount / 100) * price;
      }
    }
  } else {
    mainPrice = price - (storeDiscount / 100) * price;
  }
  return mainPrice;
};