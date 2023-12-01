import React, { useEffect, useState } from "react";
import { CustomPaperBigCard, CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid, NoSsr, Typography } from "@mui/material";
import { t } from "i18next";
import CustomTextFieldWithFormik from "../form-fields/CustomTextFieldWithFormik";
import CustomPhoneInput from "../CustomPhoneInput";
import { PrimaryButton } from "../products-page/FoodOrRestaurant";
import { useFormik } from "formik";
import { CustomButtonPrimary } from "../../styled-components/CustomButtons.style";
import TrackOrderDetails from "./TrackOrderDetails";
import { getGuestId } from "../checkout-page/functions/getGuestUserId";
import useGetTrackOrderData from "../../hooks/react-query/useGetTrackOrderData";
// import {
//   CustomPaperBigCard,
//   CustomStackFullWidth,
// } from "../../styled-components/CustomStyles.style";
// import { Grid, Typography } from "@mui/material";
// import { t } from "i18next";
// import CustomTextFieldWithFormik from "../form-fields/CustomTextFieldWithFormik";
// import CustomPhoneInput from "../custom-component/CustomPhoneInput";
// import { useFormik } from "formik";
// import { setGuestUserInfo } from "../../redux/slices/guestUserInfo";
// import { getLanguage } from "../../helper-functions/getLanguage";
// import { PrimaryButton } from "../Map/map.style";
// import TrackOrderDetails from "./TrackOrderDetails";
// import { getGuestId } from "../../helper-functions/getToken";
// import useGetTrackOrderData from "../../api-manage/hooks/react-query/order/useGetTrackOrderData";

const TrackOrderInput = ({ configData }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const trackOrderFormik = useFormik({
    initialValues: {
      order_id: "",
      contact_person_number: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        setShowOrderDetails(true);
        refetchTrackOrder();
        // dispatch(setGuestUserInfo(values));
        // handleClose();
      } catch (err) {}
    },
  });
  //const lanDirection = getLanguage() ? getLanguage() : "ltr";
  const nameHandler = (value) => {
    trackOrderFormik.setFieldValue("order_id", value);
  };
  const numberHandler = (value) => {
    trackOrderFormik.setFieldValue("contact_person_number", value);
  };
  const guestId = getGuestId();
  const {
    refetch: refetchTrackOrder,
    data: trackOrderData,
    isLoading,
  } = useGetTrackOrderData(
    trackOrderFormik?.values?.order_id,
    trackOrderFormik?.values?.contact_person_number,
    guestId
  );
  // useEffect(() => {
  //   if (trackOrderFormik?.values?.order_id &&  trackOrderFormik?.values?.contact_person_number) {
  //     refetchTrackOrder();
  //   }
  // }, [trackOrderFormik?.values?.order_id, trackOrderFormik?.values?.contact_person_number]);

  return (
 <NoSsr>
   <CustomStackFullWidth spacing={2} pt='60px'>
     <CustomPaperBigCard>
       <Typography
           align="center"
           paddingBottom="30px"
           fontSize="20px"
           fontWeight="600"
       >
         {t("Track Your Order")}
       </Typography>
       <form noValidate onSubmit={trackOrderFormik.handleSubmit}>
         <Grid container spacing={2} paddingX={{ xs: ".5rem", md: "2rem" }}>
           <Grid item xs={12} md={5}>
             <CustomTextFieldWithFormik
                 placeholder={t("Enter your order id")}
                 required="true"
                 type="text"
                 label={t("Order Id")}
                 touched={trackOrderFormik.touched.order_id}
                 errors={trackOrderFormik.errors.order_id}
                 fieldProps={trackOrderFormik.getFieldProps("order_id")}
                 onChangeHandler={nameHandler}
                 value={trackOrderFormik.values.order_id}
             />
           </Grid>
           <Grid item xs={12} md={5}>
             <CustomPhoneInput
                 value={trackOrderFormik.values.contact_person_number}
                 onHandleChange={numberHandler}
                 initCountry={configData?.country}
                 touched={trackOrderFormik.touched.contact_person_number}
                 errors={trackOrderFormik.errors.contact_person_number}
                 rtlChange="true"
                 //lanDirection={lanDirection}
                 height="45px"
             />
           </Grid>
           <Grid item xs={12} md={2}>
             <CustomButtonPrimary type="submit">{t("Search Order")}</CustomButtonPrimary>
           </Grid>
         </Grid>
       </form>
       {trackOrderData&&  <TrackOrderDetails
           trackOrderFormik={trackOrderFormik}
           showOrderDetails={setShowOrderDetails}
           trackOrderData={trackOrderData}
       />}
     </CustomPaperBigCard>
   </CustomStackFullWidth>
 </NoSsr>
  );
};

export default TrackOrderInput;
