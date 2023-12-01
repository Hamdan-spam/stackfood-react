import React, { useEffect } from "react";
//import useGetTrackOrderData from "../../api-manage/hooks/react-query/order/useGetTrackOrderData";

import { Stack } from "@mui/system";
import { alpha, Button, Typography } from "@mui/material";
import { t } from "i18next";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PlaceIcon from "@mui/icons-material/Place";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import CustomDivider from "../CustomDivider";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import TrackingPage from "../order-tracking/TrackingPage";
import { getAmount } from "../../utils/customFunctions";

const TrackOrderDetails = ({
  showOrderDetails,
  trackOrderFormik,
  trackOrderData,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const phone = btoa(trackOrderFormik?.values?.contact_person_number)

  let currencySymbol
  let currencySymbolDirection
  let digitAfterDecimalPoint

  if (global) {
    currencySymbol = global.currency_symbol
    currencySymbolDirection = global.currency_symbol_direction
    digitAfterDecimalPoint = global.digit_after_decimal_point
  }
  const handleClick = () => {
    router.push(`/order-history/${trackOrderData?.id}?phone=${phone}`)
  };
  return (
    <CustomStackFullWidth paddingTop="30px" spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize="20px" fontWeight="600">
          {t("order")}
          <Typography
            component="span"
            fontSize="20px"
            fontWeight="600"
            marginLeft="3px"
          >
            #{trackOrderData?.id}
          </Typography>
        </Typography>
        <Typography fontSize="20px" fontWeight="600">
          {getAmount(
            trackOrderData?.order_amount,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
          )}
        </Typography>
      </Stack>
      <CustomDivider border="2px" width="100%" />
      <CustomStackFullWidth
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: "10px", md: "70px" }}
        //paddingX={{ xs: "10px", md: "90px" }}
        paddingTop="20px"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          padding="1rem"
          minWidth={{ xs: "200px", md: "320px" }}
          backgroundColor={alpha(theme.palette.primary.main, 0.1)}
          borderRadius="8px"
        >
          <AddBusinessIcon color="primary" />
          <Typography fontSize="12px">{trackOrderData?.restaurant?.name}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          padding="1rem"
          backgroundColor={alpha(theme.palette.primary.main, 0.1)}
          minWidth={{ xs: "200px", md: "320px" }}
          borderRadius="8px"
        >
          <PlaceIcon color="primary" />
          <Typography fontSize="12px">
            {trackOrderData?.delivery_address?.address}
          </Typography>
        </Stack>
        <Button onClick={handleClick} variant="outlined" sx={{ color: theme => theme.palette.primary.main }}>
          {t("View Order Details")}
        </Button>
      </CustomStackFullWidth>
      <CustomStackFullWidth >
        <TrackingPage guestOrderTracking data={trackOrderData} />

      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default TrackOrderDetails;
